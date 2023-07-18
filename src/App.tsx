import './App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React, { useState } from 'react';
import { ChakraProvider, extendBaseTheme, extendTheme } from '@chakra-ui/react';
import chakraTheme from '@chakra-ui/theme';
import { GoogleOAuthProvider } from '@react-oauth/google';
import loadable from '@loadable/component';

const Header = loadable(() => import('./components/ui/Header'));
const Home = loadable(() => import('./pages/Home'));
const Login = loadable(() => import('./pages/Login'));
const SignUp = loadable(() => import('./pages/SignUp'));
const Post = loadable(() => import('./pages/Post'));
const PwInquiry = loadable(() => import('./pages/PwInquiry'));
const MyPage = loadable(() => import('./pages/MyPage'));

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENTID;

function App() {
  const [showDevtools, setShowDevtools] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <RecoilRoot>
            <BrowserRouter>
              <section className={'h-[5.7rem]'}>
                <Header />
              </section>
              <section className={'h-noneHeader min-h-[53rem]'}>
                <Routes>
                  <Route path={'/'} element={<Home />} />
                  <Route path={'/login'} element={<Login />} />
                  <Route path={'/signup'} element={<SignUp />} />
                  <Route path={'/post'} element={<Post />} />
                  <Route path={'/pwinquiry'} element={<PwInquiry />} />
                  <Route path={'/mypage'} element={<MyPage />} />
                </Routes>
              </section>
            </BrowserRouter>
          </RecoilRoot>
          {showDevtools && <ReactQueryDevtools />}
        </GoogleOAuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
