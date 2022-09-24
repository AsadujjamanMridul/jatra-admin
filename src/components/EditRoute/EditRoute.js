import React, { useState } from "react";
import {
  addDoc,
  collection,
  query,
  where,
  onSnapshot,
  deleteDoc,
  updateDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase.config";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiSearch } from "react-icons/fi";

const EditRoute = () => {
  const [modalHidden, setModalHidden] = useState(false);

  const [searchSource, setSearchSource] = useState(null);
  const [searchDestination, setSearchDestination] = useState(null);
  const [searchRouteNumber, setSearchRouteNumber] = useState(null);

  const [loading, setLoading] = useState(false);
  const [searching, setSearching] = useState(false);
  const [searchResult, setSearchResult] = useState(null);

  const [source, setSource] = useState(searchResult?.source || null);
  const [destination, setDestination] = useState(
    searchResult?.destination || null
  );
  const [distance, setDistance] = useState(searchResult?.distance || null);
  const [studentFare, setStudentFare] = useState(
    searchResult?.studentFare || false
  );
  const [fare, setFare] = useState(searchResult?.fare || null);
  const [routeName, setRouteName] = useState(searchResult?.routeName || null);
  const [routeNumber, setRouteNumber] = useState(
    searchResult?.routeNumber || null
  );

  const [id, setId] = useState(null);

  const handleUpdateRoute = async () => {
    setLoading(true);
    try {
      await updateDoc(doc(db, "allRoutes", id), {
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
      alert("Route updated successfully!");
    } catch (err) {
      console.log(err);
      setLoading(false);
    }
  };

  const handleSearch = () => {
    setSearching(true);

    const q = query(
      collection(db, "allRoutes"),
      where("source", "==", searchSource.toLowerCase()),
      where("destination", "==", searchDestination.toLowerCase()),
      where("routeNumber", "==", searchRouteNumber.toLowerCase())
    );

    const searchListener = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setSearchResult(list[0]);
      setSearching(false);
      console.log(list);

      // Updating all values
      setSource(list[0].source);
      setDestination(list[0].destination);
      setDistance(list[0].distance);
      setStudentFare(list[0].studentFare);
      setFare(list[0].fare);
      setRouteName(list[0].routeName);
      setRouteNumber(list[0].routeNumber);
      setId(list[0].id);

      //CLosing the modal
      setModalHidden(true);
    });
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
            defaultValue={source}
          />
          <input
            className="bg-gray-50 h-10 p-3 rounded-md w-80"
            type="text"
            placeholder="Destination"
            onChange={(e) => setDestination(e.target.value.toLowerCase())}
            required
            defaultValue={destination}
          />
          <input
            className="bg-gray-50  h-10 p-3 rounded-md w-80"
            type="number"
            placeholder="Distance"
            onChange={(e) => setDistance(e.target.value)}
            required
            defaultValue={distance}
          />
          <input
            className="bg-gray-50 h-10 p-3 rounded-md w-80"
            type="number"
            placeholder="Fare"
            onChange={(e) => setFare(e.target.value)}
            required
            defaultValue={fare}
          />
          <input
            className="bg-gray-50  h-10 p-3 rounded-md w-80"
            type="text"
            placeholder="Route Name"
            onChange={(e) => setRouteName(e.target.value.toLowerCase())}
            required
            defaultValue={routeName}
          />
          <input
            className="bg-gray-50  h-10 p-3 rounded-md w-80"
            type="text"
            placeholder="Route Number"
            onChange={(e) => setRouteNumber(e.target.value.toLowerCase())}
            required
            defaultValue={routeNumber}
          />
          <input
            className="bg-gray-50  h-10 p-3 rounded-md w-80"
            type="text"
            placeholder="Student fare avaibility"
            onChange={(e) => setStudentFare(e.target.value)}
            required
            defaultValue={studentFare}
          />
        </div>
        <button
          className="bg-slate-800 mt-12 p-3 rounded-md w-80 text-white grid place-items-center hover:bg-slate-900"
          onClick={handleUpdateRoute}
          disabled={loading}
        >
          {loading ? "Updating..." : "Update Route"}
        </button>
      </div>

      <div
        className="relative z-10"
        aria-labelledby="modal-title"
        role="dialog"
        aria-modal="true"
        hidden={modalHidden}
      >
        <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

        <div className="fixed inset-0 z-10 overflow-y-auto">
          <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
            <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
              <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                <div className="sm:flex sm:items-start">
                  <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                    <FiSearch className="text-slate-600" size={20} />
                  </div>
                  <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                    <h3
                      className="text-lg font-medium leading-6 text-gray-900 font-medium"
                      id="modal-title"
                    >
                      Serach Route
                    </h3>
                    <div className="mt-4 grid gap-3">
                      <input
                        className="bg-slate-200 h-10 p-3 rounded-md w-80 shadow-sm"
                        type="text"
                        placeholder="Source"
                        onChange={(e) =>
                          setSearchSource(e.target.value.toLowerCase())
                        }
                        required
                      />
                      <input
                        className="bg-slate-200 h-10 p-3 rounded-md w-80 shadow-sm"
                        type="text"
                        placeholder="Destination"
                        onChange={(e) =>
                          setSearchDestination(e.target.value.toLowerCase())
                        }
                        required
                      />
                      <input
                        className="bg-slate-200 h-10 p-3 rounded-md w-80 shadow-sm"
                        type="text"
                        placeholder="Route Number"
                        onChange={(e) =>
                          setSearchRouteNumber(e.target.value.toLowerCase())
                        }
                        required
                      />
                      <button
                        className="bg-slate-800 mt-2 p-3 rounded-md w-80 text-white grid place-items-center hover:bg-slate-900"
                        onClick={handleSearch}
                        disabled={searching}
                      >
                        {searching ? "Searching..." : "Search Route"}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
              <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                <button
                  type="button"
                  className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                  onClick={() => setModalHidden(true)}
                >
                  Cancel
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default EditRoute;
