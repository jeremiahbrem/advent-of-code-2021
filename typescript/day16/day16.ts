import { readFileSync } from "fs";

const key: Record<string, string> = {
  '0': '0000',
  '1': '0001',
  '2': '0010',
  '3': '0011',
  '4': '0100',
  '5': '0101',
  '6': '0110',
  '7': '0111',
  '8': '1000',
  '9': '1001',
  'A': '1010',
  'B': '1011',
  'C': '1100',
  'D': '1101',
  'E': '1110',
  'F': '1111'
}
export function convertToBinary(hex: string): string {
  let binary = '';
  for (let i = 0; i < hex.length; i++) {
    binary += key[hex[i]];
  }
  return binary;
}

export function getVersionNumber(binary: string): number {
  const binaryVersion = binary.substring(0,3);
  return parseInt(binaryVersion, 2);
}

export function getPacketTypeId(binary: string): number {
  const typeId = binary.substring(3,6);
  return parseInt(typeId, 2);
}

export function getFourBits(group: string): string {
  return group.substring(1,5);
}

export function isLast(group: string): boolean {
  return group[0] === '0';
}

export function extractGroups(packet: string): string[] {
  const groups: string[] = [];
  let endReached = false;
  for (let i = 0; !endReached; i += 5) {
    let group = packet.substring(i, i + 5);
    groups.push(getFourBits(group));
    endReached = isLast(group);
  }
  return groups;
}

export function getLiteralValue(groups: string[]): number {
  const binary = groups.join('');
  return parseInt(binary, 2)
}

export function getLiteralValueLength(packet: string): number {
  const groups = extractGroups(packet.slice(6));
  const groupIndexCount = groups.length;
  const headerLength = 6;
  return headerLength + groups.join('').length + groupIndexCount;
}

export function isLiteralValuePacket(binary: string): boolean {
  const idType = getPacketTypeId(binary);
  return idType === 4;
}

export function parseLiteralValuePacket(packet: string): number {
  const groups = extractGroups(packet.slice(6));
  return getLiteralValue(groups);
}

export function getLengthTypeId(packet: string): string {
  return packet[6];
}

export function getSubPacketsLength(packet: string): number {
  const number = packet.slice(7, 22);
  return parseInt(number, 2);
}

export function getSubPacketsCount(packet: string): number {
  const number = packet.slice(7, 18);
  return parseInt(number, 2);
}

export function getLengthTypeSubstring(packet: string, length: number): string {
  return packet.slice(22, 22 + length);
}

export function getCountTypeSubstring(packet: string): string {
  return packet.slice(18);
}

export function addLiteralValueType(
  current: string,
  packet: OperatorPacket,
  totalPackets: string[],
  length: number): void {
  const literalValSubpacket = current.slice(0, length);
  packet.subPackets.push(literalValSubpacket);
  totalPackets.push(literalValSubpacket);
}

type OperatorPacket = {
  packet: string;
  subPackets: string[];
}

export function unPackLengthTypeSubPackets(
  substring: string,
  packet: OperatorPacket,
  length: number,
  totalPackets: string[]): void {
  let index = 0;

  while (packet.subPackets.join("").length < length) {
    const current = substring.slice(index);
    if (isLiteralValuePacket(current)) {
      const currentLength = getLiteralValueLength(current);
      addLiteralValueType(current, packet, totalPackets, currentLength);
      index += currentLength;

    } else {
      const { packetLength } = parseOperatorPacket({ packet: current, subPackets: [] }, totalPackets);
      packet.subPackets.push(current.slice(0, packetLength));
      index += packetLength;
    }
  }
}

export function unPackCountTypeSubPackets(
  substring: string,
  packet: OperatorPacket,
  count: number,
  totalPackets: string[]): void {

  let index = 0;

  while (packet.subPackets.length < count) {
    const current = substring.slice(index);
    if (isLiteralValuePacket(current)) {
      const currentLength = getLiteralValueLength(current);
      addLiteralValueType(current, packet, totalPackets, currentLength);
      index += currentLength;

    } else {
      const { packetLength } = parseOperatorPacket({ packet: current, subPackets: [] }, totalPackets);
      packet.subPackets.push(current.slice(0, packetLength));
      index += packetLength;
    }
  }
}

