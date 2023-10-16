"use client";

import { Toaster } from "react-hot-toast";

const ToasterContext = () => {
  return (
    <Toaster
      toastOptions={{
        position: "top-right",
        style: {
          width: "300px",
          borderRadius: "0",
          margin: "0 5px 5px",
          padding: "10px",
          fontSize: "12px",
          color: "white",
          backgroundColor: "#44a4fc",
          borderLeft: "5px solid #187fe7",
          textAlign: "left",
        },
        error: {
          style: {
            backgroundColor: "#e54d42",
            borderColor: "#b82e24",
          },
          icon: <></>,
        },
        success: {
          style: {
            backgroundColor: "#68cd86",
            borderColor: "#42a85f",
          },
          icon: <></>,
        },
        icon: <></>,
      }}
    />
  );
};

export default ToasterContext;
