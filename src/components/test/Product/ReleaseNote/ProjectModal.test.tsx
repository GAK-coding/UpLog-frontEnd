import { describe, expect, test } from '@jest/globals';
import { fireEvent, getByText, render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import { withRouter } from '@/tests/utils';
import { Route } from 'react-router-dom';
import '@testing-library/jest-dom/extend-expect';
import renderer from 'react-test-renderer';
import UserManageModal from '@/components/Member/MyPage/UserManageModal';
import userEvent from '@testing-library/user-event';
import ProjectModal from '@/components/Product/ReleaseNote/ProjectModal';

describe('ProjectModal', () => {
  const props_isAdd = {
    isOpen: true,
    onClose: jest.fn(),
    isAdd: true,
    versionName: 'v.1.0.0',
  };

  const props_isComplete = {
    isOpen: true,
    onClose: jest.fn(),
    isAdd: false,
    versionName: 'v.1.0.0',
  };

  // 테스트가 끝날때 마다 Mock 함수를 깨끗하게 정리
  afterEach(() => props_isAdd.onClose.mockReset());

  // 프로젝트 추가하기
  test('isAdd modal correctly', () => {
    const component = renderer.create(
      withRouter(
        <Route path={'/workspace/product'} element={<ProjectModal {...props_isAdd} />} />,
        '/workspace/product'
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('isAdd modal, open', () => {
    render(
      withRouter(
        <Route path={'/workspace/product'} element={<ProjectModal {...props_isAdd} />} />,
        '/workspace/product'
      )
    );

    expect(screen.getByText('프로젝트 추가')).toBeInTheDocument();
    expect(screen.getByText('버전 입력')).toBeInTheDocument();
    expect(screen.queryByText('프로젝트 완료')).not.toBeInTheDocument();
    expect(screen.queryByText('최종 버전 입력')).not.toBeInTheDocument();
  });

  test('isAdd modal, input', () => {
    render(
      withRouter(
        <Route path={'/workspace/product'} element={<ProjectModal {...props_isAdd} />} />,
        '/workspace/product'
      )
    );

    const versionInput = screen.getByPlaceholderText('새로 생성할 버전을 입력해 주세요.');
    expect(versionInput).toHaveAttribute('value', ''); // Replace the second parameter with the expected initial value

    fireEvent.change(versionInput, { target: { value: 'v.1.0.1' } });
    expect(versionInput).toHaveAttribute('value', 'v.1.0.1'); // Replace the second parameter with the expected initial value
  });

  // 프로젝트 완료하기
  test('isComplete modal correctly', () => {
    const component = renderer.create(
      withRouter(
        <Route path={'/workspace/product'} element={<ProjectModal {...props_isComplete} />} />,
        '/workspace/product'
      )
    );

    expect(component.toJSON()).toMatchSnapshot();
  });

  test('isComplete modal, open', () => {
    render(
      withRouter(
        <Route path={'/workspace/product'} element={<ProjectModal {...props_isComplete} />} />,
        '/workspace/product'
      )
    );

    expect(screen.queryByText('프로젝트 추가')).not.toBeInTheDocument();
    expect(screen.queryByText('버전 입력')).not.toBeInTheDocument();
    expect(screen.getByText('프로젝트 완료')).toBeInTheDocument();
    expect(screen.getByText('최종 버전 입력')).toBeInTheDocument();
  });

  test('isComplete modal, input', () => {
    render(
      withRouter(
        <Route path={'/workspace/product'} element={<ProjectModal {...props_isComplete} />} />,
        '/workspace/product'
      )
    );

    const versionInput = screen.getByPlaceholderText('최종 버전을 입력해 주세요.');
    expect(versionInput).toHaveAttribute('value', props_isComplete.versionName); // Replace the second parameter with the expected initial value

    fireEvent.change(versionInput, { target: { value: 'v.1.0.2' } });
    expect(versionInput).toHaveAttribute('value', 'v.1.0.2'); // Replace the second parameter with the expected initial value
  });
});
