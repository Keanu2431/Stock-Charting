class App {
  _ticker;
  _dailyData;
  _sixtyData;
  _thirtyData;
  _fiveData;
  constructor(ticker) {
    this._ticker = ticker.toUpperCase();
    // this._getStockDataDaily();
    // this._getStockDataHour();
    // this._getStockDataThirty();
    // this._getStockDataFive();
  }

  timeOut = (seconds) =>
    new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  _getStockDataDaily() {
    return (
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${this._ticker}&apikey=QJ1U982IFZYO3Q41`
      )
        .then((data) => {
          return data.json();
        })

        //   .then((obj) => obj)
        .then((final) => {
          this._dailyData = final[`Time Series (Daily)`];
          return final[`Time Series (Daily)`];
        })
    );
  }
  _getStockDataHour() {
    return fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this._ticker}&interval=60min&apikey=QJ1U982IFZYO3Q41`
    )
      .then((data) => data.json())
      .then((data) => {
        this._sixtyData = data[`Time Series (60min)`];
      });
    //   .then(() => console.log(this._sixtyData));
  }
  _getStockDataThirty() {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this._ticker}&interval=30min&apikey=QJ1U982IFZYO3Q41`
    )
      .then((data) => data.json())
      .then((data) => {
        this._thirtyData = data[`Time Series (30min)`];
      });
  }
  _getStockDataFive() {
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${this._ticker}&interval=5min&apikey=QJ1U982IFZYO3Q41`
    )
      .then((data) => data.json())
      .then((data) => {
        this._fiveData = data[`Time Series (5min)`];
        // console.log(this);
      });
  }
  printThis() {
    console.log(this);
  }
}

// initiating the chart

function tooltip(point) {
  var color = point.options("close") > point.options("open") ? "green" : "red";
  return (
    'Change: <span style="color:' +
    color +
    '">{%close-%open}</span><br>Open: %open<br/>High: %high<br/>Low: %low<br/>Close: %close'
  );
}
// initiating the chart

