import { createOrUpdateRecords } from '.';
import * as RegExpUtil from '../RegExpUtil';

jest.mock('../RegExpUtil');

describe('createOrUpdateRecords', () => {
  it('対象レコードが洗い替えされること', () => {
    jest
      .spyOn(RegExpUtil, 'encodeRegExpDomainString')
      .mockReturnValue('_acme-challenge');

    const records = `a @ 0.0.0.0
mx @ 10
txt @ v=spf1 a:example.com mx ~all
cname sub @
txt _acme-challenge 12345
txt _acme-challenge.sub 12345
txt _acme-challenge.test.sub 23456
`;

    const actual = createOrUpdateRecords(
      records,
      '_acme-challenge',
      'txt _acme-challenge 734f41ed7b79b695df2d16103e1144a0'
    );

    const expected = `a @ 0.0.0.0
mx @ 10
txt @ v=spf1 a:example.com mx ~all
cname sub @
txt _acme-challenge.sub 12345
txt _acme-challenge.test.sub 23456
txt _acme-challenge 734f41ed7b79b695df2d16103e1144a0`;

    expect(actual).toBe(expected);
  });
});
