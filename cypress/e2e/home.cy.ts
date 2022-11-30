describe('home', () => {
  const username = 'hello'
  beforeEach(() => {
    window.sessionStorage.setItem('username', username)
    window.localStorage.setItem('token', `eyJhbGciOiJSUzI1NiIsInR5cCIgOiAiSldUIiwia2lkIiA6ICJkZDg1ZUhwemRxSDFRRVRzTGh2MFo3cXZTZG9kY04xVXVseF8yM0VHcWpvIn0.eyJleHAiOjE2Njk4NTMyMzgsImlhdCI6MTY2OTgxNzIzOCwianRpIjoiZjEwZmY4NjgtYWRiMC00NDE2LWIyYzAtNjBlYzU5MDVjMDIyIiwiaXNzIjoiaHR0cDovL2xvY2FsaG9zdDo4MDgwL3JlYWxtcy9ib2FyZCIsImF1ZCI6ImFjY291bnQiLCJzdWIiOiIyZWVlZWZmYy04YmJjLTQ1NzYtODA1NC04ZDVkNDZlOGI3ZmUiLCJ0eXAiOiJCZWFyZXIiLCJhenAiOiJoZWxsb2lkIiwic2Vzc2lvbl9zdGF0ZSI6ImM2ZTgwNDM1LWZlZTgtNGVlMS1iNzY0LWY0YTk5ZTg4M2E2NyIsImFjciI6IjEiLCJyZWFsbV9hY2Nlc3MiOnsicm9sZXMiOlsibWFuYWdlLXJlYWxtIiwib2ZmbGluZV9hY2Nlc3MiLCJ1bWFfYXV0aG9yaXphdGlvbiIsImRlZmF1bHQtcm9sZXMtYm9hcmQiXX0sInJlc291cmNlX2FjY2VzcyI6eyJhY2NvdW50Ijp7InJvbGVzIjpbIm1hbmFnZS1hY2NvdW50IiwibWFuYWdlLWFjY291bnQtbGlua3MiLCJ2aWV3LXByb2ZpbGUiXX19LCJzY29wZSI6InByb2ZpbGUgZW1haWwiLCJzaWQiOiJjNmU4MDQzNS1mZWU4LTRlZTEtYjc2NC1mNGE5OWU4ODNhNjciLCJlbWFpbF92ZXJpZmllZCI6ZmFsc2UsIm5hbWUiOiJoZWxsbyB3b3JsZCIsInByZWZlcnJlZF91c2VybmFtZSI6ImhlbGxvIiwiZ2l2ZW5fbmFtZSI6ImhlbGxvIiwiZmFtaWx5X25hbWUiOiJ3b3JsZCIsImVtYWlsIjoiMTJAZW1haWwuY29tIn0.QtvzmR7eezsGm5Baz5xQRoheYHDmo9bsViWorbJPIGjwwsuj9J9F4Wdf_-RraqI9FIgeOVk5QeQMw7Jeliz0lxEEq1BZaGaBZNqdAU9lJeW_O1dLDOJmsiHmXj0g2sRIK81_3YLeVog9XdivL8aBmcJooXnpiNm7xQ89QJ8doFMg84C7jEM2H_1dfG-dgqNzs3DQzJXALDH0c-Jox08RaAC0FiGRJj8xBCd5YzppKZDL8krfabF7iurxgEua1ZwaVsANGfVkfR5cRb4kc_pQ4knDm4yE1Zl4t3mk7-KhHIVQYiFlfVqjNyOm-Q5xoA5metXVUQxya_WRwR48XV9MGg`)
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