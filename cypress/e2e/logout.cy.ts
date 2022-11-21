describe('logout', () => {
  beforeEach(() => {
    window.sessionStorage.setItem('username', 'hello')
    cy.visit('http://localhost:5173')
  })
  
  it('logout', () => {
    cy.get('.logout').click()
    expect(cy.contains('Sign in')).not.be.null
  })
  
})