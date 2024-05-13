// 関数を作るとオブジェクトが動的になるので、型で静的にとどめる
type ErrorObject = Readonly<{
  message: string;
  code: number;
}>;
export const ArgumentLengthError: ErrorObject = {
  message: 'Required 2 argument: vddcr [rootDomain] [accessToken]',
  code: 2,
};
export const EnvVarNotExistAllError: ErrorObject = {
  message:
    'Environment variables CERTBOT_DOMAIN and CERTBOT_VALIDATION does not exist',
  code: 3,
};
export const EnvVarNotExistCertbotDomainError: ErrorObject = {
  message: 'Environment variables CERTBOT_DOMAIN does not exist',
  code: 4,
};
export const EnvVarNotExistCertbotValidationError: ErrorObject = {
  message: 'Environment variables CERTBOT_VALIDATION does not exist',
  code: 5,
};
export const GetDnsRecordsError: ErrorObject = {
  message: 'Request Get DNS records failure',
  code: 6,
};
export const UpdateDnsRecordsError: ErrorObject = {
  message: 'Request Update DNS records failure',
  code: 7,
};
// export const EnvVarNotExistAll: ErrorObject = {
//     message: '',
//     code: ,
// }
export const UnknownError: ErrorObject = {
  message: 'An unexpected error has occurred',
  code: 999,
};
