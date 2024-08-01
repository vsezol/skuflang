import { ExpressionNode } from './expression-node';

export class StatementsNode extends ExpressionNode {
  codeStrings: ExpressionNode[] = [];

  addNode(node: ExpressionNode): void {
    this.codeStrings.push(node);
  }
}
