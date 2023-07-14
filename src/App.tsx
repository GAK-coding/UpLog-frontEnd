import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React, { useState } from 'react';
import Home from './pages/Home';
import Header from './components/ui/Header';
import Login from './pages/Login';
import SignUp from './pages/SignUp';
import Post from './pages/Post';
import Switcher from './components/darkMode/Switcher.tsx';
import { ChakraProvider } from '@chakra-ui/react';

const queryClient = new QueryClient();

function App() {
  const [showDevtools, setShowDevtools] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <RecoilRoot>
          <BrowserRouter>
            <section className={'h-[5.5rem]'}>
              <Header />
            </section>
            <section className={'h-noneHeader'}>
              <Routes>
                <Route path={'/'} element={<Home />} />
                <Route path={'/login'} element={<Login />} />
                <Route path={'/signup'} element={<SignUp />} />
                <Route path={'/post'} element={<Post />} />
              </Routes>
            </section>
          </BrowserRouter>
        </RecoilRoot>
        {showDevtools && <ReactQueryDevtools />}
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
