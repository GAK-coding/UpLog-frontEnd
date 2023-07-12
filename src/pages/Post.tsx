import React from 'react';
import { CKEditor } from 'ckeditor4-react';

export default function Post() {
  const editorConfig = {
    extraPlugins: 'codesnippet', // 코드 블록 플러그인 활성화
    codeSnippet_theme: 'monokai_sublime', // 코드 블록 테마 설정
  };

  return (
    <div>
      <h2>Using CKEditor 4 in React</h2>
      <CKEditor
        config={editorConfig}
        // debug={true}
        // editorUrl="https://your-website.example/ckeditor/ckeditor.js"
        initData="<p>Hello from CKEditor 4!</p>"
        name="my-ckeditor"
        onChange={({ event, editor }: { event: any; editor: any }) => {
          const data = editor.getData();
          console.log(data);
        }}
        // onNamespaceLoaded={(CKEDITOR) => {
        //   // Handles `namespaceLoaded` event which is fired once the CKEDITOR namespace is loaded.
        //   // This event is emitted only once.
        // }}
        // onBeforeLoad={(CKEDITOR) => {
        //   // Handles `beforeLoad` event which is fired before an editor instance is created.
        // }}
        // onInstanceReady={({ editor }) => {
        //   // Handles native `instanceReady` event.
        // }}
        // onFocus={({ editor }) => {
        //   // Handles native `focus` event.
        // }}
        // onCustomEvent={({ editor }) => {
        //   // Handles custom `customEvent` event.
        // }}
        readOnly={false}
        // 이거로 스타일 커스텀
        style={{ borderColor: 'red' }}
        // type="classic"
      />
    </div>
  );
}
