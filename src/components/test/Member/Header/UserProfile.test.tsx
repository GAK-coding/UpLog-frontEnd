import { describe, expect, test } from '@jest/globals';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withAllContexts, withRouter } from '@/tests/utils';
import { Route, Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import UserProfile from '@/components/Member/Header/UserProfile';
import userEvent from '@testing-library/user-event';
import { RecoilRoot } from 'recoil';

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

  test('UserProfile Modal Open MenuInfo Correctly', () => {
    render(
      withRouter(
        <Route path={'/workspace/product'} element={<UserProfile />} />,
        '/workspace/product'
      )
    );

    expect(screen.getByText('스크랩')).toBeInTheDocument();
    expect(screen.getByText('프로필 수정')).toBeInTheDocument();
    expect(screen.getByText('로그아웃')).toBeInTheDocument();
  });
});
