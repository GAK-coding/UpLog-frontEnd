import './../App.css';
import { RecoilRoot } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React, { useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import loadable from '@loadable/component';
import { Scrollbars } from 'rc-scrollbars';
import Members from '@/pages/Product/Members.tsx';
import Chats from '@/pages/Product/Chats.tsx';
import Calendar from '@/pages/Product/Calendar.tsx';
import ReleaseNote from '@/pages/Product/ReleaseNote.tsx';

const Header = loadable(() => import('@/components/UI/Header'));
const Home = loadable(() => import('@/pages/Home'));
const Login = loadable(() => import('@/pages/Member/Login'));
const SignUp = loadable(() => import('@/pages/Member/SignUp'));
const Post = loadable(() => import('@/pages/Post'));
const PwInquiry = loadable(() => import('@/pages/Member/PwInquiry'));
const MyPage = loadable(() => import('@/pages/Member/MyPage'));
const Workspace = loadable(() => import('@/layouts/Workspace.tsx'));
const Project = loadable(() => import('@/pages/Project/Project.tsx'));
const Product = loadable(() => import('@/pages/Product/Product.tsx'));

// jest에서 .env 이용하려고 넣은 코드
const { MODE: ENVIRONMENT } = import.meta.env;
export { ENVIRONMENT };

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENTID;

function App() {
  const [showDevtools, setShowDevtools] = useState(true);

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <RecoilRoot>
            <Scrollbars
              style={{ width: '100vw', height: '100vh' }}
              autoHide
              autoHideTimeout={1000}
              // Duration for hide animation in ms.
              autoHideDuration={200}
            >
              <BrowserRouter>
                <section className={'h-[5.7rem]'}>
                  <Header />
                </section>
                <section className={'h-noneHeader'}>
                  <Routes>
                    <Route path={'/'} element={<Home />} />
                    <Route path={'/login'} element={<Login />} />
                    <Route path={'/signup'} element={<SignUp />} />
                    <Route path={'/post'} element={<Post />} />
                    <Route path={'/pwinquiry'} element={<PwInquiry />} />
                    <Route path={'/mypage'} element={<MyPage />} />
                    <Route path={'/workspace'} element={<Workspace />}>
                      <Route path={':product'} element={<ReleaseNote />} />
                      <Route path={':product/members'} element={<Members />} />
                      <Route path={':product/chats'} element={<Chats />} />
                      <Route path={':product/calendar'} element={<Calendar />} />
                      {/* group의 그룹들 */}
                      <Route path={':product/:project'} element={<Project />} />
                      <Route path={':product/:project/group/:parentgroup'} element={<Project />} />
                      <Route
                        path={':product/:project/group/:parentgroup/:childgroup'}
                        element={<Project />}
                      />
                    </Route>
                  </Routes>
                </section>
              </BrowserRouter>
            </Scrollbars>
          </RecoilRoot>
          {showDevtools && <ReactQueryDevtools />}
        </GoogleOAuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
