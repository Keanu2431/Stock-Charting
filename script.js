// OOP Classes
class Graph {
  constructor() {}
  _plotDaily(ticker) {
    currentTicker = ticker.toUpperCase();
    let response;
    let dataArr = [];
    let dataProper = [];
    let max, min;
    loader.classList.remove(`hidden`);

    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY_ADJUSTED&symbol=${ticker}&outputsize=full&apikey=QJ1U982IFZYO3Q41`
    )
      .then((data) => data.json())
      .then((data) => {
        if (data["Note"]) {
          errorMessage.classList.remove(`hidden`);
          // retry the search
          setTimeout(function () {
            btnSearch.click();
          }, 61000);
          throw new Error(`Too Many Request,Wait 1Minute`);
        } else if (data["Error Message"]) {
          alert(`Stock Doesn't Exist`);
          throw new Error(`Stock Doesn't Exist`);
        }
        return (response = data[`Time Series (Daily)`]);
      })
      .then((data) => {
        for (const [date, value] of Object.entries(data)) {
          dataArr.push([date, value]);
        }
        dataArr.splice(365);
        for (let index = 0; index < dataArr.length; index++) {
          const element = dataArr[index];
          dataProper.push([
            element[0],
            Number(Number(element[1]["1. open"]).toFixed(2)),
            Number(Number(element[1]["2. high"]).toFixed(2)),
            Number(Number(element[1]["3. low"]).toFixed(2)),
            Number(Number(element[1]["4. close"]).toFixed(2)),
          ]);
        }
        return dataProper;
      })
      .then(() => {
        // finding max
        const highVal = [];
        dataProper.forEach(function (el) {
          highVal.push(el[4]);
        });
        const high = Math.max(...highVal);
        max = high;
        // finding min
        const lowVal = [];
        dataProper.forEach(function (el) {
          lowVal.push(el[4]);
        });
        const low = Math.min(...lowVal);
        min = low;
      })
      .then(() => {
        // plotting graph
        loader.classList.add(`hidden`);
        errorMessage.classList.add(`hidden`);
        this._graph(ticker, dataProper, max, min);
      })
      .catch((err) => console.error(err));
  }
  _switchTime(ticker, time) {
    let candles;
    loader.classList.remove(`hidden`);

    if (time === `1`) {
      candles = 579;
    } else if (time === `5`) {
      candles = 133;
    } else if (time === `15`) {
      candles = 64;
    } else if (time === `30`) {
      candles = 250;
    } else if (time === `60`) {
      candles = 352;
    }
    let response;
    let dataArr = [];
    let dataProper = [];
    let max, min;
    if (time == `1Day`) {
      this._plotDaily(ticker);
    } else {
    }
    fetch(
      `https://www.alphavantage.co/query?function=TIME_SERIES_INTRADAY&symbol=${ticker}&interval=${time}min&outputsize=full&apikey=QJ1U982IFZYO3Q41`
    )
      .then((data) => {
        return data.json();
      })
      .then((data) => {
        if (data["Note"]) {
          errorMessage.classList.remove(`hidden`);
          throw new Error(`Too Many Request,Wait 1Minute`);
        }
        return (response = data[`Time Series (${time}min)`]);
      })
      .then((data) => {
        for (const [date, value] of Object.entries(data)) {
          dataArr.push([date, value]);
        }
        dataArr.splice(candles);
        for (let index = 0; index < dataArr.length; index++) {
          const element = dataArr[index];
          dataProper.push([
            element[0],
            Number(Number(element[1]["1. open"]).toFixed(2)),
            Number(Number(element[1]["2. high"]).toFixed(2)),
            Number(Number(element[1]["3. low"]).toFixed(2)),
            Number(Number(element[1]["4. close"]).toFixed(2)),
          ]);
        }
        return dataProper;
      })
      .then(() => {
        // finding max
        const highVal = [];
        dataProper.forEach(function (el) {
          highVal.push(el[4]);
        });
        const high = Math.max(...highVal);
        max = high;
        // finding min
        const lowVal = [];
        dataProper.forEach(function (el) {
          lowVal.push(el[4]);
        });
        const low = Math.min(...lowVal);
        min = low;
      })
      .then(() => {
        // plotting graph
        loader.classList.add(`hidden`);
        errorMessage.classList.add(`hidden`);
        this._graph(ticker, dataProper, max, min);
      })
      .catch((err) => console.error(err));
  }
  _graph(ticker, data, max, min, adjuster = 1) {
    if (Number(data[0][4]) < Number(data[1][4])) {
      title.style.color = `#ff4734`;
    } else if (!(Number(data[0][4]) < Number(data[1][4]))) {
      title.style.color = `#33ae5b`;
    } else return;
    title.textContent = `${ticker.toUpperCase()} $${data[0][4]}`;

    const chart = JSC.chart("chartDiv", {
      debug: true,
      type: "candlestick",
      palette: "fiveColor18",
      legend: {
        template: "%icon %name",
        position: "inside top left",
      },
      yAxis: {
        formatString: "apples",
        markers: [
          /* The legend entry is unified into only the support marker to represent both support and resistance. */
          {
            value: max,
            color: "crimson",
            label: { text: `High(${max})`, align: "left" },
            legendEntry_visible: false,
          },
          {
            value: 0,
            color: "cyan",
            label: {
              text: `Key Levels`,
              align: "right",
            },
            legendEntry_visible: true,
          },
          {
            value: ((max - min) / 2 + min) * 1.09,
            color: "cyan",
            label: {
              text: `(${Number(((max - min) / 2 + min) * 1.09).toFixed(2)})`,
              align: "right",
            },
            legendEntry_visible: false,
          },
          {
            value: ((max - min) / 2 + min) * 1.06,
            color: "cyan",
            label: {
              text: `(${Number(((max - min) / 2 + min) * 1.06).toFixed(2)})`,
              align: "right",
            },
            legendEntry_visible: false,
          },
          {
            value: ((max - min) / 2 + min) * 1.02,
            color: "cyan",
            label: {
              text: `(${Number(((max - min) / 2 + min) * 1.02).toFixed(2)})`,
              align: "right",
            },
            legendEntry_visible: false,
          },
          {
            value: ((max - min) / 2 + min) * 0.98,
            color: "cyan",
            label: {
              text: `(${Number(((max - min) / 2 + min) * 0.98).toFixed(2)})`,
              align: "right",
            },
            legendEntry_visible: false,
          },
          {
            value: ((max - min) / 2 + min) * 0.95,
            color: "cyan",
            label: {
              text: `(${Number(((max - min) / 2 + min) * 0.95).toFixed(2)})`,
              align: "right",
            },
            legendEntry_visible: false,
          },
          {
            value: ((max - min) / 2 + min) * 0.93,
            color: "cyan",
            label: {
              text: `(${Number(((max - min) / 2 + min) * 0.93).toFixed(2)})`,
              align: "right",
            },
            legendEntry_visible: false,
          },
          {
            value: min,
            color: "#33ae5b",
            label: { text: `Low(${min})`, align: "left" },
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
        tooltip: this._toolTip,
      },
      xAxis_scale_type: "time",

      series: [
        {
          name: ticker.toUpperCase(),
          points: data,
        },
      ],
    });
  }
  _wait(seconds) {
    return new Promise((resolve) => setTimeout(resolve, seconds * 1000));
  }
  _toolTip(point) {
    var color =
      point.options("close") > point.options("open") ? "green" : "red";
    return (
      'Change: <span style="color:' +
      color +
      '">{%close-%open}</span><br>Open: %open<br/>High: %high<br/>Low: %low<br/>Close: %close'
    );
  }
}
class Watchlist extends Graph {
  constructor() {
    super();
  }
  _addToWatchlist(ticker) {
    let dataArr = [];
    if (watchlistData?.flat()?.includes(ticker)) {
      return;
    } else {
      // fetching data
      fetch(
        `https://www.alphavantage.co/query?function=TIME_SERIES_DAILY&symbol=${ticker}&apikey=QJ1U982IFZYO3Q41`
      )
        .then((data) => data.json())

        .then((data) => {
          if (data["Note"]) {
            errorMessage.classList.remove(`hidden`);
            throw new Error(`Too Many Request,Wait 1Minute`);
          }
          return data[`Time Series (Daily)`];
        })
        // breakign data down
        .then((data) => {
          for (const [i, value] of Object.entries(data)) {
            dataArr.push(Number(Number(value["4. close"]).toFixed(2)));
          }
          dataArr.splice(2);
          dataArr.push(currentTicker);
          if (
            JSON.parse(localStorage.getItem(`watchlistKey`)) == undefined ||
            JSON.parse(localStorage.getItem(`watchlistKey`)) == null
          ) {
            watchlistData.push(dataArr);
          } else watchlistData.unshift(dataArr);
          return watchlistData[0];
        })
        // populating
        .then((data) => {
          let stringTemplate = `<div class="list-item" id="list-temp"     data-stock="${
            data[2]
          }">
          <h1 id="ticker">
          
          <span class="remove" data-stock="${data[2]}">x</span>
          
          ${data[2]}</h1>
          
          <h1 id="change-item" style="color:${
            data[0] > data[1] ? "#33ae5b" : "#ff4734"
          };">%${Number(
            100 *
              Number(
                Math.abs(Number(data[1]) - Number(data[0])) /
                  ((Number(data[1]) + Number(data[0])) / 2)
              )
          ).toFixed(2)}</h1>
          <h1 id="last">${Number(data[0]).toFixed(2)}
          </h1>
        </di>
        </div>`;
          listTemp.insertAdjacentHTML(`afterend`, stringTemplate);
          this._pushToLocal();
          removeBtn = document.querySelectorAll(`.remove`);
        });
    }
  }

  _removeFromWatchlist(btn) {
    listItems = document.querySelectorAll(`.list-item`);
    let stock = btn.target.dataset.stock;
    let targeted = watchlistData.findIndex((el) => el.includes(stock));
    let targetedDiv;
    watchlistData.splice(targeted, 1);
    watchlist._pushToLocal();
    listItems.forEach(function (el) {
      if (el.dataset.stock == stock) {
        listItems = document.querySelectorAll(`.list-item`);
        targetedDiv = el;
        el.remove();
      }
    });
  }

  _pushToLocal() {
    localStorage.setItem(`watchlistKey`, JSON.stringify(watchlistData));
  }
  _pullFromLocal() {
    listItems = document.querySelectorAll(`.list-item`);
    if (
      JSON.parse(localStorage.getItem(`watchlistKey`)) == undefined ||
      JSON.parse(localStorage.getItem(`watchlistKey`)) == null
    ) {
      return;
    } else {
      watchlistData = JSON.parse(localStorage.getItem(`watchlistKey`));
      this._populateLocalWatch();
    }
  }
  _populateLocalWatch() {
    watchlistData?.forEach(function (data) {
      let stringTemplate = `<div class="list-item" id="list-temp"  data-stock="${
        data[2]
      }" >
      <h1 id="ticker">
      <span class="remove"   data-stock="${data[2]}"  >x</span>
      
      ${data[2]}</h1>
      
      <h1 id="change-item" style="color:${
        data[0] > data[1] ? `green` : `red`
      };">%${Number(
        100 *
          Number(
            Math.abs(Number(data[1]) - Number(data[0])) /
              ((Number(data[1]) + Number(data[0])) / 2)
          )
      ).toFixed(2)}</h1>
      <h1 id="last">${Number(data[0]).toFixed(2)}
      </h1>
    </di>
    </div>`;
      listTemp.insertAdjacentHTML(`afterend`, stringTemplate);
    });
  }
}
// REQUIRED MODULES
const graph = new Graph();
const watchlist = new Watchlist();
// VARIABLES
let currentTicker;
let watchlistArr = [];
let watchlistData = [];

//  DOMElements
const addToWatch = document.querySelector(`#add-to-watch`);
const listTemp = document.querySelector(`#list-temp`);
const loader = document.querySelector(`#loader-temp`);
const errorMessage = document.querySelector(`#error`);
const title = document.querySelector(`#ticker-chart`);
const search = document.querySelector(`#search-inp`);
const btnSearch = document.querySelector(`#search-btn`);
const buttonsTimeframe = document.querySelectorAll(`.btn-time`);
let listItems = document.querySelectorAll(`.list-item`);
let removeBtn;

// IMPLEMENTATION
// ON PAGE LOAD STOCK
watchlist._pullFromLocal();
graph._plotDaily(`spy`);
removeBtn = document.querySelectorAll(`.remove`);
// SEARCHING NEW STOCK
btnSearch.addEventListener(`click`, function (e) {
  e.preventDefault();
  graph._plotDaily(search.value);
});
// CHANGING TIME FRAME
buttonsTimeframe.forEach(function (btn) {
  btn.addEventListener(`click`, function (e) {
    graph._switchTime(currentTicker, e.target.id);
  });
});
// ADDING TO WATCHLIST
addToWatch.addEventListener(`click`, function () {
  watchlist._addToWatchlist(currentTicker);
});

//PULLING & REMOVING
document.body.addEventListener(`click`, function (e) {
  e.stopPropagation();
  // REMOVING ITEMS FROM WATCH
  if (e.target.classList == `remove`) {
    watchlist._removeFromWatchlist(e);
  }
  // PULLING ITEMS FROM WATCHLIST
  let stock = e.target.parentNode.dataset.stock;
  if (stock == undefined || stock == null) {
    return;
  } else {
    graph._plotDaily(stock);
  }
});
