import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';

const queryClient = new QueryClient();

function App() {
  const [showDevtools, setShowDevtools] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
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
      {showDevtools && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
