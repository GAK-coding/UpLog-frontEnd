import { describe, expect, test } from '@jest/globals';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '@/tests/utils';
import { Route, Router } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import ProductInfoModal from '@/components/Product/Info/ProductInfoModal';

describe('ProductInfoModal', () => {
  const onClose = jest.fn();

  //제품 생성 모달
  const props_productCreate = {
    isOpen: true,
    onClose: onClose,
    isCreateProduct: true,
  };

  // 제품 정보 수정 모달
  const props_productEdit = {
    isOpen: true,
    onClose: onClose,
    isCreateProduct: false,
  };

  afterEach(() => onClose.mockReset());

  test('ProductInfoModal Create UI', () => {
    const component = renderer.create(
      withRouter(
        <Route path={'/'} element={<ProductInfoModal {...props_productCreate} />} />,
        '/workspace/product'
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('ProductInfoModal Edit UI', () => {
    const component = renderer.create(
      withRouter(
        <Route path={'/'} element={<ProductInfoModal {...props_productEdit} />} />,
        '/workspace/product'
      )
    );
    expect(component.toJSON()).toMatchSnapshot();
  });

  test('ProductInfoModal Create Correctly', () => {
    render(
      withRouter(
        <Route
          path={'/workspace/product'}
          element={<ProductInfoModal {...props_productCreate} />}
        />,
        '/workspace/product'
      )
    );

    expect(screen.getByText('제품 추가')).toBeInTheDocument();
    expect(screen.getByText('마스터 설정')).toBeInTheDocument();
  });

  test('ProductInfoModal Edit Correctly', () => {
    render(
      withRouter(
        <Route path={'/workspace/product'} element={<ProductInfoModal {...props_productEdit} />} />,
        '/workspace/product'
      )
    );

    expect(screen.getByText('제품 정보 수정')).toBeInTheDocument();
    expect(screen.queryByText('마스터 설정')).not.toBeInTheDocument();
  });
});
