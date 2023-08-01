import React, { useEffect, useRef } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';
import { useRecoilState } from 'recoil';
import { postHeight } from '@/recoil/Product/ReleaseNote.tsx';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs'; // prism 테마 추가

export default function PostEditor() {
  const editorRef = useRef<Editor>(null);
  const [height, setHeight] = useRecoilState(postHeight);

  const onChange = () => {
    const data = editorRef!.current!.getInstance().getHTML();
    console.log(data);
    // console.log(editorRef!.current!.getRootElement().clientHeight);
  };

  console.log(height);

  useEffect(() => {
    setHeight(editorRef!.current!.getRootElement().clientHeight);
  }, [editorRef]);

  const onUploadImage = async (blob: Blob, callback: (url: string, altText: string) => void) => {
    console.log(blob);

    // 이건 로컬에서만 가능
    callback(URL.createObjectURL(blob), '사진');

    // TODO: 이미지 스토리지 완성되면 연결
    // const url = await uploadImage(blob);
    // callback(url, 'alt text');
    // return false;
  };

  return (
    <Editor
      // theme="dark"
      height="auto"
      // minHeight={'100%'}
      initialEditType="wysiwyg"
      ref={editorRef}
      // toolbarItems={[
      //   ['bold', 'italic', 'strike'],
      //   ['hr'],
      //   ['image', 'link'],
      //   ['ul', 'ol'],
      //   ['code', 'codeblock'],
      // ]}
      hideModeSwitch={true}
      useCommandShortcut={false}
      plugins={[colorSyntax, [codeSyntaxHighlight, { highlighter: Prism }]]}
      language="ko-KR"
      onChange={onChange}
      hooks={{
        addImageBlobHook: onUploadImage,
      }}
    />
  );
}
