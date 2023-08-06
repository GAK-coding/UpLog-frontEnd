import { describe, expect, test } from '@jest/globals';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '@/tests/utils';
import { Route, Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import UserProfile from '@/components/Member/Header/UserProfile';
import Mypage from '@/pages/Member/Mypage';
import userEvent from '@testing-library/user-event';

describe('UserProfile', () => {
  const userInfo = {
    userprofile: '',
    userName: '오채영',
    userNickname: 'OCI',
    userId: 'oco6029@naver.com',
  };

  test('UserProfile Modal UI', () => {
    const component = renderer.create(
      withRouter(<Route path={'/'} element={<UserProfile />} />, '/workspace/product')
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('UserProfile Modal Open Info Correctly', () => {
    render(
      withRouter(
        <Route path={'/workspace/product'} element={<UserProfile />} />,
        '/workspace/product'
      )
    );

    expect(screen.getByText('스크랩')).toBeInTheDocument();
    expect(screen.getByText('프로필 수정')).toBeInTheDocument();
    expect(screen.getByText('로그아웃')).toBeInTheDocument();

    expect(screen.getByText(userInfo.userId)).toBeInTheDocument();
    expect(screen.getByText(`${userInfo.userNickname} (${userInfo.userName})`)).toBeInTheDocument();
  });

  // test('UserProfile Modal Move Page Correctly', () => {
  //   render(
  //     withRouter(
  //       <>
  //         <Route path={'/work/space'} element={<UserProfile />} />
  //         <Route path={'/scrap'} element={<p>스크랩 페이지</p>} />
  //         {/*<Route path={'/mypage'} element={<Mypage />} />*/}
  //       </>,
  //       '/workspace/product'
  //     )
  //   );
  //   fireEvent.click(screen.getByText('스크랩')); // "Scrap" 텍스트를 가진 요소를 클릭합니다
  //
  //   // 스크랩 페이지로 이동하는지 확인합니다
  //   expect(screen.getByText('스크랩 페이지')).toBeInTheDocument();
  // });
});
