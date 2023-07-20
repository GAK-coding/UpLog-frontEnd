import { describe, expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '../../../tests/utils';
import { Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ChangePwModal from '../../MyPage/ChangePwModal';

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

  test('password change modal correctly', () => {
    const component = renderer.create(
      withRouter(<Route path={'/mypage'} element={<ChangePwModal {...props_pwChange} />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('password change modal, test password', () => {
    render(withRouter(<Route path={'/mypage'} element={<ChangePwModal {...props_pwChange} />} />));

    expect(screen.getByText('현재 비밀번호')).toBeInTheDocument();
  });

  test('Member Withdrawal modal correctly', () => {
    const component = renderer.create(
      withRouter(<Route path={'/mypage'} element={<ChangePwModal {...props_memberWithdrawal} />} />)
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  // test('validates the form submission', () => {
  //   render(withRouter(<Route path={'/'} element={<ChangePwModal />} />));
  //
  //   const nameInput = screen.getByPlaceholderText('이름');
  //   const nickNameInput = screen.getByPlaceholderText('닉네임');
  //   const emailInput = screen.getByPlaceholderText('이메일');
  //   const authInput = screen.getByPlaceholderText('인증번호');
  //   const passwordInput = screen.getByPlaceholderText('비밀번호');
  //   // const submitButton = screen.getByText('회원가입');
  //
  //   fireEvent.change(nameInput, { target: { value: 'John Doe' } });
  //   fireEvent.change(nickNameInput, { target: { value: 'john_doe' } });
  //   fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
  //   fireEvent.change(authInput, { target: { value: '123456' } });
  //   fireEvent.change(passwordInput, { target: { value: 'Passw0rd!' } });
  //
  //   // Click the 인증번호 전송 button
  //   const sendAuthButton = screen.getByText('전송');
  //   fireEvent.click(sendAuthButton);
  //
  //   // Click the 확인 button to complete the 인증번호 confirmation
  //   const confirmAuthButton = screen.getByText('확인');
  //   fireEvent.click(confirmAuthButton);
  // });
  //
  // test('check password', () => {
  //   render(withRouter(<Route path={'/'} element={<ChangePwModal />} />));
  //
  //   const passwordInput = screen.getByPlaceholderText('비밀번호');
  //   fireEvent.change(passwordInput, { target: { value: misPw } });
  //
  //   expect(screen.getByText('영어/숫자/특수문자 포함, 8~15자로 입력해주세요.')).toBeInTheDocument();
  //
  //   fireEvent.change(passwordInput, { target: { value: goodPw } });
  //   expect(
  //     screen.queryByText('영어/숫자/특수문자 포함, 8~15자로 입력해주세요.')
  //   ).not.toBeInTheDocument();
  // });
});
