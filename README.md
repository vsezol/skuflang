# SkufLang - blazingly slow and non-scalable programming language

## You can run via cli

```skuflang
biba = 5 + 8 + (4 - 6);
/// biba;
boba = biba + 3;
/// boba + biba - 6;
```

```sh
npx @skuflang/cli helloworld.skuf
```

```sh
Output:
> 11
> 19
```

## You can run via JS/TS

```ts
import { run } from '@skuflang/compiler';

const code = `
  biba = 5 + 8 + (4 - 6);
  /// biba;
  boba = biba + 3;
  /// boba + biba - 6;
`;

run(code);
```
