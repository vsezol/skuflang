import { Token } from '../token';
import { ExpressionNode } from './expression-node';

export class UnaryOperationNode extends ExpressionNode {
  constructor(readonly operator: Token, readonly operand: ExpressionNode) {
    super();
  }
}
