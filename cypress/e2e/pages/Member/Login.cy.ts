describe('로그인 테스트', () => {
  // given - 회원가입 페이지에 접근한다
  beforeEach(() => {
    cy.visit('/login');
  });

  it('사용자는 로그인을 한다.', () => {
    // when - 로그인 조건 확인
    cy.get('[data-cy=emailInput]').as('email');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    cy.get('@email').type('uplog@gmail.com');
    cy.get('@passwordInput').type('q1w2e3r$');
    cy.get('[data-cy=LoginButton]').click();

    // then - 로그인에 성공하고 제품 페이지로 이동한다
    cy.url().should('include', 'http://localhost:3070/workspace');
  });

  it('이메일 입력하지 않은 경우', () => {
    cy.get('[data-cy=emailInput]').as('email');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    // when - 이메일만 입력 안했을때
    cy.get('@passwordInput').type('q1w2e3r$');
    cy.get('[data-cy=LoginButton]').click();

    // then - 이메일 입력하란 경고 뜸
    cy.get('.ant-message-warning').contains('이메일을 입력해주세요.');
  });

  it('비밀번호 입력하지 않은 경우', () => {
    cy.get('[data-cy=emailInput]').as('email');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    // when - 비밀번호만 입력 안했을때
    cy.get('@email').type('uplog@gmail.com');
    cy.get('[data-cy=LoginButton]').click();

    // then - 비밀번호 입력하란 경고 뜸
    cy.get('.ant-message-warning').contains('비밀번호를 입력해주세요.');
  });

  it('이메일 비밀번호 모두 입력하지 않은 경우', () => {
    cy.get('[data-cy=emailInput]').as('email');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    // when - 이메일만 입력 안했을때
    cy.get('[data-cy=LoginButton]').click();

    // then - 이메일 입력하란 경고 뜸
    cy.get('.ant-message-warning').contains('이메일과 비밀번호를 입력해주세요.');
  });

  it('로그인 정보 잘못 입력했을 경우', () => {
    cy.get('[data-cy=emailInput]').as('email');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    // when - 잘못 입력했을
    cy.get('@email').type('uplog@gmail.com');
    cy.get('@passwordInput').type('1234');
    cy.get('[data-cy=LoginButton]').click();

    // then - 잘못입력 경고
    cy.get('.ant-message-error').contains('아이디 또는 비밀번호를 잘못 입력하셨습니다.');
  });
});
