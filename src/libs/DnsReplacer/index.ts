import { AcmeConfig } from 'src/types/AcmeConfig';

const splitRecords = (records: string) => {
  return records.split('\n');
};

const joinRecords = (records: string[]) => {
  return records.join('\n');
};

const replaceDnsRecords = (records: string, acmeConfig: AcmeConfig) => {
  const recordsArray = splitRecords(records);
  const replacedRecordArray = recordsArray.map((record) => {
    const pattern = new RegExp(`^txt\\s+${acmeConfig.acmeDomainName}\\s+\\S+$`);
    if (record.match(pattern) !== null) {
      return `txt ${acmeConfig.acmeDomainName} ${acmeConfig.acmeValidationText}`;
    }
    return record;
  });

  return joinRecords(replacedRecordArray);
};
export const DnsReplacer = { replaceDnsRecords };
