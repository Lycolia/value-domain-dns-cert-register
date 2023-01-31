import { AcmeConfig } from 'src/types/AcmeConfig';

const createAcmeConfig = (
  rootDomain: string,
  targetDomain: string,
  acmeValidation: string
): AcmeConfig => {
  const escapedRootDomain = rootDomain.replace(/\./g, '\\.');
  const reAcmeMatcher = new RegExp(`^(.+?)\\.${escapedRootDomain}`);
  const subDomainCapture = targetDomain.match(reAcmeMatcher);
  const isApex = subDomainCapture === null;

  if (isApex) {
    return {
      isApex: true,
      subDomainName: '',
      acmeDomainName: '_acme-challenge',
      acmeValidationText: acmeValidation,
    };
  } else {
    return {
      isApex: false,
      subDomainName: subDomainCapture[1],
      acmeDomainName: `_acme-challenge.${subDomainCapture[1]}`,
      acmeValidationText: acmeValidation,
    };
  }
};

export const Acme = {
  createAcmeDomain,
  createAcmeConfig,
};
