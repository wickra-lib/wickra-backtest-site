# C#

Idiomatic .NET over the C ABI. Pass OHLCV arrays and a `StrategySpec` to the static
`Backtester.Run`; it returns the `BacktestReport` as a JSON string.

```bash
dotnet add package Wickra.Backtest
```

```csharp
using Wickra.Backtest;

const string spec = """
{"symbol":"BTCUSDT","timeframe":"1h",
 "indicators":{"fast":{"type":"Ema","params":[12]},"slow":{"type":"Ema","params":[26]}},
 "entry":{"cross_above":["fast","slow"]},
 "exit":{"cross_below":["fast","slow"]},
 "sizing":{"type":"fixed_fraction","fraction":0.95}}
""";

string reportJson = Backtester.Run(open, high, low, close, volume, time, spec, 10000);
Console.WriteLine(reportJson);
```

Targets .NET 8. `Backtester.RunJson(requestJson)` takes a full request bundle for
microstructure strategies.

## More

- [NuGet](https://www.nuget.org/packages/Wickra.Backtest)
- [Source & examples](https://github.com/wickra-lib/wickra-backtest/tree/main/bindings/csharp)
