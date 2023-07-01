import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import { useState } from 'react';
import Home from './pages/Home';

const queryClient = new QueryClient();

function App() {
  const [showDevtools, setShowDevtools] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <RecoilRoot>
        <BrowserRouter>
          <Routes>
            <Route path={'/'} element={<Home />} />
          </Routes>
        </BrowserRouter>
      </RecoilRoot>
      {showDevtools && <ReactQueryDevtools />}
    </QueryClientProvider>
  );
}

export default App;
