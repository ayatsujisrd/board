describe('test', () => {
  it('test', () => {
    cy.visit('https://example.cypress.io/')
    cy.get('.navbar').should('exist')
  })
})