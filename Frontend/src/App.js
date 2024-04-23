import {BrowserRouter,Routes, Route,} from "react-router-dom";
import { Snippet } from "./Pages/Snippet";
import { Home } from "./Pages/Home";

function App() {
  return (
    <>
        <BrowserRouter>
      <Routes> {/* Use Routes component */}
        <Route
          exact
          path="/"
          element={<Home/>}
        /> 
        <Route
          exact
          path="/:UniqueId"
          element={<Snippet />}
        />
        {/* <Route
          exact
          path="*"
          element={<NotFound/>}
        /> */}
      </Routes>
    </BrowserRouter>
    </>
  );
}

export default App;





