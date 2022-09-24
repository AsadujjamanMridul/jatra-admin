import React, { useContext, useState } from "react";
import styles from "./Navbar.module.css";
import logo from "../../../assets/logo.png";
import { FaAngleDown } from "react-icons/fa";
import { BiChevronDown } from "react-icons/bi";
import { UserContext } from "../../../App";

const Navbar = () => {
  const [loggedInUser, setLoggedInUser] = useContext(UserContext);

  const [dropDownHidden, setDropDownHidden] = useState(true);

  const handleSignOut = () => {
    setLoggedInUser({});
    localStorage.setItem("loggedInUser", JSON.stringify({}));
  };

  return (
    <div
      className={`bg-white flex justify-between shadow-md px-6 py-4 ${styles.nav}`}
    >
      <img src={logo} alt="" className="w-28 h-full" />
      <button
        className={`flex justify-center items-center font_inter text-xs sm:text-sm font-medium px-3 rounded-md shadow-md bg-blue-50 hover:bg-blue-100 cursor-pointer ${styles.profileButton}`}
        onClick={handleSignOut}
      >
        <span id="user_name" className="font_inter text-xs sm:text-sm font-medium">
          {loggedInUser?.name}
        </span>
      </button>
    </div>
  );
};

export default Navbar;
