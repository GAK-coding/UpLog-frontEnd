describe('회원가입 테스트', () => {
  // given - 회원가입 페이지에 접근한다
  beforeEach(() => {
    cy.visit('/signup');
  });

  it('사용자는 회원가입한다', () => {
    // when - 회원가입 조건 확인
    cy.get('[data-cy=nameInput]').as('name');
    cy.get('[data-cy=nicknameInput]').as('nickname');
    cy.get('[data-cy=emailInput]').as('email');
    cy.get('[data-cy=authInput]').as('auth');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    cy.get('@name').type('권오현');
    cy.get('@nickname').type('오리');
    cy.get('@email').type('uplog@gmail.com');
    cy.get('[data-cy=authButton]').click();
    cy.get('@auth').type('abcdef');
    cy.get('[data-cy=authButton]').click();
    cy.get('@passwordInput').type('q1w2e3r$');
    cy.get('[data-cy=singUpButton]').click();

    // then - 회원가입에 성공하고 로그인 페이지로 이동한다
    cy.get('[data-message=error-password]').should('not.exist');
    cy.get('.ant-message-success').should('exist');
    cy.url().should('include', 'http://localhost:3070/');
  });

  it('비밀번호 조건이 안맞고 인증번호가 안맞는 경우', () => {
    // when - 비밀번호 조건 & 인증번호 확인
    cy.get('[data-cy=nameInput]').as('name');
    cy.get('[data-cy=nicknameInput]').as('nickname');
    cy.get('[data-cy=emailInput]').as('email');
    cy.get('[data-cy=authInput]').as('auth');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    cy.get('@name').type('권오현');
    cy.get('@nickname').type('오리');
    cy.get('@email').type('uplog@gmail.com');
    cy.get('[data-cy=authButton]').click();
    cy.get('@auth').type('abc');
    cy.get('@passwordInput').type('password');
    cy.get('[data-cy=authButton]').click();
    cy.get('[data-cy=singUpButton]').click();

    // then - 회원가입 버튼이 활성화되어 회원가입에 성공하고 로그인 페이지로 이동한다
    cy.get('[data-message=error-password]').should('exist');
    cy.get('.ant-message-warning').should('exist');
    cy.get('.ant-message-warning').contains('인증번호가 일치하지 않습니다.');
    cy.get('.ant-message-warning').contains('인증번호 확인을 해주세요.');
  });

  it('아이디가 중복된 경우', () => {
    // when - 비밀번호 조건 & 인증번호 확인
    cy.get('[data-cy=nameInput]').as('name');
    cy.get('[data-cy=nicknameInput]').as('nickname');
    cy.get('[data-cy=emailInput]').as('email');
    cy.get('[data-cy=authInput]').as('auth');
    cy.get('[data-cy=passwordInput]').as('passwordInput');

    cy.get('@name').type('권오현');
    cy.get('@nickname').type('오리');
    cy.get('@email').type('abc@gmail.com');
    cy.get('[data-cy=authButton]').click();
    cy.get('@auth').type('abcdef');
    cy.get('[data-cy=authButton]').click();
    cy.get('@passwordInput').type('q1w2e3r$');
    cy.get('[data-cy=singUpButton]').click();

    // then - 회원가입 버튼이 활성화되어 회원가입에 성공하고 로그인 페이지로 이동한다
    cy.get('[data-message=error-password]').should('not.exist');
    cy.get('.ant-message-warning').contains('이미 존재하는 회원입니다.');
  });
});
