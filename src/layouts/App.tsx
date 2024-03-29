import './../App.css';
import { useRecoilState } from 'recoil';
import { BrowserRouter, Route, Routes } from 'react-router-dom';
import { QueryClient, QueryClientProvider } from 'react-query';
import { ReactQueryDevtools } from 'react-query/devtools';
import React, { useCallback, useEffect, useState } from 'react';
import { ChakraProvider } from '@chakra-ui/react';
import { GoogleOAuthProvider } from '@react-oauth/google';
import loadable from '@loadable/component';
import { Scrollbars } from 'rc-scrollbars';
import 'slick-carousel/slick/slick.css';
import 'slick-carousel/slick/slick-theme.css';
import { productOpen } from '@/recoil/Product/atom.ts';
import { worker } from '../mocks/browser.ts';

const Header = loadable(() => import('@/components/UI/Header'));
const Loading = loadable(() => import('@/components/UI/Loading'));
const Home = loadable(() => import('@/pages/Home'));
const Login = loadable(() => import('@/pages/Member/Login'));
const SignUp = loadable(() => import('@/pages/Member/SignUp'));
const PwInquiry = loadable(() => import('@/pages/Member/PwInquiry'));
const MyPage = loadable(() => import('@/pages/Member/MyPage'));
const Workspace = loadable(() => import('@/layouts/Workspace.tsx'));
const Project = loadable(() => import('@/pages/Project/Project.tsx'));
const ReleaseNote = loadable(() => import('@/pages/Product/ReleaseNote.tsx'));
const Calendar = loadable(() => import('@/pages/Product/Calendar.tsx'));
const Chats = loadable(() => import('@/pages/Product/Chats.tsx'));
const Members = loadable(() => import('@/pages/Product/Members.tsx'));
const NewChangeLog = loadable(() => import('@/pages/Product/NewChangeLog.tsx'));
const Menu = loadable(() => import('@/pages/Project/Menu.tsx'));
const TaskDetail = loadable(() => import('@/pages/Project/TaskDetail.tsx'));
const ManageGroup = loadable(() => import('@/pages/Project/ManageGroup.tsx'));
const Error = loadable(() => import('@/pages/Error.tsx'));
const InComplete = loadable(() => import('@/pages/InComplete.tsx'));

// jest에서 .env 이용하려고 넣은 코드
const { MODE: ENVIRONMENT } = import.meta.env;
export { ENVIRONMENT };

const queryClient = new QueryClient();
const clientId = import.meta.env.VITE_GOOGLE_CLIENTID;
const isDeployment: boolean = import.meta.env.VITE_IS_DEPLOYMENT === 'true';

function App() {
  const [showDevtools, setShowDevtools] = useState(!isDeployment);
  const [isProductClick, setIsProductClick] = useRecoilState(productOpen);

  const onCloseProduct = useCallback(() => {
    setIsProductClick(false);
  }, []);

  if (import.meta.env.VITE_IS_MSW === 'true') {
    worker.start({
      onUnhandledRequest: () => {
        return false;
      },
    });
  }

  return (
    <QueryClientProvider client={queryClient}>
      <ChakraProvider>
        <GoogleOAuthProvider clientId={clientId}>
          <Scrollbars
            style={{ width: '100vw', height: '100vh' }}
            autoHide
            autoHideTimeout={1000}
            // Duration for hide animation in ms.
            autoHideDuration={200}
          >
            <BrowserRouter>
              <Loading />
              <section className={'h-[5.7rem]'} onClick={onCloseProduct}>
                <Header />
              </section>
              <section className={'h-noneHeader'} onClick={onCloseProduct}>
                <Routes>
                  <Route path={'/'} element={<Home />} />
                  <Route path={'/login'} element={<Login />} />
                  <Route path={'/signup'} element={<SignUp />} />
                  <Route path={'/pwinquiry'} element={<PwInquiry />} />
                  <Route path={'/mypage'} element={<MyPage />} />
                  <Route path={'/description'} element={<InComplete />} />
                  <Route path={'/alarm'} element={<InComplete />} />
                  <Route path={'/search/:searchTag'} element={<InComplete />} />
                  <Route path={'/workspace'} element={<Workspace />}>
                    <Route path={':product'} element={<ReleaseNote />} />
                    <Route path={':product/members'} element={<Members />} />
                    <Route path={':product/chats'} element={<Chats />} />
                    {/*<Route path={':product/calendar'} element={<Calendar />} />*/}
                    <Route path={':product/chats'} element={<InComplete />} />
                    <Route path={':product/calendar'} element={<InComplete />} />
                    <Route path={':product/newchange'} element={<NewChangeLog />} />
                    <Route path={':product/:project/menu/:menutitle'} element={<Menu />} />
                    <Route
                      path={':product/:project/menu/:menutitle/task/:taskid'}
                      element={<TaskDetail />}
                    />
                    <Route path={':product/:project/scrumring'} element={<InComplete />} />
                    {/* group의 그룹들 */}
                    <Route path={':product/:project'} element={<Project />} />
                    <Route path={':product/:project/group/:parentgroup'} element={<Project />} />
                    <Route
                      path={':product/:project/group/:parentgroup/:childgroup'}
                      element={<Project />}
                    />
                    <Route
                      path={':product/:project/group/:parentgroup/setting'}
                      element={<ManageGroup />}
                    />
                  </Route>
                  <Route path={'*'} element={<Error />} /> {/* Handle all other URLs */}
                </Routes>
              </section>
            </BrowserRouter>
          </Scrollbars>
          {showDevtools && <ReactQueryDevtools />}
        </GoogleOAuthProvider>
      </ChakraProvider>
    </QueryClientProvider>
  );
}

export default App;
