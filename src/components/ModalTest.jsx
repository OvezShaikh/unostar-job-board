import React, { useState } from "react";
import Modal from "react-modal";

Modal.setAppElement("#root");

export default function ModalTest() {
  const [open, setOpen] = useState(false);

  return (
    <div className="p-10">
      <button onClick={() => setOpen(true)} className="bg-blue-500 text-white p-2 rounded">
        Open Modal
      </button>

      <Modal
        isOpen={open}
        onRequestClose={() => setOpen(false)}
        contentLabel="Test Modal"
        style={{
          content: {
            padding: "2rem",
            borderRadius: "1rem",
            maxWidth: "400px",
            margin: "auto",
          },
          overlay: {
            backgroundColor: "rgba(0, 0, 0, 0.5)",
          },
        }}
      >
        <h2>Modal is working!</h2>
        <button onClick={() => setOpen(false)}>Close</button>
      </Modal>
    </div>
  );
}
