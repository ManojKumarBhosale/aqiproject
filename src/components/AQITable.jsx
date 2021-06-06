import { Table } from "antd";
import styled from "styled-components";
import { getColorCodeBasedOnAqi } from "./../util/AQIHelper";
import moment from "moment";

const AQISpan = styled.span`
  font-weight: bold;
  color: ${(props) => props.color || "#000000"};
`;

const ClickableTable = styled(Table)`
  & tr {
    cursor: pointer;
  }
`;

const columns = [
  {
    title: "City",
    dataIndex: "city",
    key: "city",
  },
  {
    title: "Air Quality Index",
    dataIndex: "aqi",
    key: "aqi",
    render: (text, { aqi }) => (
      <AQISpan color={getColorCodeBasedOnAqi(aqi)}>{text}</AQISpan>
    ),
  },
  {
    title: "Last Updated",
    dataIndex: "lastUpdatedDate",
    key: "lastUpdatedDate",
    render: (text, { lastUpdatedDate }) => {
      const now = Date.now();
      if (now - lastUpdatedDate <= 60000) return "Few seconds ago";
      else if (now - lastUpdatedDate > 60000 && now - lastUpdatedDate < 120000)
        return "A minute ago";
      return moment(lastUpdatedDate).format("hh:mm a");
    },
  },
];

const AQITable = ({ dataSource, selectCity }) => {
  return (
    <ClickableTable
      columns={columns}
      dataSource={dataSource}
      bordered={true}
      onRow={(record) => ({
        onClick: () => {
          selectCity(record.city);
        },
      })}
    />
  );
};

export default AQITable;
