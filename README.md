# Value-Domain DNS Cert Register

CertbotによるDNS-01 Challengeの結果をValue DomainのDNSレコードに登録するためのスクリプトです。

ワイルドカードドメインに対して使えるかどうかは確認してません。

## 参考動作環境

以下は目安であり、動作の保証をするものではありません。

- 任意のLinux
- [certbot](https://certbot.eff.org/)
- Node.js 22+

## インストール方法

```bash
npm i -g @lycolia/value-domain-dns-cert-register
```

## 使い方

### 1. ACMEアカウントの作成

```bash
certbot register
```

### 2. Value DomainのAPI KEYを取得

[バリュードメインAPI](https://www.value-domain.com/vdapi/)より取得。

### 3. 本スクリプトの実行

`[hoge]`の様になってる箇所を適当に埋め、以下のコマンドを実行。

```sh
sudo certbot certonly --manual -n \
  --preferred-challenges dns \
  --agree-tos -m <EMAIL> \
  --manual-auth-hook "vddcr <ROOT_DOMAIN> <VD_API_KEY>" \
  -d <TARGET_DOMAIN>
```

**上記コマンドの各項目の入力内容**

| 項目名        | 入力内容                                                                                                                                                |
| ------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| EMAIL         | ACMEアカウントのメールアドレス                                                                                                                          |
| ROOT_DOMAIN   | [DNS設定の取得](https://www.value-domain.com/api/doc/domain/#tag/DNS/paths/~1domains~1{domain}~1dns/get)にある`/domains/{domain}/dns`の`{domain}`の部分 |
| VD_API_KEY    | [Value DomainのAPI KEY](https://www.value-domain.com/vdapi/)                                                                                            |
| TARGET_DOMAIN | 証明書を発行したいドメイン                                                                                                                              |

**コマンドの入力例**

```sh
sudo certbot certonly --manual -n \
  --preferred-challenges dns \
  --agree-tos -m hoge@example.com \
  --manual-auth-hook "vddcr example.com XXXXXXXXXXXXXXXXXXXXX" \
  -d sub.example.com
```

### 4. 定期実行

必要に応じてCRONなどに登録することで継続的に実行できます。

## 本スクリプトの実行方法

基本的には`vddcr [root-domain-name] [Value-Domain-access-token]`として実行できます。

- `vddcr [root-domain-name] [Value-Domain-access-token]`
  - `[root-domain-name]` is `/domains/{domain}/dns` on `{domain}`
    - [see also](https://www.value-domain.com/api/doc/domain/#tag/DNS/paths/~1domains~1dns/get)
  - `[Value-Domain-access-token]` is [Value-Domain API KEY](https://www.value-domain.com/vdapi/)

## 参考サイト

### Value Domain

- [Value-Domain API Document (1.0.0)](https://www.value-domain.com/api/doc/domain/)

### Certbot

- [Pre and Post Validation Hooks](https://certbot.eff.org/docs/using.html?highlight=dns#pre-and-post-validation-hooks)
- [Certbot command-line options](https://certbot.eff.org/docs/using.html?highlight=dns#certbot-command-line-options)
