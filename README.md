# Archived

本スクリプトはメンテナンスを停止しました。恐らくしばらくの間は動きますが利用は非推奨です。

このリポジトリで開発していたものは[vd-dns-utilに同梱のおまけ](https://github.com/Lycolia/vd-dns-util/tree/main#vd-dcrsh-value-domain%E3%81%A7certbot%E3%81%AEdns%E8%AA%8D%E8%A8%BC%E3%82%92%E8%87%AA%E5%8B%95%E5%8C%96%E3%81%99%E3%82%8B%E3%81%9F%E3%82%81%E3%81%AE%E3%83%84%E3%83%BC%E3%83%AB)に引き継いでいますので、こちらをご利用ください。

# Value-Domain DNS Cert Register

CertbotによるDNS-01 Challengeの結果をValue DomainのDNSレコードに登録するためのスクリプトです。

ワイルドカードドメインに対して使えるかどうかは確認してません。

## 参考動作環境

以下は目安であり、動作の保証をするものではありません。

- 任意のLinux
- [certbot](https://certbot.eff.org/)

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

`<hoge>`の様になってる箇所を適当に埋め、以下のコマンドを実行。

```sh
sudo certbot certonly --manual -n \
  --preferred-challenges dns \
  --agree-tos -m <your-email> \
  --manual-auth-hook "vddcr <root-domain> <value-domain-api-key>" \
  -d <target-domain>
```

**上記コマンドの各項目の入力内容**

| 項目名               | 入力内容                                                                                                                                                |
| -------------------- | ------------------------------------------------------------------------------------------------------------------------------------------------------- |
| your-email           | ACMEアカウントのメールアドレス                                                                                                                          |
| root-domain          | [DNS設定の取得](https://www.value-domain.com/api/doc/domain/#tag/DNS/paths/~1domains~1{domain}~1dns/get)にある`/domains/{domain}/dns`の`{domain}`の部分 |
| value-domain-api-key | [Value DomainのAPI KEY](https://www.value-domain.com/vdapi/)                                                                                            |
| target-domain        | 証明書を発行したいドメイン                                                                                                                              |

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

単体で実行することはないと思いますが一応。

### 基本的な使い方

`vddcr <root-domain> <value-domain-api-key>`として実行できます。

また実行時に`CERTBOT_DOMAIN`と`CERTBOT_VALIDATION`の二つの環境変数が必要です。この環境変数の内容についてはcertbotのドキュメントを参照してください。

### その他

`vddcr -V`でバージョンが出ます。

## 既知の問題

- Value Domainのコントロールパネルから設定した内容からコメントが消えたり、行の並びが変わったりする
  - Value DomainのAPIの仕様なのでどうにもならない
- TTLが3600になる
  - Value DomainのAPIが3600を返してくるためどうにもならない。コントロールパネルの設定値は無視されている
- ワイルドカードドメインを対象にしようとしても上手くいかない可能性がある
  - 個人的に需要がないので動作確認してないです

## 参考サイト

### Value Domain

- [バリュードメインAPIドキュメント (1.0.0)](https://www.value-domain.com/api/doc/domain/)

### Certbot

- [Pre and Post Validation Hooks](https://certbot.eff.org/docs/using.html?highlight=dns#pre-and-post-validation-hooks)
- [Certbot command-line options](https://certbot.eff.org/docs/using.html?highlight=dns#certbot-command-line-options)
