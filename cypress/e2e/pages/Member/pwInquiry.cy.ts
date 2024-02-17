describe('비밀번호 찾 테스트', () => {
  // given - 비밀번호 찾기 페이지에 접근한다
  beforeEach(() => {
    cy.visit('/pwinquiry');
  });

  it('사용자는 비밀번호를 찾는다.', () => {
    // when - 비밀번호 입력
    cy.get('[data-cy=emailInput]').as('emailInput');
    cy.get('[data-cy=submitButton]').as('submitButton');

    cy.get('@emailInput').type('uplog@gmail.com');
    cy.get('@submitButton').click();

    // then - 이메일에 임시 비밀번호가 전송
    cy.get('.ant-message-success').contains('이메일에 임시 비밀번호가 전송되었습니다.');
  });

  it('사용자는 유효하지 않은 이메일을 입력한다.', () => {
    // when - 비밀번호 입력
    cy.get('[data-cy=emailInput]').as('emailInput');
    cy.get('[data-cy=submitButton]').as('submitButton');

    cy.get('@emailInput').type('1234');
    cy.get('@submitButton').click();

    // then - 이메일에 임시 비밀번호가 전송
    cy.get('.ant-message-warning').contains('이메일이 유효하지 않습니다.');
  });

  it('사용자는 이메일을 잘못 입력한다.', () => {
    // when - 비밀번호 입력
    cy.get('[data-cy=emailInput]').as('emailInput');
    cy.get('[data-cy=submitButton]').as('submitButton');

    cy.get('@emailInput').type('abc@gmail.com');
    cy.get('@submitButton').click();

    // then - 이메일에 임시 비밀번호가 전송
    cy.get('.ant-message-warning').contains('해당 이메일은 존재하지 않습니다.');
  });
});
