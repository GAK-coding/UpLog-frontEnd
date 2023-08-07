import { describe, expect, test } from '@jest/globals';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '@/tests/utils';
import { Route, Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ProductList from '@/components/Product/Info/ProductList';

describe('ProductList', () => {
  test('ProductList UI', () => {
    const component = renderer.create(
      withRouter(<Route path={'/'} element={<ProductList />} />, '/workspace/product')
    );
    expect(component.toJSON()).toMatchSnapshot();
  });
});
