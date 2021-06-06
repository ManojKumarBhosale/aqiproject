import AQIDashBoard from "./components/AQIDashboard";
import styled from "styled-components";

const MainHeading = styled.h1`
  text-align: center;
`;
function App() {
  return (
    <div>
      <header>
        <MainHeading>Air Quality Index Live Dashboard</MainHeading>
      </header>
      <main>
        <AQIDashBoard />
      </main>
    </div>
  );
}

export default App;
