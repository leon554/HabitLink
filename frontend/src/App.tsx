import { HashRouter as Router, Route, Routes } from "react-router-dom";
import Landing from "./pages/Landing";
import { Layout } from "./pages/Layout";
import Signin from "./pages/Signin";
import UserProvider from "./components/UserProvider";
import Home from "./pages/Home";
import Login from "./pages/Login";
import NewHabit from "./pages/NewHabit";
import Log from "./pages/Log";

function App() {
  return (
    <>
      <UserProvider>
        <Router>
          <Routes>
            <Route element={<Layout />}>
              <Route path="/" element={<Landing />} />
              <Route path="/signin" element={<Signin />} />
              <Route path="/home" element={<Home />} />
              <Route path="/login" element={<Login/>}/>
              <Route path="/newhabit" element={<NewHabit/>}/>
              <Route path="/log" element={<Log/>}/>
            </Route>
          </Routes>
        </Router>
      </UserProvider>
    </>
  ); 
}

export default App;
