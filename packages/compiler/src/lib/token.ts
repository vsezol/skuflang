import { TokenType } from './token-type';

export class Token {
  constructor(
    readonly type: TokenType,
    readonly text: string,
    readonly position: number
  ) {}
}
