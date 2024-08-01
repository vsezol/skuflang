import { Token } from './token';
import { TokenTypeName, tokenTypes } from './token-type';

export class Lexer {
  position = 0;
  tokenList: Token[] = [];

  constructor(readonly code: string) {}

  lexAnalysis(): Token[] {
    // eslint-disable-next-line no-empty
    while (this.nextToken()) {}

    this.tokenList = this.tokenList.filter(
      (token) => token.type.name !== TokenTypeName.Space
    );

    return this.tokenList;
  }

  nextToken(): boolean {
    if (this.position >= this.code.length) {
      return false;
    }

    const tokenTypesValues = Object.values(tokenTypes);

    for (let i = 0; i < tokenTypesValues.length; i++) {
      const tokenType = tokenTypesValues[i];
      const regexp = new RegExp('^' + tokenType.regexp);
      const result = this.code.substring(this.position).match(regexp);

      if (result?.[0]) {
        const token = new Token(tokenType, result[0], this.position);
        this.position += result[0].length;
        this.tokenList.push(token);
        return true;
      }
    }

    throw new Error(`Error on position ${this.position}`);
  }
}
