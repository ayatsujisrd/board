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
    cy.get('.el-textarea textarea').should('exist')
      .type('this is a message')
    cy.contains('confirm')
      .click()
    cy.get('.el-textarea textarea').should('not.exist')
    cy.wait('@addMessage')
    cy.get('.message-item').should('exist')
  })

  it('add reply', () => {
    cy.intercept('PUT', '/api/addReply').as('addReply')
    cy.contains('Reply').click()
    cy.get('.el-textarea textarea').type('this is a reply')
    cy.contains('confirm').click()
    cy.wait('@addReply')
    cy.contains('this is a reply').should('exist')
  })

  it('delete reply', () => {
    cy.intercept('DELETE', '/api/deleteReply').as('deleteReply')
    const $message = cy.get('.message-item').eq(0)
    const $reply = $message.get('.reply')
    $message.get('.reply .delete .el-button').eq(0).click()
    cy.wait('@deleteReply')
    $reply.should('not.exist')
  })

  it('delete message', () => {
    cy.intercept('DELETE', '/api/deleteMessage').as('deleteMessage')
    const $el = cy.get('.message-item').eq(0)
    $el.get('.delete').eq(0).click()

    cy.wait('@deleteMessage', { timeout: 15000 })
    $el.should('not.exist')
  })



})