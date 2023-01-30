const createAcmeDomain = (rootDomain: string, targetDomain: string) => {
  const escapedRootDomain = rootDomain.replace(/\./g, '\\.');
  const reAcmeMatcher = new RegExp(`^(.+?)\\.${escapedRootDomain}`);
  const subDomainCapture = targetDomain.match(reAcmeMatcher);
  return subDomainCapture !== null
    ? `_acme-challenge.${subDomainCapture[1]}` // for sub domain
    : '_acme-challenge'; // for root domain
};

export const Acme = {
  createAcmeDomain,
};
