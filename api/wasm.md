# WASM

A `wasm-bindgen` build that runs a full backtest in the browser — no backend, no
upload. The same `run` signature and byte-identical reports as the native bindings.

```bash
npm install wickra-backtest-wasm
```

```javascript
import init, { run } from 'wickra-backtest-wasm'

await init()

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

For microstructure strategies, `run_json(requestJson)` takes one request bundle.

## More

- [npm (wickra-backtest-wasm)](https://www.npmjs.com/package/wickra-backtest-wasm)
- [Source & bindings](https://github.com/wickra-lib/wickra-backtest/tree/main/bindings/wasm)
