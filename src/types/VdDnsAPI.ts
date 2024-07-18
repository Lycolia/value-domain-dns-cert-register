export type VdDnsAPIResponse = {
  results: {
    /** ドメインID、たぶん更新のキー */
    domainid: number;
    domainname: string;
    ns_type: string;
    /** DNSレコード文字列、コメントは除去されてくる */
    records: string;
    ttl: number;
  };
  /** "20190502412345678" */
  request_id: string;
};

export type VdDnsUpdateRequest = {
  /** ドメインID、たぶん更新のキー */
  domainid: number;
  ns_type: string;
  /** DNSレコード文字列 */
  records: string;
  /** TODO: 今のところ送っても機能してない模様 */
  ttl: number;
};
