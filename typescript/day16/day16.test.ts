import {
  convertToBinary,
  getVersionNumber,
  getPacketTypeId,
  getFourBits,
  isLast,
  parseLiteralValuePacket,
  getLiteralValue,
  extractGroups,
  isLiteralValuePacket,
  getLiteralValueLength,
  getLengthTypeId,
  getSubPacketsLength,
  getSubPacketsCount,
  parseLengthTypeOperator,
  parseCountTypeOperator,
  getLengthTypeSubstring,
  getCountTypeSubstring,
  unPackLengthTypeSubPackets,
  unPackCountTypeSubPackets,
  addLiteralValueType,
  parseOperatorPacket,
  partOne,
  partTwo
} from './day16';

const sample = `D2FE28`;

describe('convertToBinary', () => {
  it('converts hex to binary', () => {
    expect(convertToBinary(sample)).toBe('110100101111111000101000');
  });
});
describe('getVersionNumber', () => {
  it('retrieves version number from binary', () => {
    const binary = '110100101111111000101000';
    expect(getVersionNumber(binary)).toBe(6);
  });
});
describe('getPacketTypeId', () => {
  it('retrieves packet type id from binary', () => {
    const binary = '110100101111111000101000';
    expect(getPacketTypeId(binary)).toBe(4);
  });
});
describe('getFourBits', () => {
  it('returns four bits after prefix', () => {
    const binary = '10111';
    expect(getFourBits(binary)).toBe('0111');
  });
});
describe('isLast', () => {
  it('determines if group is the last to parse', () => {
    const groups = [{bin: '10111', expected: false},{bin: '00101', expected: true}];
    groups.forEach(({bin, expected}) => expect(isLast(bin)).toBe(expected));
  });
});
describe('extractGroups', () => {
  it('extracts bit groups from packet', () => {
    expect(extractGroups('101111111000101000')).toEqual([
      '0111', '1110', '0101'
    ]);
  });
});
describe('isLiteralValuePacket', () => {
  it('determines if packet is a literal value or not (operator packet)', () => {
    expect(isLiteralValuePacket('110100101111111000101000')).toBeTruthy();
    expect(isLiteralValuePacket('00111000000000000110111101000101001010010001001000000000')).toBeFalsy();
  });
});
describe('getLiteralValue', () => {
  it('returns literal decimal value from bit groups', () => {
    const groups = [
      '0111', '1110', '0101'
    ];
    expect(getLiteralValue(groups)).toBe(2021);
  });
});
describe('parseLiteralValuePacket', () => {
  it('returns represented decimal value from packet', () => {
    expect(parseLiteralValuePacket('110100101111111000101000')).toBe(2021);
  });
});
describe('getLiteralValueLength', () => {
  it('returns length of literal value packet', () => {
    expect(getLiteralValueLength('11010001010')).toBe(11);
    expect(getLiteralValueLength('1101001100101010')).toBe(16);
  });
});
describe('getLengthTypeId', () => {
  it('returns length type id of operator packet', () => {
    expect(getLengthTypeId('00111000000000000110111101000101001010010001001000000000')).toBe('0');
    expect(getLengthTypeId('11101110000000001101010000001100100000100011000001100000')).toBe('1');
  });
});
describe('getSubPacketsLength', () => {
  it('returns total length of subpackets', () => {
    expect(getSubPacketsLength('00111000000000000110111101000101001010010001001000000000')).toBe(27);
  });
});
describe('getSubPacketsCount', () => {
  it('returns total length of subpackets', () => {
    expect(getSubPacketsCount('11101110000000001101010000001100100000100011000001100000')).toBe(3);
  });
});
describe('getLengthTypeSubstring', () => {
  it('returns substring of subpackets from length type operator', () => {
    expect(getLengthTypeSubstring('00111000000000000110111101000101001010010001001000000000', 27)).toEqual(
      '110100010100101001000100100'
    );
  });
});
describe('getCountTypeSubstring', () => {
  it('returns substring of subpackets from count type operator', () => {
    expect(getCountTypeSubstring('11101110000000001101010000001100100000100011000001100000')).toEqual(
      '01010000001100100000100011000001100000'
    );
  });
});
describe('unPackLengthTypeSubPackets', () => {
  it('returns array of subpackets', () => {
    const totalPackets: string[] = [];
    const testSample = '00111000000000000110111101000101001010010001001000000000';
    const operatorPacket = { packet: testSample, subPackets: [] };
    unPackLengthTypeSubPackets('110100010100101001000100100', operatorPacket, 27, totalPackets)
    expect(operatorPacket.subPackets).toEqual([
      '11010001010', '0101001000100100'
    ]);
    expect(totalPackets).toEqual(operatorPacket.subPackets);
  });
});
describe('unPackCountTypeSubPackets', () => {
  it('returns array of subpackets', () => {
    const totalPackets: string[] = [];
    const testSample = '11101110000000001101010000001100100000100011000001100000';
    const operatorPacket = { packet: testSample, subPackets: [] };
    unPackCountTypeSubPackets('01010000001100100000100011000001100000', operatorPacket, 3, totalPackets);
    expect(operatorPacket.subPackets).toEqual([
      '01010000001', '10010000010','00110000011'
    ]);
    expect(totalPackets).toEqual(operatorPacket.subPackets);
  });
});
describe('addLiteralValueType', () => {
  it('adds literal value type subpacket to array of subpackets', () => {
    const totalPackets: string[] = [];
    const operatorPacket = { packet: "", subPackets: [] };
    addLiteralValueType('110100010100101001000100100', operatorPacket, totalPackets, 11)
    expect(operatorPacket.subPackets).toEqual([
      '11010001010'
    ]);
    expect(totalPackets).toEqual(operatorPacket.subPackets);
  });
});
describe('parseLengthTypeOperator', () => {
  it('retrieves all operator subpackets', () => {
    const totalPackets: string[] = [];
    const testSample = '00111000000000000110111101000101001010010001001000000000';
    const operatorPacket = { packet: testSample, subPackets: [] };
    parseLengthTypeOperator(operatorPacket, totalPackets);
    expect(operatorPacket.subPackets).toEqual(['11010001010','0101001000100100']);
    expect(totalPackets).toEqual(operatorPacket.subPackets);
  });
});
describe('parseCountTypeOperator', () => {
  it('retrieves all operator subpackets', () => {
    const totalPackets: string[] = [];
    const testSample = '11101110000000001101010000001100100000100011000001100000';
    const operatorPacket = { packet: testSample, subPackets: [] };
    parseCountTypeOperator(operatorPacket, totalPackets);
    expect(operatorPacket.subPackets).toEqual(['01010000001', '10010000010','00110000011']);
    expect(totalPackets).toEqual(operatorPacket.subPackets);
  });
});
describe('parseOperatorPacket', () => {
  it('retrieves all length type operator subpackets', () => {
    const totalPackets: string[] = [];
    const testSample = '00111000000000000110111101000101001010010001001000000000';
    const operatorPacket = { packet: testSample, subPackets: [] };
    const { packetLength } = parseOperatorPacket(operatorPacket, totalPackets);
    expect(operatorPacket.subPackets).toEqual([
      '11010001010',
      '0101001000100100']);
    expect(totalPackets).toEqual([
      '00111000000000000110111101000101001010010001001000000000',
      ...operatorPacket.subPackets
      ]);
    expect(packetLength).toBe(49);
  });
  it('retrieves all count type operator subpackets', () => {
    const totalPackets: string[] = [];
    const testSample = '11101110000000001101010000001100100000100011000001100000';
    const operatorPacket = { packet: testSample, subPackets: [] };
    const { packetLength } = parseOperatorPacket(operatorPacket, totalPackets);
    expect(operatorPacket.subPackets).toEqual([
      '01010000001',
      '10010000010',
      '00110000011']);
    expect(totalPackets).toEqual([
      '11101110000000001101010000001100100000100011000001100000',
      ...operatorPacket.subPackets
     ]);
    expect(packetLength).toBe(51);
  });
});


describe('day 15 part 1', () => {
  it('returns sum of versions', () => {
    expect(partOne('38006F45291200')).toBe(9);
    expect(partOne('EE00D40C823060')).toBe(14);
    expect(partOne('8A004A801A8002F478')).toBe(16);
    expect(partOne('620080001611562C8802118E34')).toBe(12);
    expect(partOne('C0015000016115A2E0802F182340')).toBe(23);
    expect(partOne('A0016C880162017C3686B18A3D4780')).toBe(31);
  });
});
describe('day 15 part 2', () => {
  it('returns total packet value', () => {
    expect(partTwo('C200B40A82')).toBe(3);
    expect(partTwo('04005AC33890')).toBe(54);
    expect(partTwo('880086C3E88112')).toBe(7);
    expect(partTwo('CE00C43D881120')).toBe(9);
    expect(partTwo('F600BC2D8F')).toBe(0);
    expect(partTwo('D8005AC2A8F0')).toBe(1);
    expect(partTwo('9C0141080250320F1802104A08')).toBe(1);
  });
});
