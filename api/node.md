# Node.js

Native napi-rs bindings over the Rust core. Call `run(open, high, low, close, volume,
time, specJson, capital?)`; it returns the `BacktestReport` as a JSON string.

```bash
npm install wickra-backtest
```

```javascript
import { run } from 'wickra-backtest'

const spec = JSON.stringify({
  symbol: 'BTCUSDT', timeframe: '1h',
  indicators: { fast: { type: 'Ema', params: [12] }, slow: { type: 'Ema', params: [26] } },
  entry: { cross_above: ['fast', 'slow'] },
  exit:  { cross_below: ['fast', 'slow'] },
  sizing: { type: 'fixed_fraction', fraction: 0.95 },
})

const report = JSON.parse(run(open, high, low, close, volume, time, spec, 10_000))
console.log(report.metrics)
```

`capital` defaults to 10,000. For microstructure strategies, `runJson(requestJson)`
takes one request bundle (candles + spec + optional order-book / trade / derivatives
feeds).

## More

- [npm](https://www.npmjs.com/package/wickra-backtest)
- [Source & examples](https://github.com/wickra-lib/wickra-backtest/tree/main/examples)
