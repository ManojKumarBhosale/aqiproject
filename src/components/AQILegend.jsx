import { colorRanges } from "../util/AQIHelper";
import styled from "styled-components";

const LegendContainer = styled.div`
  text-align: center;
`;

const LegendItem = styled.span`
  margin-right: 15px;
`;

const LegendColor = styled.div`
  width: 10px;
  height: 10px;
  background-color: ${({ color }) => color};
  display: inline-block;
  margin-right: 5px;
`;

const AQILegend = () => {
  return (
    <LegendContainer>
      {colorRanges.map(({ color, name }) => (
        <LegendItem key={name}>
          <LegendColor color={color} />
          <span>{name}</span>
        </LegendItem>
      ))}
    </LegendContainer>
  );
};

export default AQILegend;
