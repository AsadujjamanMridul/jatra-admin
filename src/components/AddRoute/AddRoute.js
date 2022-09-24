import React, { useState } from "react";
import { addDoc, collection } from "firebase/firestore";
import { db } from "../../firebase.config";

const AddRoute = () => {
  const [source, setSource] = useState(null);
  const [destination, setDestination] = useState(null);
  const [distance, setDistance] = useState(null);
  const [studentFare, setStudentFare] = useState(false);
  const [fare, setFare] = useState(null);
  const [routeName, setRouteName] = useState(null);
  const [routeNumber, setRouteNumber] = useState(null);

  const [loading, setLoading] = useState(false);

  const handleAddBus = async () => {
    setLoading(true);
    try {
      await addDoc(collection(db, "allRoutes"), {
        source: source,
        destination: destination,
        distance: distance,
        studentFare: studentFare,
        fare: fare,
        routeName: routeName,
        routeNumber: routeNumber,
        date: new Date(),
      });
      setLoading(false);
      alert("Route added successfully!")
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  return (
    <div className="grid place-items-center min-h-full font_inter text-sm">
      <div className="bg-slate-200 p-12 flex flex-col justify-center items-center rounded-lg my-5">
        <div className="grid cols md:grid-cols-2 lg:grid-cols-3 gap-6">
          <input
            className="bg-gray-50 h-10 p-3 rounded-md w-80"
            type="text"
            placeholder="Source"
            onChange={(e) => setSource(e.target.value.toLowerCase())}
            required
          />
          <input
            className="bg-gray-50 h-10 p-3 rounded-md w-80"
            type="text"
            placeholder="Destination"
            onChange={(e) => setDestination(e.target.value.toLowerCase())}
            required
          />
          <input
            className="bg-gray-50  h-10 p-3 rounded-md w-80"
            type="number"
            placeholder="Distance"
            onChange={(e) => setDistance(e.target.value)}
            required
          />
          <input
            className="bg-gray-50 h-10 p-3 rounded-md w-80"
            type="number"
            placeholder="Fare"
            onChange={(e) => setFare(e.target.value)}
            required
          />
          <input
            className="bg-gray-50  h-10 p-3 rounded-md w-80"
            type="text"
            placeholder="Route Name"
            onChange={(e) => setRouteName(e.target.value.toLowerCase())}
            required
          />
          <input
            className="bg-gray-50  h-10 p-3 rounded-md w-80"
            type="text"
            placeholder="Route Number"
            onChange={(e) => setRouteNumber(e.target.value.toLowerCase())}
            required
          />
          <input
            className="bg-gray-50  h-10 p-3 rounded-md w-80"
            type="text"
            placeholder="Student fare avaibility"
            onChange={(e) => setStudentFare(e.target.value)}
            required
          />
        </div>
        <button
          className="bg-slate-800 mt-12 p-3 rounded-md w-80 text-white grid place-items-center hover:bg-slate-900"
          onClick={handleAddBus}
          disabled={loading}
        >
          {loading ? "Adding..." : "Add Bus"}
        </button>
      </div>
    </div>
  );
};

export default AddRoute;