type PacketStats = {
  packet: OperatorPacket;
  packetLength: number;
}

export function parseOperatorPacket(
  packet: OperatorPacket,
  totalPackets: string[],
  ): PacketStats {
  const type = getLengthTypeId(packet.packet);
  totalPackets.push(packet.packet);
  let offset = 0;
  if (type === '0') {
    parseLengthTypeOperator(packet, totalPackets);
    offset = 22;

  } else {
    parseCountTypeOperator(packet, totalPackets);
    offset = 18;
  }
  return { packet, packetLength: packet.subPackets.join("").length + offset };
}

export function parseLengthTypeOperator(
  packet: OperatorPacket,
  totalPackets: string[]): void {

  const length = getSubPacketsLength(packet.packet);
  const subPackString = getLengthTypeSubstring(packet.packet, length);
  unPackLengthTypeSubPackets(subPackString, packet, length, totalPackets);
}

export function parseCountTypeOperator(
  packet: OperatorPacket,
  totalPackets: string[]): void {
  const count = getSubPacketsCount(packet.packet);
  const subPackString = getCountTypeSubstring(packet.packet);
  unPackCountTypeSubPackets(subPackString, packet, count, totalPackets);
}

export function partOne(input: string): number {
  const binary = convertToBinary(input);
  const totalPackets: string[] = [];
  let versionSum = 0;
  parseOperatorPacket(
    { packet: binary, subPackets: [] },
    totalPackets
  );
  totalPackets.forEach(x => { versionSum += getVersionNumber(x) });
  return versionSum;
}

const getValueMap: Record<number, (packet: OperatorPacket) => number> = {
  0: getType0Value,
  1: getType1Value,
  2: getType2Value,
  3: getType3Value,
  5: getType5Value,
  6: getType6Value,
  7: getType7Value
};
export function getValues(packet: OperatorPacket): number[] {
  let values: number[] = [];
  packet.subPackets.forEach(x => {
    if (isLiteralValuePacket(x)) {
      values.push(parseLiteralValuePacket(x));

    } else {
      const type = getPacketTypeId(x);
      const { packet: newPacket } = parseOperatorPacket({ packet: x, subPackets: [] }, []);
      values.push(getValueMap[type](newPacket));
    }
  });
  return values;
}
export function getType0Value(packet: OperatorPacket): number {
  const values = getValues(packet);
  return values.reduce((a, b) => a + b, 0);
}
export function getType1Value(packet: OperatorPacket): number {
  const values = getValues(packet);
  return values.reduce((a,b) => a * b, 1);
}
export function getType2Value(packet: OperatorPacket): number {
  const values = getValues(packet);
  return Math.min(...values);
}
export function getType3Value(packet: OperatorPacket): number {
  const values = getValues(packet);
  return Math.max(...values);
}
export function getType5Value(packet: OperatorPacket): number {
  const values = getValues(packet);
  return values[0] > values[1] ? 1 : 0;
}
export function getType6Value(packet: OperatorPacket): number {
  const values = getValues(packet);
  return values[0] < values[1] ? 1 : 0;
}
export function getType7Value(packet: OperatorPacket): number {
  const values = getValues(packet);
  return values[0] === values[1] ? 1 : 0;
}

export function partTwo(input: string): number {
  const binary = convertToBinary(input);
  const totalPackets: string[] = [];
  const { packet } = parseOperatorPacket(
    { packet: binary, subPackets: [] },
    totalPackets
  );
  const type = getPacketTypeId(packet.packet);

  return getValueMap[type](packet);
}
if(require.main === module) {
  const input = readFileSync("inputs/day16.txt", { encoding: "ascii" });
  console.log(partOne(input));
  console.log(partTwo(input));
}
