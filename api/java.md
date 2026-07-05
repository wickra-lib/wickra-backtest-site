# Java

An FFM (Panama) wrapper over the C ABI. Pass OHLCV arrays and a spec to the static
`Backtester.run`; it returns the `BacktestReport` as a JSON string.

```xml
<!-- Maven Central -->
<dependency>
  <groupId>org.wickra</groupId>
  <artifactId>wickra-backtest</artifactId>
  <version>0.1.0</version>
</dependency>
```

```java
import org.wickra.backtest.Backtester;

public final class Run {
    private static final String SPEC = """
        {"symbol":"BTCUSDT","timeframe":"1h",
         "indicators":{"fast":{"type":"Ema","params":[12]},"slow":{"type":"Ema","params":[26]}},
         "entry":{"cross_above":["fast","slow"]},"exit":{"cross_below":["fast","slow"]},
         "sizing":{"type":"fixed_fraction","fraction":0.95}}""";

    public static void main(String[] args) {
        // capital defaults to 10,000.
        String reportJson = Backtester.run(open, high, low, close, SPEC);
        System.out.println(reportJson);
    }
}
```

The binding uses the Java Foreign Function & Memory API, so it needs JDK 22+ and
`--enable-native-access`.

## More

- [Maven Central](https://central.sonatype.com/artifact/org.wickra/wickra-backtest)
- [Source & examples](https://github.com/wickra-lib/wickra-backtest/tree/main/examples/java)
