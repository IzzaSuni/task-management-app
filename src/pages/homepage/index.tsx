import MDEditor from "@/components/MDEditor";
import { FlexBox } from "@/components/core";

export default function Homepage() {
  return (
    <FlexBox>
      <MDEditor
        markdown={`# Welcome to V-Task Manager 

     A simple app to manage your task and you can write something in it, You can start using this app to manage your task by making project in sidebar`}
        readOnly
      />
    </FlexBox>
  );
}
