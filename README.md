# Value-Domain DNS Cert Register

- This is Certbot DNS-01 Challenge auto-register for Value-Domain!

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

### 4. Task scheduling

- If want scheduled run, register above commands in crontab!

## CLI Options

- `vddcr [root-domain-name] [Value-Domain-access-token]`
  - `[root-domain-name]` is `/domains/{domain}/dns` on `{domain}`
    - [see also](https://www.value-domain.com/api/doc/domain/#tag/DNS/paths/~1domains~1dns/get)
  - `[Value-Domain-access-token]` is [Value-Domain API KEY](https://www.value-domain.com/vdapi/)

## Reference

### Value-Domain

- [Value-Domain API Document (1.0.0)](https://www.value-domain.com/api/doc/domain/)

### Certbot

- [Pre and Post Validation Hooks](https://certbot.eff.org/docs/using.html?highlight=dns#pre-and-post-validation-hooks)
- [Certbot command-line options](https://certbot.eff.org/docs/using.html?highlight=dns#certbot-command-line-options)
