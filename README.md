## Required

- Linux
  - Does not support windows
- [certbot](https://certbot.eff.org/)
- Node.js 12+

## Install vddcr

`npm i -g @lycolia/value-domain-dns-cert-register`

## Create config

```sh
mkdir ~/.vddcr/
cat <<EOF > ~/.vddcr/config.json
{
  "rootDomain": "[root-domain]",
  "vdToken": "[value-domain access token]"
}
EOF
```

## Create ACME account

`certbot register`

## Example certbot commands

```sh
sudo certbot certonly --manual -n \
--preferred-challenges dns \
--agree-tos -m [email]\
--manual-auth-hook "vddcr [username]" \
--manual-public-ip-logging-ok \
-d dev.lycolia.info
```
