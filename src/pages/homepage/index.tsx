import MDEditor from "@/components/MDEditor";
import { FlexBox } from "@/components/core";

export default function Homepage() {
  return (
    <FlexBox>
      <MDEditor
        markdown={`# Welcome to V-Task Manager 

     A simple app to manage your task with with text editor so you can write something in it relate to your task management, You can start using this app to manage your task by making project in sidebar. V-Task using localstorage you can using this app in offline mode simply by install this app.`}
        readOnly
      />
    </FlexBox>
  );
}
