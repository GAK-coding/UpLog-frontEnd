describe('마이페이지 테스트', () => {
  // given - 로그인을 하고 마이페이지로 접근한다.
  beforeEach(() => {
    cy.visit('/login');

    cy.get('[data-cy=emailInput]').as('email');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    cy.get('@email').type('uplog@gmail.com');
    cy.get('@passwordInput').type('q1w2e3r$');
    cy.get('[data-cy=LoginButton]').click();

    cy.visit('/mypage');
  });

  it('사용자는 프로필 수정을 한다.', () => {
    // when - 사용자는 이름, 닉네임을 바꾼다.
    cy.get('[data-cy=newNameInput]').as('newName');
    cy.get('[data-cy=newNicknameInput]').as('newNickname');
    cy.get('[data-cy=saveButton]').as('saveButton');

    cy.get('@newName').type('하이');
    cy.get('@newNickname').type('마트');
    cy.get('@saveButton').click();

    // then - 프로필 변경 완료가 뜬다.
    cy.get('.ant-message-success').contains('프로필 변경 완료!');
  });

  it('아무것도 변경하지 않고 프로필 수정을 하면 경고가 뜬다.', () => {
    // when - 그냥 저장 버튼을 누른다.
    cy.get('[data-cy=saveButton]').as('saveButton');
    cy.get('@saveButton').click();

    // then - 경고가 뜬다.
    cy.get('.ant-message-warning').contains('프로필 수정을 해주세요.');
  });

  it('비밀번호 변경 모달을 띄우고 비밀번호를 변경한다.', () => {
    // when - 비밀번호 변경 모달을 누르고 현재 비밀번호와 새로운 비밀번호를 입력한다.
    cy.get('[data-cy=pwChangeButton]').click();

    cy.get('[data-cy=nowPasswordInput]').as('nowPassword');
    cy.get('[data-cy=newPasswordInput]').as('newPassword');
    cy.get('@nowPassword').type('q1w2e3r$');
    cy.get('@newPassword').type('q1w2e3r$5%');

    cy.get('[data-cy=changePasswordButton]').click();

    // then - 비밀번호가 성공적으로 바뀐다.
    cy.get('.ant-message-success').contains('비밀번호 변경 완료!');
  });

  it('현재 비밀번호 틀린다.', () => {
    // when - 비밀번호 변경 모달을 누르고 현재 비밀번호에 틀린 비밀번호를 입력한다.
    cy.get('[data-cy=pwChangeButton]').click();

    cy.get('[data-cy=nowPasswordInput]').as('nowPassword');
    cy.get('[data-cy=newPasswordInput]').as('newPassword');
    cy.get('@nowPassword').type('1234');
    cy.get('@newPassword').type('q1w2e3r$5%');

    cy.get('[data-cy=changePasswordButton]').click();

    // then - 현재 비밀번호가 틀렸다는 에러가 발생한다.
    cy.get('.ant-message-warning').contains('비밀번호가 일치하지 않습니다.');
  });

  it('새로운 비밀번호가 조건에 맞지 않는다.', () => {
    // when - 비밀번호 변경 모달을 누르고 새로운 비밀번호에 조건이 맞지 않는 비밀번호를 입력한다.
    cy.get('[data-cy=pwChangeButton]').click();

    cy.get('[data-cy=nowPasswordInput]').as('nowPassword');
    cy.get('[data-cy=newPasswordInput]').as('newPassword');
    cy.get('@nowPassword').type('q1w2e3r$');
    cy.get('@newPassword').type('q1w2e3');

    cy.get('[data-cy=changePasswordButton]').click();

    // then - 새로운 비밀번호를 사용하지 못한다는 에러가 발생한다.
    cy.get('.ant-message-warning').contains('올바른 새로운 비밀번호를 입력해주세요.');
  });

  it('계정 삭제 모달을 띄우고 계정 삭제를 한다.', () => {
    // when - 현재 비밀번호를 입력하고 계정을 삭제한다.
    cy.get('[data-cy=deleteAccountButton]').click();

    cy.get('[data-cy=nowPasswordInput]').as('nowPassword');
    cy.get('@nowPassword').type('q1w2e3r$');

    cy.get('[data-cy=changePasswordButton]').click();

    // then - 계정 탈퇴되고 "/" 경로로 간다.
    cy.url().should('include', 'http://localhost:3070/');
  });

  it('계정 삭제에서 현재 비밀번호가 틀란다.', () => {
    // when - 현재 비밀번호가 틀리게 입력된다.
    cy.get('[data-cy=deleteAccountButton]').click();

    cy.get('[data-cy=nowPasswordInput]').as('nowPassword');
    cy.get('@nowPassword').type('1234');

    cy.get('[data-cy=changePasswordButton]').click();

    // then - 현재 비빌번호가 틀렸다는 메시지가 뜬다.
    cy.get('.ant-message-warning').contains('비밀번호가 일치하지 않습니다.');
  });
});
