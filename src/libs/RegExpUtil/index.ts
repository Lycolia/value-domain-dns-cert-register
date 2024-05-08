/**
 * ドメイン文字列に登場する'.'や'*'を正規表現用にエスケープする
 * TODO: 但し今のところワイルドカードドメインには対応していない
 */
export const encodeRegExpDomainString = (str: string) => {
  return str.replace(/\./g, '\\.').replace(/\*/g, '\\*');
};
