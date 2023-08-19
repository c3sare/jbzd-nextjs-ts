import dynamic from "next/dynamic";
import React from "react";
import { Control, FieldValues, Path } from "react-hook-form";
const ReactQuill = dynamic(() => import("react-quill"), { ssr: false });
import "react-quill/dist/quill.snow.css";

type MemTextProps<T extends FieldValues> = {
  data: string;
  setData: (val: string) => void;
  fieldName: Path<T>;
  control: Control<T>;
};

function MemText<T extends FieldValues>({
  data,
  setData,
  fieldName,
  control,
}: MemTextProps<T>) {
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
