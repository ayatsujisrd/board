describe('home', () => {
  const username = 'hello'
  beforeEach(() => {
    window.sessionStorage.setItem('username', username)
    cy.visit('http://localhost:5173')
  })

  it('avatar', () => {
    cy.get('.avatar').should('contain.text', username)
  })

  it('navbar click', () => {
    cy.get('.navbar .item.active').should('contain.text', 'Toys')
    cy.get('.navbar .item:last').click().should('have.class', 'active')
  })

  it('add message', () => {
    cy.intercept('PUT', '/api/addMessage').as('addMessage')
    cy.get('.el-button.fixed').click()
    cy.get('input').should('exist')
      .type('this is a message')
      .contains('confirm')
      .click()
    cy.get('input').should('not.exist')
    cy.wait('@addMessage')
    cy.get('.menu-item').should('exist')
  })

  it('add reply', () => {
    cy.intercept('PUT', '/api/addReply').as('addReply')
    cy.contains('Reply').click()
    cy.get('input').type('this is a reply')
    cy.contains('confirm').click()
    cy.wait('@addReply')
    cy.contains('this is a reply').should('exist')
  })

  it('delete reply', () => {
    cy.intercept('DELETE', '/api/deleteReply').as('deleteReply')
    cy.get('.reply .delete').click()
    cy.wait('@deleteReply')
    cy.get('.reply').should('not.exist')
  })

  it('delete message', () => {
    cy.intercept('DELETE', '/api/deleteMessage').as('deleteMessage')
    cy.get('.delete').click()
    cy.wait('@deleteMessage')
    cy.get('.menu-item').should('not.exist')
  })



})