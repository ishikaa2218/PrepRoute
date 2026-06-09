import {
  useEditor,
  EditorContent
} from "@tiptap/react";

import StarterKit from "@tiptap/starter-kit";
import Underline from "@tiptap/extension-underline";
import Link from "@tiptap/extension-link";
import Image from "@tiptap/extension-image";

import {
  Bold,
  Italic,
  Underline as UnderlineIcon,
  Link as LinkIcon,
  Image as ImageIcon,
  List,
  ListOrdered
} from "lucide-react";

import "./RichTextEditor.css";
import { useEffect } from "react";

type Props = {
  value: string;
  onChange: (
    value: string
  ) => void;
};

const RichTextEditor = ({
  value,
  onChange,
}: Props) => {

  const editor = useEditor({

    extensions: [
      StarterKit,
      Underline,
      Link,
      Image,
    ],

    content: value,

    immediatelyRender: false,

    onUpdate: ({
      editor,
    }) => {

      onChange(
        editor.getHTML()
      );

    },
  });

  const addImage = () => {

    const input =
      document.createElement(
        "input"
      );

    input.type = "file";

    input.accept =
      "image/*";

    input.click();

    input.onchange =
      () => {

        const file =
          input.files?.[0];

        if (!file) return;

        const reader =
          new FileReader();

        reader.onload =
          () => {

            editor
              ?.chain()
              .focus()
              .setImage({
                src:
                  reader.result as string,
              })
              .run();

          };

        reader.readAsDataURL(
          file
        );

      };
  };

  useEffect(() => {

  if (
    editor &&
    value !== editor.getHTML()
  ) {

    editor.commands.setContent(
      value || ""
    );

  }

}, [value, editor]);

  if (!editor)
    return null;

  return (
    <div className="editor-wrapper">

      <div className="toolbar">

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBold()
              .run()
          }
        >
          <Bold size={16}/>
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleItalic()
              .run()
          }
        >
          <Italic size={16}/>
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleUnderline()
              .run()
          }
        >
          <UnderlineIcon size={16}/>
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleBulletList()
              .run()
          }
        >
          <List size={16}/>
        </button>

        <button
          type="button"
          onClick={() =>
            editor
              .chain()
              .focus()
              .toggleOrderedList()
              .run()
          }
        >
          <ListOrdered size={16}/>
        </button>

        <button
          type="button"
          onClick={() => {

            const url =
              prompt(
                "Enter URL"
              );

            if (!url)
              return;

            editor
              .chain()
              .focus()
              .setLink({
                href: url,
              })
              .run();
          }}
        >
          <LinkIcon size={16}/>
        </button>

        <button
          type="button"
          onClick={addImage}
        >
          <ImageIcon size={16}/>
        </button>

      </div>

      <EditorContent
        editor={editor}
      />

    </div>
  );
};

export default RichTextEditor;