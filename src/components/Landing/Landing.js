import React, { useState } from "react";
import AddRoute from "../AddRoute/AddRoute";
import EditRoute from "../EditRoute/EditRoute";
import Message from "../Message/Message";
import Navbar from "../Shared/Navbar/Navbar";

const Landing = () => {
  const [selectedTab, setSelectedTab] = useState("Add Route");

  const tabs = ["Add Route", "Update Route", "Messages"];
  return (
    <div>
      <Navbar />
      <div className="flex justify-center my-5 font_inter">
        {tabs.map((item, index) => {
          return (
            <span
            key={index}
              className={`px-4 py-3 cursor-pointer text-sm shadow-md ${
                selectedTab === item ? `bg-slate-300` : `bg-slate-200`
              } ${index === tabs.length -1 ? `rounded-r-md` : index === 0 ? `rounded-l-md` : ``}`}
              onClick={() => setSelectedTab(item)}
            >
              {" "}
              {item}
            </span>
          );
        })}
      </div>

      <div className="grid place=items-center">
        {
          selectedTab === "Add Route" ? <AddRoute/> : selectedTab === "Messages" ? <Message/> : 
          selectedTab === "Update Route" ? <EditRoute/> : <></>
        }
      </div>
    </div>
  );
};

export default Landing;
