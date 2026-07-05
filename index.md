---
layout: home
title: Wickra Backtest — backtest and live are byte-identical
titleTemplate: false

hero:
  name: "Wickra Backtest"
  text: "Backtest and live — byte-identical."
  tagline: "A streaming-native, event-driven backtester on the Wickra core. A strategy is a JSON spec, not code, so a backtest and a live run over the same spec produce identical signals — across ten languages."
  image:
    src: /wickra-mark.svg
    alt: Wickra Backtest
  actions:
    - theme: brand
      text: View on GitHub
      link: https://github.com/wickra-lib/wickra-backtest
    - theme: alt
      text: Strategy spec
      link: https://github.com/wickra-lib/wickra-backtest/blob/main/docs/STRATEGY_SPEC.md
    - theme: alt
      text: API
      link: /api/rust

features:
  - icon: 🔁
    title: Backtest ≡ live
    details: "The engine consumes the exact same wickra-core O(1) indicator kernels that power live Wickra. The same engine, fed live bars, is the live bot — no reimplementation drift."
  - icon: 🧩
    title: The strategy is JSON, not code
    details: "A StrategySpec names the symbol, timeframe, indicators, entry/exit rules, sizing, costs and risk. Because it is data, the same spec crosses the C ABI and WASM unchanged."
  - icon: 🎯
    title: Value-identical across 10 languages
    details: "Reports are byte-identical from Rust, Python, Node.js, WASM, C, C++, C#, Go, Java and R, pinned by a shared golden corpus for the OHLCV path and every microstructure feed."
  - icon: ⚡
    title: Event-driven & streaming
    details: "Bars are processed one event at a time over an O(1) streaming state — no look-ahead, no vectorized shortcuts that leak the future."
  - icon: 🌍
    title: Runs in the browser
    details: "The WASM binding runs a full backtest client-side — no backend, no upload. Paste a spec, drop in candles, get the report."
  - icon: 🌐
    title: 10 languages
    details: "The core is a JSON-over-C-ABI data API in Rust, Python, Node.js, WASM, C, C++, C#, Go, Java and R, plus the wkbt command-line backtester."
---

<script setup>
const installTabs = [
  { label: 'Python', lang: 'bash', code: 'pip install wickra-backtest' },
  { label: 'Node',   lang: 'bash', code: 'npm install wickra-backtest' },
  { label: 'Rust',   lang: 'bash', code: 'cargo add wickra-backtest' },
  { label: 'WASM',   lang: 'bash', code: 'npm install wickra-backtest-wasm' },
  { label: 'C',      lang: 'bash', code: '# prebuilt header + library from GitHub releases:\n# github.com/wickra-lib/wickra-backtest/releases' },
  { label: 'C#',     lang: 'bash', code: 'dotnet add package Wickra.Backtest' },
  { label: 'Go',     lang: 'bash', code: 'go get github.com/wickra-lib/wickra-backtest-go' },
  { label: 'Java',   lang: 'xml',  code: '<!-- Maven Central -->\n<dependency>\n  <groupId>org.wickra</groupId>\n  <artifactId>wickra-backtest</artifactId>\n  <version>0.1.0</version>\n</dependency>' },
  { label: 'R',      lang: 'r',    code: 'install.packages("wickrabacktest", repos = "https://wickra-lib.r-universe.dev")' },
]

const pyCode = `import wickra_backtest as wbt

spec = {
    "symbol": "BTCUSDT", "timeframe": "1h",
    "indicators": {"fast": {"type": "Ema", "params": [12]},
                   "slow": {"type": "Ema", "params": [26]}},
    "entry": {"cross_above": ["fast", "slow"]},
    "exit":  {"cross_below": ["fast", "slow"]},
    "sizing": {"type": "fixed_fraction", "fraction": 0.95},
}

report = wbt.run(opens, highs, lows, closes, spec=spec)
print(report["metrics"])`

const nodeCode = `import { run } from 'wickra-backtest'

const spec = JSON.stringify({
  symbol: 'BTCUSDT', timeframe: '1h',
  indicators: { fast: { type: 'Ema', params: [12] }, slow: { type: 'Ema', params: [26] } },
  entry: { cross_above: ['fast', 'slow'] },
  exit:  { cross_below: ['fast', 'slow'] },
  sizing: { type: 'fixed_fraction', fraction: 0.95 },
})

const report = JSON.parse(run(open, high, low, close, volume, time, spec, 10_000))
console.log(report.metrics)`

const cliCode = `# Run a strategy spec over a CSV of candles:
wkbt run --data examples/sample.csv --spec examples/ema-cross.json

# Print the JSON schema every StrategySpec is validated against:
wkbt schema`

const snippetTabs = [
  { label: 'Python', lang: 'python',     code: pyCode },
  { label: 'Node',   lang: 'javascript', code: nodeCode },
  { label: 'CLI',    lang: 'bash',       code: cliCode },
]
</script>

## The strategy is JSON, not code

A `StrategySpec` names the `symbol`, `timeframe`, the `indicators` to compute, the
`entry`/`exit` rules over them, plus `sizing`, `costs` and `risk`. The same spec runs
identically in a backtest and, fed live bars, in production.

```json
{
  "symbol": "BTCUSDT",
  "timeframe": "1h",
  "indicators": {
    "ema_fast": { "type": "Ema", "params": [5] },
    "ema_slow": { "type": "Ema", "params": [15] }
  },
  "entry": { "cross_above": ["ema_fast", "ema_slow"] },
  "exit":  { "cross_below": ["ema_fast", "ema_slow"] },
  "sizing": { "type": "fixed_fraction", "fraction": 0.95 },
  "costs":  { "taker_bps": 5, "slippage": { "type": "fixed_bps", "bps": 2 } },
  "risk":   { "trailing_stop_pct": 5.0 }
}
```

The spec can reference hundreds of `wickra-core` indicators by name, with
multi-output fields addressed as `"name.field"` (`macd.signal`, `bb.upper`,
`adx.plus_di`). Because the spec is data, the backtest report comes back
byte-for-byte in every language.

## Install

The same engine from every language — native Rust, Python, Node.js and WASM, plus a C
ABI for C, C++, C#, Go, Java and R.

<InstallTabs :tabs="installTabs" />

## Run a strategy, get a report

Feed OHLCV arrays and a spec to `run`; the same call in every binding returns the same
`BacktestReport` — `metrics`, `trades`, `equity`, `fees_paid`.

<InstallTabs :tabs="snippetTabs" />

## Built on the Wickra core

Wickra Backtest is part of the [Wickra](https://wickra.org) ecosystem. Its indicators
are the same O(1) kernels that
[`wickra-core`](https://github.com/wickra-lib/wickra) computes live and that
[`wickra-exchange`](https://github.com/wickra-lib/wickra-exchange) trades on, so a
backtest reasons over exactly the numbers a live strategy would see.

> Wickra Backtest is a software library, not a trading system, and gives no financial
> advice — backtest results are deterministic transforms of the input data and do not
> predict future returns. Use it at your own risk.
