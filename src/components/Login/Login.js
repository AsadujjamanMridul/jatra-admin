import React, { useContext, useState } from "react";
import styles from "./Login.module.css";
import Navbar from "../Shared/Navbar/Navbar";
import { UserContext } from "../../App";
import { query, collection, where, onSnapshot } from "firebase/firestore";
import { db } from "../../firebase.config";

const Login = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);
  const [email, setEmail] = useState();
  const [password, setPassword] = useState();
  const [res, setRes] = useState([]);
  const [loading, setLoading] = useState(false);

  const handleLogIn = async () => {
    setLoading(true);
    // console.log(email, password)
    const q = query(
      collection(db, "admins"),
      where("email", "==", email),
      where("password", "==", password)
    );

    const searchListener = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push(doc.data());
      });
      setRes(list);
      setLoading(false);
     
      if (list.length > 0) {
        setLoggedInUser(list[0]);
        localStorage.setItem("loggedInUser", JSON.stringify(list[0]));
      }
      // if (!loading && res.length === 0) {
      //   alert("You are not authorized");
      // }
    });
  };

  return (
    <div className={`${styles.container}`}>
      <Navbar />
      <div className="grid place-items-center min-h-full font_inter">
        <div className="bg-white p-12 flex flex-col rounded-lg shadow-md">
          <input
            className="bg-slate-100 my-3 h-10 p-3 rounded-sm w-80"
            type="email"
            placeholder="Enter email"
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            className="bg-slate-100 my-3 h-10 p-3 rounded-sm w-80"
            type="password"
            placeholder="Enter password"
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            className="bg-slate-800 my-5 p-3 rounded-md w-80 text-white grid place-items-center hover:bg-slate-900"
            onClick={handleLogIn}
          >
            <span>{loading ? "Loading..." : "Log in"}</span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default Login;
