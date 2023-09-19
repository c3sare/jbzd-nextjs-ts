import "react-quill/dist/quill.snow.css";

import React from "react";
import dynamic from "next/dynamic";

const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });

type MemTextProps = {
  data: string;
  setData: (val: string) => void;
};

function MemText({ data, setData }: MemTextProps) {
  const modules = {
    toolbar: [
      [
        {
          color: [
            "rgb(222, 33, 39)",
            "rgb(143, 143, 143)",
            "rgb(148, 180, 37)",
            "rgb(240, 204, 0)",
            "rgb(24, 119, 242)",
            "rgb(255, 255, 255)",
            "rgb(119, 119, 119)",
            "rgb(0, 0, 0)",
          ],
        },
      ],
      [{ header: [1, 2, 3] }],
      ["bold", "italic", "underline"],
      [{ align: "justify" }],
      [{ align: "center" }],
      [{ align: "right" }],
    ],
  };

  return (
    <ReactQuill
      modules={modules}
      theme="snow"
      defaultValue={data}
      onChange={(e) => setData(e)}
    />
  );
}

export default MemText;
