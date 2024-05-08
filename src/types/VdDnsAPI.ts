export type VdDnsAPIResponse = {
  /** ドメインID、たぶん更新のキー */
  domainid: number;
  domainname: string;
  ns_type: string;
  /** DNSレコード文字列、コメントは除去されてくる */
  records: string;
  /** "60"とかの数字文字列 */
  ttl: string;
};

export type VdDnsUpdateRequest = {
  /** ドメインID、たぶん更新のキー */
  domainid: number;
  ns_type: string;
  /** DNSレコード文字列 */
  records: string;
  /** "60"とかの数字文字列 */
  ttl: string;
};
