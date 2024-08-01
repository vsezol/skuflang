import { Lexer } from './lexer';
import { Parser } from './parser';

export const run = (code: string) => {
  const lexer = new Lexer(code);
  lexer.lexAnalysis();
  const parser = new Parser(lexer.tokenList);
  const rootExpression = parser.parseCode();
  return parser.run(rootExpression);
};
