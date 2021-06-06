/**
 * Get color code for an aqi value
 * @param {*} aqi
 */
export const getColorCodeBasedOnAqi = (aqi) => {
  const colorRange = colorRanges.find(
    (cr) => aqi > cr.from && aqi <= cr.to
  ) || { color: "#af2d24" }; // If aqi is > 500 return color for Sever
  return colorRange.color;
};
/**
 *
 */
export const colorRanges = [
  {
    color: "#55a84f",
    name: "Good",
    from: 0,
    to: 50,
  },
  {
    name: "Satisfactory",
    color: "#a3c853",
    from: 50,
    to: 100,
  },
  {
    name: "Morderate",
    color: "#eaea0f",
    from: 100,
    to: 200,
  },
  {
    name: "Poor",
    color: "#f29c33",
    from: 200,
    to: 300,
  },
  {
    name: "Very Poor",
    color: "#e93f33",
    from: 300,
    to: 400,
  },
  {
    name: "Sever",
    color: "#af2d24",
    from: 400,
    to: 500,
  },
];
