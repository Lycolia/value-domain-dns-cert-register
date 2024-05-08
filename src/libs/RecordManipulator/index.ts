import { encodeRegExpDomainString } from '../RegExpUtil';

export const createOrUpdateRecords = (
  records: string,
  acmeDomain: string,
  newAcmeRecord: string
) => {
  const escapedAcmeDomain = encodeRegExpDomainString(acmeDomain);
  const re = new RegExp(`txt ${escapedAcmeDomain} \\S+\\n`);
  // 古いACMEレコード行を消す or なかったら何もしない
  const removedPrevAcmeRecords = records.replace(re, '');
  // 新しいACMEレコードを差し込む
  return `${removedPrevAcmeRecords}${newAcmeRecord}`;
};