const chart = JSC.chart("chartDiv", {
  debug: true,
  type: "candlestick",
  palette: "fiveColor18",
  legend: {
    template: "%icon %name",
    position: "inside top left",
  },
  yAxis: {
    formatString: "c",
    markers: [
      /* The legend entry is unified into only the support marker to represent both support and resistance. */
      {
        value: 102.2,
        color: "crimson",
        label: { text: "Resistance", align: "center" },
        legendEntry_visible: false,
      },
      {
        value: 91,
        color: "crimson",
        label: { text: "Support", align: "center" },
        legendEntry_name: "Support/Resistance",
      },
    ],
  },
  xAxis_crosshair_enabled: true,
  defaultPoint: {
    outline_width: 0,
    altColor: "#ff4734",
    color: "#33ae5b",
    subvalue_line_color: "#555",
    tooltip: tooltip,
  },
  xAxis_scale_type: "time",
  series: [
    {
      name: "MSFT",
      points: [
        ["11/15/2014", 93.87, 94.91, 93.7, 93.76],
        ["11/16/2014", 93.91, 94.33, 92.07, 92.45],
        ["11/17/2014", 93.14, 93.55, 91.52, 91.6],
        ["11/18/2014", 92.56, 93, 92, 92.05],
        ["11/21/2014", 92.03, 92.62, 91.22, 91.59],
        ["11/22/2014", 91.9, 93.14, 91.81, 91.96],
        ["11/23/2014", 92.32, 92.5, 91.18, 91.7],
        ["11/25/2014", 91.87, 92.45, 91.41, 91.8],
        ["11/28/2014", 93.19, 93.99, 93.07, 93.06],
        ["11/29/2014", 93.54, 93.79, 93.11, 93.46],
        ["11/30/2014", 94.85, 95.54, 94.64, 95.52],
        ["12/1/2014", 95.44, 95.88, 95.22, 95.5],
        ["12/2/2014", 96.37, 96.47, 95.32, 95.7],
        ["12/5/2014", 96.42, 96.59, 95.08, 95.35],
        ["12/6/2014", 95.47, 96.27, 94.82, 96.01],
        ["12/7/2014", 95.83, 96.65, 95.5, 96.45],
        ["12/8/2014", 97.03, 98.29, 96.72, 96.92],
        ["12/9/2014", 97.67, 98.43, 97.62, 98.03],
        ["12/12/2014", 97.67, 98.53, 97.2, 98.48],
        ["12/13/2014", 98.74, 98.95, 97.76, 98],
        ["12/14/2014", 97.76, 98.46, 97.16, 97.61],
        ["12/15/2014", 98.51, 98.78, 97.86, 98.14],
        ["12/16/2014", 98.54, 98.62, 97.08, 97.49],
        ["12/19/2014", 97.92, 98.37, 96.98, 97.24],
        ["12/20/2014", 98.07, 98.92, 97.93, 98.82],
        ["12/21/2014", 98.98, 99.5, 98.7, 99.2],
        ["12/22/2014", 99.24, 99.35, 98.55, 98.6],
        ["12/23/2014", 98.84, 100.15, 98.76, 100.15],
        ["12/27/2014", 100.17, 100.82, 100, 100.55],
        ["12/28/2014", 100.73, 100.75, 99.46, 99.58],
        ["12/29/2014", 99.75, 101, 99.6, 100.81],
        ["12/30/2014", 100.43, 100.82, 100.06, 100.33],
        ["1/3/2015", 101.33, 101.59, 98.75, 98.84],
        ["1/4/2015", 99.11, 100.3, 98.76, 99.39],
        ["1/5/2015", 99.47, 100.4, 98.68, 99.83],
        ["1/6/2015", 100.09, 100.77, 99.87, 100.6],
        ["1/9/2015", 100.88, 100.93, 99.51, 99.64],
        ["1/10/2015", 100.24, 100.45, 99.35, 99.7],
        ["1/11/2015", 99.62, 100.11, 99.35, 99.93],
        ["1/12/2015", 100.37, 100.65, 100.07, 100.57],
        ["1/13/2015", 100.18, 100.43, 99.61, 100.35],
        ["1/17/2015", 100.59, 101.2, 100.05, 100.55],
        ["1/18/2015", 100.9, 101.87, 100.74, 101.56],
        ["1/19/2015", 101.77, 101.8, 100.7, 101.26],
        ["1/20/2015", 101.39, 102.22, 101.27, 101.74],
        ["1/23/2015", 101.71, 101.89, 100.04, 100.95],
        ["1/24/2015", 101.02, 101.02, 98.41, 98.75],
        ["1/25/2015", 98.41, 99.51, 98.05, 99.23],
        ["1/26/2015", 99.54, 99.71, 98.69, 99.18],
        ["1/27/2015", 98.57, 98.94, 98.35, 98.69],
        ["1/30/2015", 98.04, 98.81, 97.7, 98.69],
        ["1/31/2015", 99.04, 99.26, 98.25, 99.05],
        ["2/1/2015", 99.46, 99.49, 98.36, 98.4],
        ["2/2/2015", 98.26, 98.82, 98.26, 98.62],
        ["2/3/2015", 99.18, 100.27, 99.04, 100.01],
        ["2/6/2015", 99.96, 100, 99.34, 99.49],
        ["2/7/2015", 99.57, 101.18, 99.56, 100.91],
        ["2/8/2015", 101.12, 101.29, 99.6, 100.05],
      ],
    },
  ],
});
// DOM Elements
const title = document.querySelector(`#ticker-chart`);
const search = document.querySelector(`#search-inp`);
const btn = document.querySelector(`#search-btn`);
// DOM Manip
const displayTicker = function (stock) {
  const test = new App(stock);
  title.textContent = test._ticker;
  test._getStockDataDaily();
  console.log(test);
};

displayTicker(`aapl`);
// const test = new App(`msft`);
// title.textContent = test._ticker;
// test._getStockDataDaily();
// setTimeout(function () {
//   console.log(test);
// }, 3000);
// console.log(test);
// console.log(check._getStockDataDaily().then((data) => console.log(data)));