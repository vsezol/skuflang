import { BinaryOperationNode } from './ast/binary-operation-node';
import { ExpressionNode } from './ast/expression-node';
import { NumberNode } from './ast/number-node';
import { StatementsNode } from './ast/statements-node';
import { UnaryOperationNode } from './ast/unary-operation-node';
import { VariableNode } from './ast/variable-node';
import { Token } from './token';
import { TokenType, TokenTypeName, tokenTypes } from './token-type';

export class Parser {
  position = 0;
  scope: any = {};

  constructor(readonly tokens: Token[]) {}

  run(node: ExpressionNode): any {
    if (node instanceof NumberNode) {
      return parseInt(node.number.text);
    }

    if (node instanceof UnaryOperationNode) {
      switch (node.operator.type.name) {
        case TokenTypeName.Log:
          console.log(this.run(node.operand));
          return;
      }
    }

    if (node instanceof BinaryOperationNode) {
      switch (node.operator.type.name) {
        case TokenTypeName.Minus:
          return this.run(node.leftNode) - this.run(node.rightNode);
        case TokenTypeName.Plus:
          return this.run(node.leftNode) + this.run(node.rightNode);
        case TokenTypeName.Assign:
          // eslint-disable-next-line no-case-declarations
          const result = this.run(node.rightNode);
          // eslint-disable-next-line no-case-declarations
          const variableNode = <VariableNode>node.leftNode;
          this.scope[variableNode.variable.text] = result;
          return result;
      }
    }

    if (node instanceof VariableNode) {
      if (this.scope[node.variable.text]) {
        return this.scope[node.variable.text];
      } else {
        throw new Error(
          `Variable with name ${node.variable.text} has not declared`
        );
      }
    }

    if (node instanceof StatementsNode) {
      node.codeStrings.forEach((codeString) => {
        this.run(codeString);
      });

      return;
    }

    throw new Error(`Unexpected error`);
  }

  match(...expected: TokenType[]): Token | null {
    if (this.position < this.tokens.length) {
      const currentToken = this.tokens[this.position];

      if (expected.find((type) => type.name === currentToken.type.name)) {
        this.position += 1;
        return currentToken;
      }
    }

    return null;
  }

  require(...expected: TokenType[]) {
    const token = this.match(...expected);

    if (!token) {
      throw new Error(
        `Expected ${expected[0].name} on position ${this.position}`
      );
    }

    return token;
  }

  parseCode(): ExpressionNode {
    const root = new StatementsNode();

    while (this.position < this.tokens.length) {
      const codeStringNode = this.parseExpression();
      this.require(tokenTypes[TokenTypeName.Semicolon]);
      root.addNode(codeStringNode);
    }

    return root;
  }

  parseExpression(): ExpressionNode {
    if (this.match(tokenTypes[TokenTypeName.Variable]) === null) {
      const printNode = this.parsePrint();

      return printNode;
    }
    this.position -= 1;

    const variableNode = this.parseVariableOrNumber();
    const assignOperator = this.match(tokenTypes[TokenTypeName.Assign]);

    if (assignOperator !== null) {
      const rightFormulaNode = this.parseFormula();
      const binaryNode = new BinaryOperationNode(
        assignOperator,
        variableNode,
        rightFormulaNode
      );
      return binaryNode;
    }

    throw new Error(
      `Expected assign operator after variable on position ${this.position}`
    );
  }

  parseVariableOrNumber(): ExpressionNode {
    const number = this.match(tokenTypes[TokenTypeName.Number]);

    if (number !== null) {
      return new NumberNode(number);
    }

    const variable = this.match(tokenTypes[TokenTypeName.Variable]);

    if (variable !== null) {
      return new VariableNode(variable);
    }

    throw new Error(`Expected variable or number on position ${this.position}`);
  }

  parseFormula(): ExpressionNode {
    let leftNode = this.parseParentheses();
    let operator = this.match(
      tokenTypes[TokenTypeName.Minus],
      tokenTypes[TokenTypeName.Plus]
    );
    while (operator !== null) {
      const rightNode = this.parseParentheses();
      leftNode = new BinaryOperationNode(operator, leftNode, rightNode);
      operator = this.match(
        tokenTypes[TokenTypeName.Minus],
        tokenTypes[TokenTypeName.Plus]
      );
    }

    return leftNode;
  }

  parseParentheses(): ExpressionNode {
    if (this.match(tokenTypes[TokenTypeName.LPar]) !== null) {
      const node = this.parseFormula();
      this.require(tokenTypes[TokenTypeName.RPar]);
      return node;
    } else {
      return this.parseVariableOrNumber();
    }
  }

  parsePrint(): ExpressionNode {
    const operatorLog = this.match(tokenTypes[TokenTypeName.Log]);

    if (operatorLog !== null) {
      return new UnaryOperationNode(operatorLog, this.parseFormula());
    }

    throw new Error(
      `Expected unary operator ${TokenTypeName.Log} on position ${this.position}`
    );
  }
}
