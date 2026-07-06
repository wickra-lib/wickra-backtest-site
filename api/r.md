# R

A `.Call` binding over the C ABI. Pass OHLCV vectors and a spec to `backtest_run`; it
returns the `BacktestReport` as a JSON string.

```r
install.packages("wickrabacktest", repos = "https://wickra-lib.r-universe.dev")
```

```r
library(wickrabacktest)

spec <- paste0(
  '{"symbol":"BTCUSDT","timeframe":"1h",',
  '"indicators":{"fast":{"type":"Ema","params":[12]},"slow":{"type":"Ema","params":[26]}},',
  '"entry":{"cross_above":["fast","slow"]},"exit":{"cross_below":["fast","slow"]},',
  '"sizing":{"type":"fixed_fraction","fraction":0.95}}'
)

# volume and time default to NULL; capital defaults to 10000.
report <- backtest_run(open, high, low, close, spec = spec, capital = 10000)
cat(report, "\n")
```

## More

- [r-universe](https://wickra-lib.r-universe.dev)
- [Source & examples](https://github.com/wickra-lib/wickra-backtest/tree/main/bindings/r)
