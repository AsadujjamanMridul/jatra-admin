import React, { useEffect, useState } from "react";
import styles from "./Message.module.css";
import { BiMessageSquareDetail } from "react-icons/bi";
import { FiTrash } from "react-icons/fi";
import {
  query,
  collection,
  onSnapshot,
  deleteDoc,
  doc,
} from "firebase/firestore";
import { db } from "../../firebase.config";

const Message = () => {
  const [modalVisibility, setModalVisibility] = useState(true);
  const [messages, setMessages] = useState(null);
  const [loadingMsg, setLoadingMsg] = useState(true);
  const [modalMessage, setModalMessage] = useState("");

  useEffect(() => {
    const q = query(collection(db, "messages"));

    const searchListener = onSnapshot(q, (querySnapshot) => {
      const list = [];
      querySnapshot.forEach((doc) => {
        list.push({ ...doc.data(), id: doc.id });
      });
      setMessages(list);
      setLoadingMsg(false);
    });

    return searchListener;
  }, []);

  if (loadingMsg) {
    return (
      <div className="w-[100vw] h-[70vh] flex justify-center items-center">
        <div role="status">
          <svg
            aria-hidden="true"
            className="mr-2 w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-slate-700"
            viewBox="0 0 100 101"
            fill="none"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
              fill="currentColor"
            />
            <path
              d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
              fill="currentFill"
            />
          </svg>
          <span className="sr-only">Loading...</span>
        </div>
      </div>
    );
  }

  return (
    <div className="grid place-items-center">
      <div
        className={`my-5 w-full md:w-[60vw] ${styles.container} p-5 bg-slate-50 rounded-lg shadow-sm`}
      >
        <table className="w-full text-xs sm:text-sm text-left text-gray-500 dark:text-gray-400 table-fixed font_inter rounded-lg">
          <thead className="text-slate-800 bg-slate-200">
            <tr>
              <th className="py-3 px-4 break-normal">User Email</th>
              <th className="py-3 px-4 break-normal">Title</th>
              <th className="py-3 px-4 break-normal">Message</th>
              <th className="py-3 px-4  break-normal w-[20px]"></th>
            </tr>
          </thead>
          <tbody>
            {messages.map((item, index) => {
              const { email, message, title, id, uid } = item;
              return (
                <tr key={index}>
                  <td className="py-3 px-4 break-normal">{email}</td>
                  <td className="py-3 px-4 break-normal">{title}</td>
                  <td
                    className="py-3 px-4 break-normal cursor-pointer"
                    onClick={() => {
                      setModalMessage(message);
                      setModalVisibility(false);
                    }}
                  >
                    <button className="px-5 flex py-2 rounded-md bg-slate-200 hover:bg-slate-300 text-slate-600 font_inter font-medium items-center justify-center">
                      <BiMessageSquareDetail
                        className="text-slate-500 mr-0 md:mr-3 "
                        size={18}
                      />
                      <p className="hidden md:block">See Message</p>
                    </button>
                  </td>
                  <td
                    className="text-center cursor-pointer hover:text-red-500"
                    onClick={() => {
                      deleteDoc(doc(db, "messages", id));
                    }}
                  >
                    <FiTrash size={16} />
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>

        <div
          className="relative z-10"
          aria-labelledby="modal-title"
          role="dialog"
          aria-modal="true"
          hidden={modalVisibility}
        >
          <div className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity"></div>

          <div className="fixed inset-0 z-10 overflow-y-auto">
            <div className="flex min-h-full items-end justify-center p-4 text-center sm:items-center sm:p-0">
              <div className="relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all sm:my-8 sm:w-full sm:max-w-lg">
                <div className="bg-white px-4 pt-5 pb-4 sm:p-6 sm:pb-4">
                  <div className="sm:flex sm:items-start">
                    <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-slate-100 sm:mx-0 sm:h-10 sm:w-10">
                      <BiMessageSquareDetail
                        className="text-slate-600"
                        size={20}
                      />
                    </div>
                    <div className="mt-3 text-center sm:mt-0 sm:ml-4 sm:text-left">
                      <h3
                        className="text-lg font-medium leading-6 text-gray-900 font-medium"
                        id="modal-title"
                      >
                        Message
                      </h3>
                      <div className="mt-2">
                        <p className="text-sm text-gray-500">{modalMessage}</p>
                      </div>
                    </div>
                  </div>
                </div>
                <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                  <button
                    type="button"
                    className="mt-3 inline-flex w-full justify-center rounded-md border border-gray-300 bg-white px-4 py-2 text-base font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 sm:mt-0 sm:ml-3 sm:w-auto sm:text-sm"
                    onClick={() => setModalVisibility(true)}
                  >
                    Cancel
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Message;
