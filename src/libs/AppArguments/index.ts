import { ArgumentLengthError } from '../../resources/ErrorDefines';
import { reThrowOrExit } from '../ReThrowOrExit';

export const getArguments = (argv: string[]) => {
  if (argv.length > 3) {
    const [, , rootDomain, accessToken] = argv;
    return {
      rootDomain: rootDomain.trim(),
      apiToken: accessToken.trim(),
    };
  } else {
    reThrowOrExit(ArgumentLengthError.message, ArgumentLengthError.code);
  }
};
