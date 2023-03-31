import { InputPage } from "./pages/inputPage";
import { UserProfile } from "./pages/userProfile";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";


function App() {

  return (
    <div className="App">
      <Router>
        <Routes>
          <Route path="/" element={<InputPage/>}></Route>
          <Route path="/:username" element={<UserProfile/>}></Route>
        </Routes>
      </Router>
    </div>
  );
}

export default App;
