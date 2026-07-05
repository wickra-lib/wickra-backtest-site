# Rust

The native crate. Fold a `StrategySpec` over a slice of `Candle`s with `run` to get a
`BacktestReport`. The same kernels drive the live path.

```bash
cargo add wickra-backtest
```

```rust
use wickra_backtest::{run, StrategySpec, Candle};

const SPEC: &str = r#"{
    "symbol": "BTCUSDT", "timeframe": "1h",
    "indicators": { "fast": {"type": "Ema", "params": [12]},
                    "slow": {"type": "Ema", "params": [26]} },
    "entry": { "cross_above": ["fast", "slow"] },
    "exit":  { "cross_below": ["fast", "slow"] },
    "sizing": { "type": "fixed_fraction", "fraction": 0.95 }
}"#;

let spec: StrategySpec = serde_json::from_str(SPEC).expect("valid spec");
let report = run(&spec, &candles).expect("run");
println!("{:?}", report.metrics);
```

For live use, `StreamingBacktest::new(&spec, capital)` then `step(candle)` per bar —
the same engine, one event at a time.

## More

- [crates.io/crates/wickra-backtest](https://crates.io/crates/wickra-backtest) · [docs.rs](https://docs.rs/wickra-backtest)
- [Source & examples](https://github.com/wickra-lib/wickra-backtest/tree/main/examples)
- [Strategy spec](https://github.com/wickra-lib/wickra-backtest/blob/main/docs/STRATEGY_SPEC.md)
