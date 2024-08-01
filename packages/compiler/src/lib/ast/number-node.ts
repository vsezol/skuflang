import { Token } from '../token';
import { ExpressionNode } from './expression-node';

export class NumberNode extends ExpressionNode {
  constructor(readonly number: Token) {
    super();
  }
}
