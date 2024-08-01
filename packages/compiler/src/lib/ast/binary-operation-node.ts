import { Token } from '../token';
import { ExpressionNode } from './expression-node';

export class BinaryOperationNode extends ExpressionNode {
  constructor(
    readonly operator: Token,
    readonly leftNode: ExpressionNode,
    readonly rightNode: ExpressionNode
  ) {
    super();
  }
}
