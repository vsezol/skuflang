export enum TokenTypeName {
  Number = 'Number',
  Variable = 'Variable',
  Semicolon = 'Semicolon',
  Space = 'Space',
  Assign = 'Assign',
  Log = 'Log',
  Plus = 'Plus',
  Minus = 'Minus',
  LPar = 'LPar',
  RPar = 'RPar',
}

export class TokenType {
  constructor(readonly name: TokenTypeName, readonly regexp: string) {}
}

export const tokenTypes: Record<TokenTypeName, TokenType> = {
  [TokenTypeName.Number]: new TokenType(TokenTypeName.Number, '[0-9]*'),
  [TokenTypeName.Variable]: new TokenType(TokenTypeName.Variable, '[a-z]*'),
  [TokenTypeName.Semicolon]: new TokenType(TokenTypeName.Semicolon, ';'),
  [TokenTypeName.Space]: new TokenType(TokenTypeName.Space, '[ \\n\\t\\r]'),
  [TokenTypeName.Assign]: new TokenType(TokenTypeName.Assign, '='),
  [TokenTypeName.Log]: new TokenType(TokenTypeName.Log, '///'),
  [TokenTypeName.Plus]: new TokenType(TokenTypeName.Plus, '\\+'),
  [TokenTypeName.Minus]: new TokenType(TokenTypeName.Minus, '\\-'),
  [TokenTypeName.LPar]: new TokenType(TokenTypeName.LPar, '\\('),
  [TokenTypeName.RPar]: new TokenType(TokenTypeName.RPar, '\\)'),
};
