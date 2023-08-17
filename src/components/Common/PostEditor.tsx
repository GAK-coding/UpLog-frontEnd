import React, { useEffect, useLayoutEffect, useRef, useState } from 'react';
import { Editor } from '@toast-ui/react-editor';
import '@toast-ui/editor/dist/toastui-editor.css';
import colorSyntax from '@toast-ui/editor-plugin-color-syntax';
import 'tui-color-picker/dist/tui-color-picker.css';
import '@toast-ui/editor-plugin-color-syntax/dist/toastui-editor-plugin-color-syntax.css';
import '@toast-ui/editor/dist/i18n/ko-kr';

import '@toast-ui/editor/dist/toastui-editor.css';
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css';

import 'prismjs/themes/prism.css';
import '@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css';
import codeSyntaxHighlight from '@toast-ui/editor-plugin-code-syntax-highlight';
import Prism from 'prismjs';

import 'prismjs/themes/prism.css';
import 'prismjs/themes/prism-okaidia.css'; // 다크 모드 테마를 추가합니다
import '@toast-ui/editor/dist/theme/toastui-editor-dark.css'; // Toast UI 에디터 다크 모드 테마를 추가합니다
import 'prismjs/components/prism-jsx.min'; // JSX 언어 지원을 포함합니다 (선택 사항)
import 'prismjs/plugins/line-numbers/prism-line-numbers.css'; // 코드 블럭에 줄 번호를 추가하기 위해 이 줄을 추가합니다
import 'prismjs/plugins/line-numbers/prism-line-numbers.min';
import { useRecoilState } from 'recoil';
import { editorChangeLog, editorPost, themeState } from '@/recoil/Common/atom.ts'; // 줄 번호 플러그인을 포함합니다

interface Props {
  isPost: boolean;
}
export default function PostEditor({ isPost }: Props) {
  const editorRef = useRef<Editor>(null);
  const [darkMode, setDarkMode] = useRecoilState(themeState);

  const [editPost, setEditPost] = useRecoilState(editorPost);
  const [editData, setEditData] = useState<string>('');
  const [editChangeLog, setEditChangeLog] = useRecoilState(editorChangeLog);

  const onChange = () => {
    const data = editorRef!.current!.getInstance().getHTML();
    const convertedData = data.replace(/"/g, "'");

    setEditData(convertedData);
    if (isPost) {
      setEditPost(editData);
    } else {
      setEditChangeLog(editData);
    }
    // console.log(editorRef!.current!.getRootElement().clientHeight);
  };

  const onUploadImage = async (blob: Blob, callback: (url: string, altText: string) => void) => {
    console.log(blob);

    // 이건 로컬에서만 가능
    callback(URL.createObjectURL(blob), '사진');

    // TODO: 이미지 스토리지 완성되면 연결
    // const url = await uploadImage(blob);
    // callback(url, 'alt text');
    // return false;
  };

  /** editor 다크 모드 */
  // 그냥 useEffect로 하면 에디터가 흰색이었다가 검정으로 바뀌는게 너무 신경쓰임
  useLayoutEffect(() => {
    const editorEl = document.getElementsByClassName('toastui-editor-defaultUI')[0];

    if (editorEl) {
      const shouldAddDarkClass = darkMode && !editorEl.classList.contains('toastui-editor-dark');
      const shouldRemoveDarkClass = !darkMode && editorEl.classList.contains('toastui-editor-dark');

      if (shouldAddDarkClass) {
        editorEl.classList.add('toastui-editor-dark');
      } else if (shouldRemoveDarkClass) {
        editorEl.classList.remove('toastui-editor-dark');
      }
    }
  }, [darkMode]);

  return (
    <div className={'w-h-full'}>
      <Editor
        height={isPost ? '100%' : '90vh'}
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
        initialValue={isPost ? editPost : editChangeLog}
      />
    </div>
  );
}
