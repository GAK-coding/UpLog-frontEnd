import { describe, expect, test } from '@jest/globals';
import { fireEvent, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import SignUp from '../SignUp';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';

describe('SignUp', () => {
  const misPw = 'qwer234';
  const goodPw = 'qwer234!';

  test('signup correctly', () => {
    const component = renderer.create(withRouter(<Route path={'/'} element={<SignUp />} />));

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('validates the form submission', () => {
    render(withRouter(<Route path={'/'} element={<SignUp />} />));

    const nameInput = screen.getByPlaceholderText('이름');
    const nickNameInput = screen.getByPlaceholderText('닉네임');
    const emailInput = screen.getByPlaceholderText('이메일');
    const authInput = screen.getByPlaceholderText('인증번호');
    const passwordInput = screen.getByPlaceholderText('비밀번호');
    // const submitButton = screen.getByText('회원가입');

    fireEvent.change(nameInput, { target: { value: 'John Doe' } });
    fireEvent.change(nickNameInput, { target: { value: 'john_doe' } });
    fireEvent.change(emailInput, { target: { value: 'john.doe@example.com' } });
    fireEvent.change(authInput, { target: { value: '123456' } });
    fireEvent.change(passwordInput, { target: { value: 'Passw0rd!' } });

    // Click the 인증번호 전송 button
    const sendAuthButton = screen.getByText('전송');
    fireEvent.click(sendAuthButton);

    // Click the 확인 button to complete the 인증번호 confirmation
    const confirmAuthButton = screen.getByText('확인');
    fireEvent.click(confirmAuthButton);
  });

  test('check password', () => {
    render(withRouter(<Route path={'/'} element={<SignUp />} />));

    const passwordInput = screen.getByPlaceholderText('비밀번호');
    fireEvent.change(passwordInput, { target: { value: misPw } });

    expect(screen.getByText('영어/숫자/특수문자 포함, 8~15자로 입력해주세요.')).toBeInTheDocument();

    fireEvent.change(passwordInput, { target: { value: goodPw } });
    expect(
      screen.queryByText('영어/숫자/특수문자 포함, 8~15자로 입력해주세요.')
    ).not.toBeInTheDocument();
  });
});
