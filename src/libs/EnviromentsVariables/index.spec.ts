import { createAcmeContext } from '.';
import * as Acme from '../Acme';

jest.mock('../Acme');

describe('createAcmeContext', () => {
  it('環境変数にCERTBOT_DOMAIN, CERTBOT_VALIDATIONがない', () => {
    expect(() => {
      createAcmeContext('hoge', {});
    }).toThrow(
      'Environment variables CERTBOT_DOMAIN and CERTBOT_VALIDATION does not exist'
    );
  });

  it('環境変数にCERTBOT_DOMAINがなく、CERTBOT_VALIDATIONがある', () => {
    expect(() => {
      createAcmeContext('hoge', { CERTBOT_VALIDATION: 'hoge' });
    }).toThrow('Environment variables CERTBOT_DOMAIN does not exist');
  });

  it('環境変数にCERTBOT_DOMAINがあり、CERTBOT_VALIDATIONがない', () => {
    expect(() => {
      createAcmeContext('hoge', { CERTBOT_DOMAIN: 'hoge' });
    }).toThrow('Environment variables CERTBOT_VALIDATION does not exist');
  });

  it('環境変数にCERTBOT_DOMAIN及び、CERTBOT_VALIDATIONの両方がある', () => {
    const spiedCreateAcmeDomain = jest
      .spyOn(Acme, 'createAcmeDomain')
      .mockReturnValue('abc');
    const spiedCreateAcmeRecord = jest
      .spyOn(Acme, 'createAcmeRecord')
      .mockReturnValue('123');

    const actual = createAcmeContext('hoge', {
      CERTBOT_DOMAIN: 'piyo',
      CERTBOT_VALIDATION: 'fuga'
    });

    expect(spiedCreateAcmeDomain).toHaveBeenCalledWith('hoge', 'piyo');
    expect(spiedCreateAcmeRecord).toHaveBeenCalledWith('piyo', 'fuga');
    expect(actual).toStrictEqual({
      acmeDomain: 'abc',
      acmeRecord: '123'
    });
  });
});
