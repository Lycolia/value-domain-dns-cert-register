const createAcmeDomain = (rootDomain: string, targetDomain: string) => {
  const regdRootDomain = rootDomain.replace(/\./g, '\\.');
  const re = new RegExp(`^(.+?)\\.${regdRootDomain}`);
  const domainMat = targetDomain.match(re);
  return domainMat !== null
    ? `_acme-challenge.${domainMat[1]}` // for sub domain
    : '_acme-challenge'; // for root domain
};

export const Acme = {
  createAcmeDomain,
};
