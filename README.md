# Cartbot 使って Value-Domain の DNS-01 Challenge するやつ

## 必要環境

- Linux
- [certbot](https://certbot.eff.org/)
- Node.js 18

## インストール方法

`npm i -g @lycolia/value-domain-dns-cert-register`

## 使い方

certbot はインストールされている前提

### 1. ACME account の作成

```sh
certbot register
```

### 2. Value-Domain の API KEY を取得

- [こっから取ってくる](https://www.value-domain.com/vdapi/)

### 3. 次のコマンドを流す

```sh
sudo certbot certonly --manual -n \
--preferred-challenges dns \
--agree-tos -m [your-email] \
--manual-auth-hook "vddcr <ルートドメイン> <Value-DomainのAPI KEY>" \
-d <証明書を作るドメイン>
```

### 4. 定期実行

- 上記コマンドを crontab あたりに突っ込んでおく

## 参考文献

### Value-Domain

- [Value-Domain API Document (1.0.0)](https://www.value-domain.com/api/doc/domain/)

### Certbot

- [Pre and Post Validation Hooks](https://certbot.eff.org/docs/using.html?highlight=dns#pre-and-post-validation-hooks)
- [Certbot command-line options](https://certbot.eff.org/docs/using.html?highlight=dns#certbot-command-line-options)

## こんとりびゅーしょん

- バグとかあったら Issue を書くか PR 出してくれれば見るかもしれません
