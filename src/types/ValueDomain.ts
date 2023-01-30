export type ValueDomainPayload = {
  rootDomain: string;
  accessToken: string;
};

export type ValueDomainResultResponse = {
  /** @example 9999999 */
  domainid: number;
  /** @example "example.com" */
  domainname: string;
  /** @example "valuedomain1" */
  ns_type: string;
  /** @example "a * 133.130.104.122\nmx @ 10\ntxt @ v=spf1 ip4:133.130.104.111 ~all" */
  records: string;
  /** @example "60" */
  ttl: string;
};
