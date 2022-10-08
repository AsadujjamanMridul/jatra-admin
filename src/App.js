import { createContext, useState } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Landing from "./components/Landing/Landing";
import Login from "./components/Login/Login";
import { ChakraProvider } from "@chakra-ui/react";

export const UserContext = createContext();

function App() {
  const [loggedInUser, setLoggedInUser] = useState(
    localStorage.getItem("loggedInUser")
      ? JSON.parse(localStorage.getItem("loggedInUser"))
      : {}
  );
  return (
    <ChakraProvider>
      <UserContext.Provider value={[loggedInUser, setLoggedInUser]}>
        <Router>
          <Routes>
            <Route path="/login" element={<Login />} />

            {/* <PrivateRoute path='/home'>
            <Landing/>
          </PrivateRoute> */}

            {loggedInUser.name ? (
              <Route path="/" element={<Landing />} />
            ) : (
              <Route exact path="/*" element={<Login />} />
            )}
            {/* <Route path="/*" element={<PrivateRoute />}>
            <Route path="/home" element={<Landing/>}/>
          </Route> */}
          </Routes>
        </Router>
      </UserContext.Provider>
    </ChakraProvider>
  );
}

export default App;
