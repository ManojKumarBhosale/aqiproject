import Chart from "react-apexcharts";
import { colorRanges } from "../util/AQIHelper";
import AQILegend from "./AQILegend";
import Container from "./Container";

const AQICitiesBarChart = ({ cities = [], data = [], selectCity }) => {
  const series = [{ name: "AQI", data }],
    options = {
      chart: {
        type: "bar",
        events: {
          click: function (chart, w, e) {
            selectCity(cities[e.dataPointIndex]);
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
        text: "All cities data",
        align: "center",
      },
      plotOptions: {
        bar: {
          columnWidth: "40%",
          distributed: true,
          colors: {
            ranges: [...colorRanges],
          },
        },
      },
      legend: {
        show: false,
      },
      dataLabels: {
        enabled: false,
      },
      yaxis: {
        title: {
          text: "Air Quality Index",
          style: { fontSize: "12px" },
        },
      },
      xaxis: {
        categories: cities,
        title: {
          text: "Cities",
          style: { fontSize: "12px" },
        },
      },
    };
  return (
    <Container>
      <Chart options={options} series={series} type="bar" height={250} />
      <AQILegend />
    </Container>
  );
};

export default AQICitiesBarChart;
