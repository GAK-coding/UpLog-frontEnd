import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import Login from '../Login';
import '@testing-library/jest-dom';
import { withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import { GoogleOAuthProvider } from '@react-oauth/google';

describe('Login', () => {
  // const clientId = import.meta.env.VITE_GOOGLE_CLIENTID;

  test('login correctly', () => {
    const component = renderer.create(withRouter(<Route path={'/login'} element={<Login />} />));

    expect(component.toJSON()).toMatchSnapshot();
  });

  // test('renders the login component correctly', () => {
  //   render(
  //     withRouter(
  //       <GoogleOAuthProvider clientId={clientId}>
  //         <Route path={'/'} element={<Login />} />
  //       </GoogleOAuthProvider>
  //     )
  //   );
  //   // Check if the email and password input fields are rendered correctly
  //   const emailInput = screen.getByPlaceholderText('이메일');
  //   const passwordInput = screen.getByPlaceholderText('비밀번호');
  //   // expect(emailInput).toBeInTheDocument();
  //   // expect(passwordInput).toBeInTheDocument();
  //
  //   // // Check if the 로그인 button is rendered correctly
  //   // const loginButton = getByText('로그인');
  //   // expect(loginButton).toBeInTheDocument();
  // });
});
