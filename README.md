# Value Domain DNS Cert Register

- This is Certbot Manual DNS-01 Challenge register for Value Domain!

## Required

- Linux
  - Does not support Windows
- [certbot](https://certbot.eff.org/)
- Node.js 12+

## Install Value Domain DNS Cert Register

`npm i -g @lycolia/value-domain-dns-cert-register`

## How to use

### 1. Create ACME account

- Run the following command -> `certbot register`

### 2. Get Value Domain Access Token

- [GET API KEY!](https://www.value-domain.com/vdapi/)

### 3. Run this CLI with following certbot commands

```sh
sudo certbot certonly --manual -n \
--preferred-challenges dns \
--agree-tos -m [your-email] \
--manual-auth-hook "vddcr [root-domain-name] [Value-Domain-access-token]" \
--manual-public-ip-logging-ok \
-d [your-domain]
```

## CLI Options

- `vddcr [root-domain-name] [Value-Domain-access-token]`
  - `[root-domain-name]` is `/domains/{domain}/dns` on `{domain}`
  - `[Value-Domain-access-token]` is [Value Domain API KEY](https://www.value-domain.com/vdapi/)
