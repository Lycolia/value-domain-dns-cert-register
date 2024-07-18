import {
  EnvVarNotExistAllError,
  EnvVarNotExistCertbotDomainError,
  EnvVarNotExistCertbotValidationError,
} from '../../resources/ErrorDefines';
import { createAcmeDomain, createAcmeRecord } from '../Acme';
import { reThrow } from '../ReThrow';

const getEnvVar = (procEnv: typeof process.env) => {
  if (
    procEnv.CERTBOT_DOMAIN === undefined &&
    procEnv.CERTBOT_VALIDATION === undefined
  ) {
    reThrow(EnvVarNotExistAllError.message, EnvVarNotExistAllError.code);
  } else if (procEnv.CERTBOT_DOMAIN === undefined) {
    reThrow(
      EnvVarNotExistCertbotDomainError.message,
      EnvVarNotExistCertbotDomainError.code
    );
  } else if (procEnv.CERTBOT_VALIDATION === undefined) {
    reThrow(
      EnvVarNotExistCertbotValidationError.message,
      EnvVarNotExistCertbotValidationError.code
    );
  } else {
    return {
      certbotDomain: procEnv.CERTBOT_DOMAIN,
      certbotValidation: procEnv.CERTBOT_VALIDATION,
    };
  }
};

export const createAcmeContext = (
  rootDomain: string,
  procEnv: typeof process.env
) => {
  const env = getEnvVar(procEnv);
  const acmeDomain = createAcmeDomain(rootDomain, env.certbotDomain);
  const acmeRecord = createAcmeRecord(acmeDomain, env.certbotValidation);

  return {
    acmeDomain,
    acmeRecord,
  };
};
