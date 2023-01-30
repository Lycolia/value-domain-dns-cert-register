import { ErrorReasonType } from 'src/types/AppError';

export const ErrorReason = {
  ok: { code: 0, message: 'OK' } as ErrorReasonType,
  invalidParam: {
    code: 2,
    message:
      'Parameter error: Required 2 argument: vddcr [rootDomain] [accessToken]',
  } as ErrorReasonType,
  notExistsCertbotEnvVars: {
    code: 3,
    message:
      'Enviroment variables error: Certbot Enviroment variables not exists',
  } as ErrorReasonType,
  failGetDnsRecord: {
    code: 4,
    message: 'HTTP Request error: Get DNS records failure',
  } as ErrorReasonType,
  failUpdateDnsRecord: {
    code: 5,
    message: 'HTTP Request error: Update DNS records failure',
  } as ErrorReasonType,
};
