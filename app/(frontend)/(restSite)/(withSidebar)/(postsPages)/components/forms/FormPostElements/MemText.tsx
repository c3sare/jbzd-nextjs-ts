import React from "react";
import Editor from "@/components/editor/Editor";

type MemTextProps = {
  data: string;
  setData: (val: string) => void;
};

function MemText({ data, setData }: MemTextProps) {
  return <Editor setData={setData} />;
}

export default MemText;
