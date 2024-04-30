import type { ForwardedRef } from "react";
import {
  headingsPlugin,
  listsPlugin,
  quotePlugin,
  thematicBreakPlugin,
  markdownShortcutPlugin,
  type MDXEditorMethods,
  type MDXEditorProps,
  UndoRedo,
  BoldItalicUnderlineToggles,
  toolbarPlugin,
  BlockTypeSelect,
  linkDialogPlugin,
  imagePlugin,
  ListsToggle,
} from "@mdxeditor/editor";
import { FlexBox } from "../core";
import { useTheme } from "styled-components";
import { MDXEditor, MDXGlobalStyle } from "./index.styled";

// Only import this to the next file
export default function MDEditor({
  editorRef,
  ...props
}: { editorRef?: ForwardedRef<MDXEditorMethods> | null } & MDXEditorProps) {
  const theme = useTheme();

  return (
    <>
      <MDXGlobalStyle />
      <MDXEditor
        plugins={[
          headingsPlugin(),
          listsPlugin(),
          quotePlugin(),
          thematicBreakPlugin(),
          markdownShortcutPlugin(),
          toolbarPlugin({
            toolbarContents: () => (
              <FlexBox
                background={theme.colors.background}
                className="toolbar-container"
              >
                <UndoRedo />
                <BoldItalicUnderlineToggles />
                <BlockTypeSelect />
                <ListsToggle />
              </FlexBox>
            ),
          }),
          linkDialogPlugin(),
          imagePlugin(),
        ]}
        {...props}
        ref={editorRef}
      />
    </>
  );
}
