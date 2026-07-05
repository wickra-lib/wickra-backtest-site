# Go

A cgo wrapper over the C ABI. Pass OHLCV slices and a spec to `Run`; it returns the
`BacktestReport` as a JSON string.

```bash
go get github.com/wickra-lib/wickra-backtest-go
```

```go
package main

import (
	"fmt"

	wickrabacktest "github.com/wickra-lib/wickra-backtest-go"
)

const spec = `{"symbol":"BTCUSDT","timeframe":"1h",` +
	`"indicators":{"fast":{"type":"Ema","params":[12]},"slow":{"type":"Ema","params":[26]}},` +
	`"entry":{"cross_above":["fast","slow"]},"exit":{"cross_below":["fast","slow"]},` +
	`"sizing":{"type":"fixed_fraction","fraction":0.95}}`

func main() {
	// volume and time may be nil.
	report, err := wickrabacktest.Run(open, high, low, close, nil, nil, spec, 10000)
	if err != nil {
		panic(err)
	}
	fmt.Println(report)
}
```

## More

- [Go module (pkg.go.dev)](https://pkg.go.dev/github.com/wickra-lib/wickra-backtest-go)
- [Source & examples](https://github.com/wickra-lib/wickra-backtest/tree/main/examples/go)
