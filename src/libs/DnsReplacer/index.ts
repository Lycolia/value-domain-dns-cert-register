import { DnsEditor } from 'src/libs/DnsReplacer/DnsEditor';

/**
 * @param vdDnsRecords
 * @param acmeDomain _acme-challenge
 * @param acmeTxtData XXXXX-XXXXXXXXXXXXXXXXXXXXXXXX-XXXXXXXXXXXX
 */
const replaceDns = (
  vdDnsRecords: string,
  acmeDomain: string,
  acmeTxtData: string
) => {
  if (DnsEditor.isApexDomain(acmeDomain)) {
    return DnsEditor.replaceApexDomainRecords(
      vdDnsRecords,
      acmeDomain,
      acmeTxtData
    );
  } else {
    return DnsEditor.replaceSubDomainRecords(
      vdDnsRecords,
      acmeDomain,
      acmeTxtData
    );
  }
};

export const DnsReplacer = { replaceDns };
