In stock trading, various algorithms are used to analyze price movements, trends, and patterns. Like the Simple Moving Average (SMA), many of these are designed to help identify signals for buying, selling, or holding. Here are a few commonly used algorithms and technical indicators in stock trading:

### 1. **Exponential Moving Average (EMA)**
   - **Description**: The Exponential Moving Average gives more weight to recent prices, making it more responsive to new information compared to the SMA. It is often used to capture short-term trends.
   - **Formula**:
     \[
     EMA_{t} = (P_{t} \times \frac{2}{n+1}) + (EMA_{t-1} \times (1 - \frac{2}{n+1}))
     \]
     Where \(P_{t}\) is the price at time \(t\), and \(n\) is the number of periods.
   - **Use case**: Used for identifying trends and confirming price movements.

### 2. **Relative Strength Index (RSI)**
   - **Description**: RSI is a momentum oscillator that measures the speed and change of price movements. It ranges from 0 to 100, with values above 70 indicating overbought conditions and values below 30 indicating oversold conditions.
   - **Formula**:
     \[
     RSI = 100 - \left( \frac{100}{1 + \frac{\text{Average Gain}}{\text{Average Loss}}} \right)
     \]
   - **Use case**: Detects momentum and possible reversal points by determining if a stock is overbought or oversold.

### 3. **Bollinger Bands**
   - **Description**: Bollinger Bands consist of a moving average with upper and lower bands that are two standard deviations away from the SMA. It measures market volatility.
   - **Formula**:
     - Upper Band = \(SMA + 2 \times \sigma\)
     - Lower Band = \(SMA - 2 \times \sigma\)
     Where \(SMA\) is the Simple Moving Average and \(\sigma\) is the standard deviation of price.
   - **Use case**: Helps traders recognize potential overbought or oversold conditions based on price volatility.

### 4. **Moving Average Convergence Divergence (MACD)**
   - **Description**: MACD is a trend-following momentum indicator that shows the relationship between two moving averages of a stock’s price. It uses a 26-period and 12-period EMA, along with a 9-period EMA as the signal line.
   - **Formula**:
     \[
     MACD = EMA_{12} - EMA_{26}
     \]
     The signal line is the 9-period EMA of the MACD.
   - **Use case**: Identifies changes in momentum, strength, and duration of a trend, signaling possible buy or sell points.

### 5. **Stochastic Oscillator**
   - **Description**: The Stochastic Oscillator compares the closing price of a stock to a range of its prices over a certain period of time. It ranges from 0 to 100, where values above 80 indicate an overbought condition, and values below 20 indicate an oversold condition.
   - **Formula**:
     \[
     \%K = \left( \frac{P_{t} - L_{n}}{H_{n} - L_{n}} \right) \times 100
     \]
     Where \(P_{t}\) is the latest closing price, \(L_{n}\) is the lowest price over \(n\) periods, and \(H_{n}\) is the highest price over \(n\) periods.
   - **Use case**: Used for identifying potential reversal points and momentum.

### 6. **Average True Range (ATR)**
   - **Description**: ATR measures market volatility by analyzing the range between the highest and lowest prices over a specific period. It is not used to predict trends but helps traders assess the volatility.
   - **Formula**:
     \[
     ATR = \text{Moving Average of True Ranges}
     \]
     Where the True Range is the greatest of the following: current high - current low, absolute value of current high - previous close, or absolute value of current low - previous close.
   - **Use case**: Used to set stop-loss points and manage risk based on volatility.

### 7. **Parabolic SAR (Stop and Reverse)**
   - **Description**: The Parabolic SAR is a trend-following indicator that provides potential reversal points in price trends. The indicator plots a series of dots above or below the price, signaling when to stop and reverse positions.
   - **Formula**:
     \[
     SAR = SAR_{previous} + \text{AF} \times (EP - SAR_{previous})
     \]
     Where \(EP\) is the extreme point (highest high or lowest low) during the trend, and \(AF\) is the acceleration factor, which starts at 0.02 and increases by 0.02.
   - **Use case**: Used for placing trailing stop losses and spotting potential reversals.

### 8. **Fibonacci Retracement**
   - **Description**: Fibonacci retracement levels are horizontal lines that indicate where support and resistance are likely to occur. They are derived from the Fibonacci sequence (e.g., 23.6%, 38.2%, 50%, 61.8%, 78.6%).
   - **Use case**: Helps traders identify possible price reversal levels based on the retracement of previous price movements.

### 9. **Volume-Weighted Average Price (VWAP)**
   - **Description**: VWAP provides the average price a stock has traded at throughout the day, based on both volume and price. It is useful for gauging the value of a stock over a period of time.
   - **Formula**:
     \[
     VWAP = \frac{\sum(P_t \times V_t)}{\sum V_t}
     \]
     Where \(P_t\) is the price at time \(t\) and \(V_t\) is the volume at time \(t\).
   - **Use case**: Used by institutional traders to determine whether they are buying or selling at a fair price relative to the average market price.

### 10. **Ichimoku Cloud**
   - **Description**: The Ichimoku Cloud is a comprehensive indicator that shows support and resistance levels, trend direction, and momentum. It includes five lines: Tenkan-sen, Kijun-sen, Senkou Span A, Senkou Span B, and Chikou Span.
   - **Use case**: Helps identify potential trends, support, and resistance levels, along with crossover points for possible trading signals.

---

These algorithms and indicators can be used alone or in combination, depending on the trader's strategy and the market conditions. They are widely used in technical analysis for making informed trading decisions.