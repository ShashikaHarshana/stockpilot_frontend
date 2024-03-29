describe('Home page', () => {
  it('renders and functions properly', () => {
    cy.visit('/sign_up')
    cy.get("[class='MuiTypography-root MuiTypography-h4']").should('be.visible')
    cy.get("input[name='firstName']").type('Test')
    cy.get("input[name='lastName']").type('123')
    cy.get("input[name='email']").type('Test123@gmail.com')
    cy.get("input[name='password']").type('pass123456')
    cy.contains('.MuiButton-label', 'Sign Up').click()
    cy.contains('.MuiAlert-message', 'Email already inuse').should('be.visible')
    cy.get("input[name='email']").type('Test123@gmail.com')
    cy.get("input[name='password']").type('pass123456')
    cy.contains('.MuiButton-label', 'Login').click()
    cy.contains('.MuiButton-label', 'Get Started').should('exist')
  })
})
