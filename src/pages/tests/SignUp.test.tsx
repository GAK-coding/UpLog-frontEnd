import { describe, expect, test } from '@jest/globals';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '../../tests/utils';
import { Route } from 'react-router-dom';
import SignUp from '../SignUp';

describe('SignUp', () => {
  // test('signup correctly', () => {
  //   render(withRouter(<Route path={'/'} element={<SignUp />} />));
  //
  //   expect(screen.getByText('개인')).toBeInTheDocument();
  // });

    const password = 'qwer!234';

  test('check password', () => {
    render(withRouter(<Route path={'/'} element={<SignUp />} />));

    expect(screen.getByText('개인')).toBeInTheDocument();
  });

  // test('test2', () => {
  //     render(withRouter(<Route path={'/'} element={<Home />} />));
  //     expect(screen.getByText('여긴 홈')).toBeInTheDocument();
  // });
});
