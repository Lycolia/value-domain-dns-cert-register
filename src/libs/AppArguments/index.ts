import { ArgumentLengthError } from '../../resources/ErrorDefines';
import { reThrow } from '../ReThrow';
import { version } from '../../../package.json';

export const getArguments = (argv: string[]) => {
  if (argv.length === 3 && argv[2] === '-V') {
    console.log(version);
    // TODO: ここで終了させるの責務的に微妙な気がする
    process.exit(0);
  } else if (argv.length > 3) {
    const [, , rootDomain, accessToken] = argv;
    return {
      rootDomain: rootDomain.trim(),
      apiToken: accessToken.trim(),
    };
  } else {
    reThrow(ArgumentLengthError.message, ArgumentLengthError.code);
  }
};
