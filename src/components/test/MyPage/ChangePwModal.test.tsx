import { describe, expect, test } from '@jest/globals';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '../../../tests/utils';
import { Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ChangePwModal from '../../MyPage/ChangePwModal';
import userEvent from '@testing-library/user-event';

describe('ChangePwModal', () => {
  const misPw = 'qwer234';
  const goodPw = 'qwer234!';

  const onClose = jest.fn();

  const props_pwChange = {
    isOpen: true,
    onClose: onClose,
    isClickPwChange: true,
  };
  const props_memberWithdrawal = {
    isOpen: true,
    onClose: onClose,
    isClickPwChange: false,
  };

  // 테스트가 끝날때 마다 Mock 함수를 깨끗하게 정리
  afterEach(() => onClose.mockReset());

  // 비밀번호 변경 모달
  test('password change modal correctly', () => {
    const component = renderer.create(
      withRouter(<Route path={'/'} element={<ChangePwModal {...props_pwChange} />} />, '/mypage')
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('password change modal, test password', () => {
    render(
      withRouter(
        <Route path={'/mypage'} element={<ChangePwModal {...props_pwChange} />} />,
        '/mypage'
      )
    );

    const passwordInput = screen.getByPlaceholderText('새로운 비밀번호를 입력하세요.');

    fireEvent.change(passwordInput, { target: { value: misPw } });
    expect(screen.getByText('영문/숫자/특수문자 포함, 8~15자로 입력해주세요.')).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: goodPw } });
    expect(
      screen.queryByText('영문/숫자/특수문자 포함, 8~15자로 입력해주세요.')
    ).not.toBeInTheDocument();
  });

  test('move page, find password button click to /pwinquiry', () => {
    render(
      withRouter(
        <>
          <Route path={'/mypage'} element={<ChangePwModal {...props_pwChange} />} />
          <Route path={'/pwinquiry'} element={<p>비밀번호 찾기 페이지</p>} />
        </>,
        '/mypage'
      )
    );

    const findPwLink = screen.getByRole('link', { name: '비밀번호 찾기' });
    fireEvent.click(findPwLink);
    expect(screen.getByText('비밀번호 찾기 페이지')).toBeInTheDocument();
  });

  // 회원 탈퇴 모달
  test('Member Withdrawal modal correctly', () => {
    const component = renderer.create(
      withRouter(
        <Route path={'/mypage'} element={<ChangePwModal {...props_memberWithdrawal} />} />,
        'mypage'
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('check Withdrawal modal screen', () => {
    render(
      withRouter(
        <Route path={'/mypage'} element={<ChangePwModal {...props_memberWithdrawal} />} />,
        '/mypage'
      )
    );

    expect(screen.getByText('현재 비밀번호')).toBeInTheDocument();
    // getByText는 존재하지 않으명 에러가 나는데, queryByText는 존재하지 않으면 애러가 안나서 not을 하고 싶으면 queryByT
    expect(screen.queryByText('새로운 비밀번호')).not.toBeInTheDocument();
  });
});
