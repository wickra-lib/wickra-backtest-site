# Python

Native PyO3 bindings over the Rust core. Pass OHLCV arrays and a `StrategySpec` to
`run`; lists, `array.array` and NumPy arrays all work (NumPy is not required).

```bash
pip install wickra-backtest
```

```python
import wickra_backtest as wbt

spec = {
    "symbol": "BTCUSDT", "timeframe": "1h",
    "indicators": {"fast": {"type": "Ema", "params": [12]},
                   "slow": {"type": "Ema", "params": [26]}},
    "entry": {"cross_above": ["fast", "slow"]},
    "exit":  {"cross_below": ["fast", "slow"]},
    "sizing": {"type": "fixed_fraction", "fraction": 0.95},
}

report = wbt.run(opens, highs, lows, closes, spec=spec)
print(report["metrics"])
```

## More

- [PyPI](https://pypi.org/project/wickra-backtest/)
- [Source & examples](https://github.com/wickra-lib/wickra-backtest/tree/main/examples)
