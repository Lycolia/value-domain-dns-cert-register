const isApexDomain = (acmeDomain: string) => {
  return acmeDomain.match(/^[^\\.]+\.[^\\.]+\.[^\\.]+$/) !== null;
};

const replaceApexDomainRecords = (
  records: string,
  acmeDomain: string,
  acmeTxtData: string
) => {
  const pattern = new RegExp(`txt +${acmeDomain}.+?\\n`);
  // delete old record
  const replacedRecords = records.replace(pattern, '');
  // set new record
  return `${replacedRecords}\n${acmeTxtData}`;
};

const replaceSubDomainRecords = (
  records: string,
  acmeDomain: string,
  acmeTxtData: string
) => {
  const domainSubWord = acmeDomain.match(/^([^\\.]+?)\./);
  const pattern = new RegExp(`txt +${domainSubWord}.+?\\n`);
  // delete old record
  const replacedRecords = records.replace(pattern, '');
  // set new record
  return `${replacedRecords}\n${acmeTxtData}`;
};

export const DnsEditor = {
  isApexDomain,
  replaceApexDomainRecords,
  replaceSubDomainRecords,
};
