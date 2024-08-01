import { Token } from '../token';
import { ExpressionNode } from './expression-node';

export class VariableNode extends ExpressionNode {
  constructor(readonly variable: Token) {
    super();
  }
}
