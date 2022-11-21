import cypress from "cypress"

describe('login', () => {
  beforeEach(() => {
    cy.visit('http://localhost:5173')
  })
  it('passes', () => {
    cy.url().should('equal', 'http://localhost:5173/#/signin')
  })
  it('login', () => {
    cy.get('form').within(() => {
      cy.get('input:first').type('hello')
      cy.get('input:last').type('hello')
    })
    cy.get('.el-button--primary').click()
    cy.url().should('equal', 'http://localhost:5173/#/')
  })

})