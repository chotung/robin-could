const createGradient = (canvas: HTMLCanvasElement) => {
  const ctx = canvas.getContext("2d");
  const gradient = ctx?.createLinearGradient(0, 0, 100, 100);
  return { ctx, gradient };
};

// should separate logic for api and websocket

// type FormatData = { }

export const configureGraph = (
  canvas: HTMLCanvasElement,
  formatData: any,
  stock: any,
  live: boolean,
  range?: string,
  net?: any
): any => {
  const { open, time } = formatData(stock, "twelveData", range, live);
  const { gradient } = createGradient(canvas);
  const data = {
    labels: time,
    datasets: [
      {
        label: stock.ticker,
        backgroundColor: gradient,
        borderColor: parseFloat(net) < 0 ? "rgb(255,80,0)" : "rgb(0,250,154)",
        tension: 0.1,
        data: open,
      },
    ],
  };
  const options = {
    elements: {
      point: {
        radius: 0,
      },
    },
    tooltips: {
      mode: "x-axis",
    },
    scales: {
      xAxes: [
        {
          type: "time",
          distribution: "data",
          source: "data",
          gridLines: { color: "#fff" },
          display: false,
          ticks: {
            display: false,
          },
        },
      ],
      yAxes: [
        {
          display: false,
          gridLines: {
            color: "#fff",
            drawBorder: false,
          },
        },
      ],
    },
    maintainAspectRatio: false,
    responsive: true,
    title: {
      display: true,
    },
    legend: {
      display: false,
    },
  };
  return { data, options };
};
