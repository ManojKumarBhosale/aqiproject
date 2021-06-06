import Container from "./Container";
import Chart from "react-apexcharts";

const AQICitySeriesChart = ({ city = "", data = [] }) => {
  let min = 0,
    max = 0;
  data.forEach((d) => {
    if (d[1] > max) max = d[1];
    if (min < d[1]) min = d[1];
  });
  const series = [{ name: "AQI", data }];
  const options = {
    chart: {
      id: "realtime",
      type: "line",
      animations: {
        enabled: true,
        easing: "linear",
        dynamicAnimation: {
          speed: 1000,
        },
      },
      toolbar: {
        show: false,
      },
      zoom: {
        enabled: false,
      },
    },
    title: {
      text: `${city} Aqi data`,
      align: "center",
    },
    tooltip: {
      x: {
        format: "hh:mm:ss tt",
      },
    },
    markers: {
      size: 3,
    },
    xaxis: {
      type: "datetime",
	  title: {
        text: "Time",
        style: { fontSize: "12px" },
      },
      labels: {
        format: "hh:mm:ss tt",
        datetimeUTC: false,
      },
    },
    yaxis: {
	  title: {
        text: "Air Quality Index",
        style: { fontSize: "12px" },
      },
      max: max + 30,
      min: min - 30,
      tickAmount: 5,
    },
    legend: {
      show: false,
    },
  };

  return (
    city && (
      <Container>
        <Chart options={options} series={series} type="line" height={250} />
      </Container>
    )
  );
};

export default AQICitySeriesChart;
