import MDEditor from "@/components/MDEditor";
import { useState } from "react";

export default function TaskManagement() {
  const [text, setText] = useState("");

  return (
    <MDEditor
      placeholder={"start writing here"}
      markdown={text}
      onChange={(value) => setText(value)}
    />
  );
}
