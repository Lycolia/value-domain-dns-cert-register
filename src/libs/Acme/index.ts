import { encodeRegExpDomainString } from '../RegExpUtil';

export const createAcmeDomain = (rootDomain: string, targetDomain: string) => {
  const escapedRootDomain = encodeRegExpDomainString(rootDomain);
  // サブドメイン抽出用
  const re = new RegExp(`^(.+?)\\.${escapedRootDomain}`);
  const subDomainMat = targetDomain.match(re);

  if (subDomainMat === null) {
    // サブドメインなし
    return '_acme-challenge';
  } else {
    // サブドメインあり
    return `_acme-challenge.${subDomainMat[1]}`;
  }
};

/**
 * @returns txt _acme-challenge.hoge XXXXXXXXXX\n
 */
export const createAcmeRecord = (
  acmeDomain: string,
  acmeCredential: string
) => {
  return `txt ${acmeDomain} ${acmeCredential}`;
};
