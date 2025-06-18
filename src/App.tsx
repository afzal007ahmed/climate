import { BrowserRouter } from "react-router";
import "./App.css";
import NavBar from "./NavBar/NavBar";
import RouteManager from "./Routes/RouteManager";

function App() {
  return (
    <BrowserRouter>
      <div className="max-w-[1200px] mx-auto">
        <NavBar />
        <div className="p-4 mt-2">
          <div>
            <RouteManager />
          </div>
        </div>
      </div>
    </BrowserRouter>
  );
}

export default App;
