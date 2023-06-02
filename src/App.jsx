import { Navigation } from "./components/Navigation";
import { Landing } from "./pages/Landing";
import { BeamReinforcement } from "./pages/BeamReinforcement";
import { Routes, Route } from "react-router-dom";
import { MathJaxContext } from "better-react-mathjax";

function App() {
  return (
    <>
      <MathJaxContext>
        <Navigation></Navigation>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/balkenBewehrung" element={<BeamReinforcement />} />
        </Routes>
      </MathJaxContext>
    </>
  );
}

export default App;
