import { useState, useEffect } from "react";
import AQITable from "./AQITable";
import AQICitiesBarChart from "./AQICitiesBarChart";
import { Row, Col } from "antd";
import AQICitySeriesChart from "./AQICitySeriesChart";

const AQIDashBoard = () => {
  const [cityWiseAqiDataMap, setCityWiseAqiDataMap] = useState({});
  const [selectedCityData, setSelectedCityData] = useState({});

  const selectCity = (city) => {
    setCityWiseAqiDataMap((cityWiseAqiDataMap) => {
      setSelectedCityData({
        city,
        data: cityWiseAqiDataMap[city]
          ? cityWiseAqiDataMap[city].map((d) => [d.lastUpdatedDate, d.aqi])
          : [],
      });
      return cityWiseAqiDataMap;
    });
  };

  const updateAqiData = (aqiData) => {
    setCityWiseAqiDataMap((cityWiseAqiDataMap) => {
      const aqiDataMap = {};
      aqiData.forEach(({ city, ...aqiInfo }) => {
        aqiDataMap[city] = cityWiseAqiDataMap[city]
          ? [...cityWiseAqiDataMap[city], aqiInfo]
          : [aqiInfo];
      });
      return {
        ...cityWiseAqiDataMap,
        ...aqiDataMap,
      };
    });
  };

  useEffect(() => {
    if (!selectedCityData.city) {
      setSelectedCityData((selectedCityData) => {
        const cities = Object.keys(cityWiseAqiDataMap);
        // Set first recieved city as selected city by default
        if (cities.length > 0) selectCity(cities[0]);
        return selectedCityData;
      });
    } else {
      setSelectedCityData(({ city }) => {
        return {
          city,
          data: cityWiseAqiDataMap[city].map((d) => [d.lastUpdatedDate, d.aqi]),
        };
      });
    }
  }, [cityWiseAqiDataMap]);
  /**
   * This method handles all lifecycle of callbacks socket
   *  from connection establishment to closure and updates data whenever message is received
   * @param {*} socket
   */
  const handleSocketConnectionLifeCycle = (socket) => {
    socket.onopen = (e) => {
      console.log("[open] Connection established");
    };
    socket.onmessage = (event) => {
      const aqiData = JSON.parse(event.data).map((r) => ({
        ...r,
        aqi: Math.round(r.aqi * 100) / 100,
        lastUpdatedDate: Date.now(),
      }));
      updateAqiData(aqiData);
    };
    socket.onclose = () => {
      console.log("[close] Connection died");
    };
    socket.onerror = function (error) {
      console.log(`[error] ${error.message}`);
    };
  };

  useEffect(() => {
    const socket = new WebSocket("ws://city-ws.herokuapp.com/");
    handleSocketConnectionLifeCycle(socket);
    return () => {
      console.log("websocket closing!!!!!");
      socket.close();
    };
  }, []);

  const cities = Object.keys(cityWiseAqiDataMap);
  const data = [];

  const tableDataSource = cities.map((city) => {
    const aqiData = cityWiseAqiDataMap[city],
      lastAqiData = aqiData[aqiData.length - 1];
    data.push(lastAqiData.aqi);
    return {
      city,
      aqi: lastAqiData.aqi,
      lastUpdatedDate: lastAqiData.lastUpdatedDate,
      key: city,
    };
  });
  const { city: selectedCity, data: selectedCitydata } = selectedCityData;

  return (
    <Row>
      <Col lg={8} md={24} xs={24} sm={24}>
        <AQITable dataSource={tableDataSource} selectCity={selectCity} />
      </Col>
      <Col lg={16} md={24} xs={24} sm={24}>
        <AQICitiesBarChart
          cities={cities}
          data={data}
          selectCity={selectCity}
        />
        <AQICitySeriesChart city={selectedCity} data={selectedCitydata} />
      </Col>
    </Row>
  );
};

export default AQIDashBoard;
