import { run } from '@skuflang/compiler';

const code = `
  biba = 5 + 8 + (4 - 6);
  /// biba;
  boba = biba + 3;
  /// boba + biba - 6;
`;

run(code);
