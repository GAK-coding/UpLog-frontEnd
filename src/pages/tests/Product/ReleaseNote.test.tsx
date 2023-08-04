import { describe, expect, test } from '@jest/globals';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '@/tests/utils';
import { Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ProjectModal from '../../../components/Product/ReleaseNote/ProjectModal';
import ReleaseNote from '@/pages/Product/ReleaseNote';

describe('ReleaseNote', () => {
  test('ReleaseNote modal correctly', () => {
    const component = renderer.create(
      withRouter(<Route path={'/'} element={<ReleaseNote />} />, '/workspace/product')
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('ReleaseNote modal correctly', () => {
    const component = renderer.create(
      withRouter(<Route path={'/'} element={<ReleaseNote />} />, '/workspace/product')
    );

    expect(component.toJSON()).toMatchSnapshot();
  });
});
