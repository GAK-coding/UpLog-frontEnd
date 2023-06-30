import { useState } from 'react';
import './App.css';

import tw, { styled, css, theme } from 'twin.macro';

const Input = styled.div`
  ${css`
    -webkit-tap-highlight-color: transparent; /* add css styles */
    background-color: ${theme`colors.red.500`}; /* add values from your tailwind config */
    ${tw`text-green-400 border-2`}; /* tailwind classes */

    &::selection {
      ${tw`text-purple-500`}; /* style custom css selectors with tailwind classes */
    }
  `}
`;

function App() {
  return (
    <div>
      <h1 className="text-2xl font-bold underline">Hello world!</h1>
      <Input>하이</Input>
    </div>
  );
}

export default App;
