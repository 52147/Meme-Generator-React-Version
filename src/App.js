import logo from "./logo.svg";
import "./App.css";
import { HomePage } from "./components/pages/HomePage";
import {BrowserRouter as Router, Route, Routes} from "react-router-dom";
function App() {
  return (
    <>
      <Router>
        <Routes>
          <Route path ="/" exact element={<HomePage />}/>
        </Routes>
      </Router>
    </>
  );
}

export default App;
