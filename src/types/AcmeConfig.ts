export type AcmeConfig = {
  isApex: boolean;
  /** @example sub.example.comのsub */
  subDomainName: string;
  /** @example _acme-challenge.sub */
  acmeDomainName: string;
  /** @example XXXXXXXXXX */
  acmeValidationText: string;
};
