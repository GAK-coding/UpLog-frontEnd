import { describe, expect, test } from '@jest/globals';
import Home from '@/pages/Home';
import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '@/tests/utils';
import { Route } from 'react-router-dom';

describe('Home', () => {
  // test('resolves to lemon', () => {
  //   // make sure to add a return statement
  //   // return expect(Promise.resolve('lemon')).resolves.toBe('lemon');
  //   // expect(2 + 2).toBe(4);
  //   render(<Home />);
  //   expect(screen.getByText('여긴 홈')).toBeInTheDocument();
  // });

  test('test2', () => {
    render(withRouter(<Route path={'/'} element={<Home />} />));
    expect(screen.getByText('여긴 홈')).toBeInTheDocument();
  });
});
