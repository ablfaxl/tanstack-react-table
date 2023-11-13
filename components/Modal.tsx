import React, { useState, useCallback } from "react";

interface ModalProps {
  data: any;
}

const Modal: React.FC<ModalProps> = ({ data }) => {
  const [modal, setModal] = useState(false);

  const toggleModal = useCallback(() => {
    setModal((prevModal) => !prevModal);
  }, []);

  return (
    <>
      {modal && (
        <div className="fixed inset-0 flex items-center justify-center">
          <div className="w-72 h-40 duration-300 z-10 bg-slate-400 rounded shadow-lg text-black p-2">
            <h1 className="text-center w-full mt-px text-xl">Hello {data}</h1>
            <p className="text-base text-white">
              Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore,
              quam.
            </p>
            <button
              onClick={toggleModal}
              className="bg-red-500 hover:bg-red-600 text-white duration-200 rounded w-full mt-4"
            >
              Close
            </button>
          </div>
          <button
            onClick={toggleModal}
            className="inset-0 fixed bg-gray-200 opacity-70"
          ></button>
        </div>
      )}
      <button onClick={toggleModal} className="ml-4 text-xl">
        . . .
      </button>
    </>
  );
};

export default Modal;
