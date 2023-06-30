import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';

// import tw, { styled, css, theme } from 'twin.macro';
//
// const Input = styled.div`
//   ${css`
//     -webkit-tap-highlight-color: transparent; /* add css styles */
//     background-color: ${theme`colors.red.500`}; /* add values from your tailwind config */
//     ${tw`text-green-400 border-2`}; /* tailwind classes */
//
//     &::selection {
//       ${tw`text-purple-500`}; /* style custom css selectors with tailwind classes */
//     }
//   `}
// `;

function App() {
  return (
    <RecoilRoot>
      <BrowserRouter>
        <div>
          <h1 className="text-2xl font-bold underline">Hello world!</h1>
        </div>
        <Routes>
          <Route></Route>
        </Routes>
      </BrowserRouter>
    </RecoilRoot>
  );
}

export default App;
