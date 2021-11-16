/// <reference types='cypress'>

describe('Home page', () => {
  it('renders properly', () => {
    cy.visit('/')
    cy.contains('.MuiButton-label', 'Home').should('be.visible')
    cy.contains('.MuiButton-label', 'Stock').should('be.visible')
    cy.contains('.MuiButton-label', 'Crypto').should('exist')
    cy.contains('.MuiButton-label', 'Log In').should('exist')
    cy.contains('.MuiButton-label', 'Sign Up').should('exist')
    cy.contains('.MuiButton-label', 'Get Started').should('exist')
    cy.contains('.MuiButton-label', 'Get Started').click()
    // cy.contains('.makeStyles-primary-71', 'STOCKPILOT').should('exist')
    cy.get("img[alt='top']")
      .should('exist')
      .click()
    cy.contains('.MuiButton-label', 'Home').should('be.visible')
  })
})
