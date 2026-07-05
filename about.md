# About Wickra Backtest

Wickra Backtest is a streaming-native, event-driven backtester built on the Wickra
core. A strategy is **data — a JSON spec, not code** — so a backtest and a live run
over the same spec produce identical signals. **Backtest and live are byte-identical,
by construction, in ten languages.**

## What makes it different

- **Backtest ≡ live.** The engine consumes the exact same `wickra-core` O(1)
  indicator kernels that power live Wickra. The same engine, fed live bars instead of
  historical ones, becomes the live bot — no reimplementation drift.
- **The strategy is data.** A `StrategySpec` names the symbol, timeframe, indicators,
  entry/exit rules, sizing, costs and risk as JSON. Because it is data, the same spec
  runs identically across every binding and crosses the C ABI and WASM unchanged.
- **Value-identical across ten languages.** Reports are byte-identical from Rust,
  Python, Node.js, WASM, C, C++, C#, Go, Java and R, pinned by a shared golden corpus
  for the OHLCV path *and* every microstructure feed.
- **Runs in the browser.** The WASM binding runs a full backtest client-side — no
  backend, no upload.

## Why it exists

Most backtesters reimplement indicators separately from the live path, so a strategy
that looked good in backtest drifts in production. Wickra Backtest removes the drift by
sharing one kernel and defining the strategy surface once, in Rust, as a
JSON-over-C-ABI data API, exposed to Rust, Python, Node.js, WASM and — over a C ABI —
C, C++, C#, Go, Java and R.

## Open source

Released under the **MIT OR Apache-2.0** license — permissive, OSI-approved, free for
any use including commercial. Source, issues and releases on
[GitHub](https://github.com/wickra-lib/wickra-backtest).

## Disclaimer

Wickra Backtest is a software library, **not** a trading system, and is provided
**as-is with no warranty**. Backtest results are deterministic transforms of the input
data; they are not financial advice and do not predict future returns. Use it at your
own risk.
