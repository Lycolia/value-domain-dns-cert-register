import { AppError } from 'src/libs/App/AppError';
import { ErrorReason } from 'src/resorces/ErrorReason';

const getArguments = () => {
  if (process.argv.length > 3) {
    const [, , rootDomain, accessToken] = process.argv;
    return {
      rootDomain: rootDomain.trim(),
      accessToken: accessToken.trim(),
    };
  } else {
    return AppError.createError(ErrorReason.invalidParam);
  }
};

const getCertbotEnvVars = () => {
  if (
    process.env.CERTBOT_DOMAIN !== undefined &&
    process.env.CERTBOT_VALIDATION !== undefined
  ) {
    return {
      targetDomain: process.env.CERTBOT_DOMAIN,
      validationText: process.env.CERTBOT_VALIDATION,
    };
  } else {
    return AppError.createError(ErrorReason.notExistsCertbotEnvVars);
  }
};

export const AppInput = {
  getValueDomain: getArguments,
  getCertbotEnvVars,
};
