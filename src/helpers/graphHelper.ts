const createGradient = (canvas: any) => {
  const ctx = canvas.getContext("2d");
  const gradient = ctx.createLinearGradient(0, 0, 100, 100);

  return { ctx, gradient };
};

export const configureGraph = (
  canvas: any,
  formatData: any,
  stock: any,
  range: string,
	net: string
) => {
  const { open, time } = formatData(stock, range);
  const { ctx, gradient } = createGradient(canvas);

  parseFloat(net) < 0 ?  gradient.addColorStop(1, "rgb(255,80,0, .1") : gradient.addColorStop(1, " rgb(0,250,154, 0.3)");
  ctx.fillStyle = gradient;

  const data = {
    labels: time,
    datasets: [
      {
        label: stock.ticker,
        backgroundColor: gradient,
        borderColor: (parseFloat(net)  < 0 ? "rgb(255,80,0)" : "rgb(0,250,154)"),
				tension: 0,
				spanGaps: true,
        data: open,
      },
    ],
  };
  const options = {
    tooltips: {
      mode: "x-axis",
    },
    scales: {
      xAxes: [
        {
          ticks: {
            display: false,
          },
          type: "time",
          // time: {
          // 	unit: 'minute',
          // 	round: 'minute'
          // },
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
