/// <reference types='cypress'>

describe('Stock page', () => {
  beforeEach(() => {
    cy.visit('/analyze/stock')
  })
  it('renders and works properly', () => {
    cy.get(
      "[class='MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input']"
    ).should('be.visible')
    cy.get(
      "[class='MuiSelect-root MuiSelect-select MuiSelect-selectMenu MuiInputBase-input MuiInput-input']"
    )
      .should('be.visible')
      .click()

    cy.contains('li', 'MSFT').click()
    cy.contains('li', 'MSFT').should('not.be.visible')
  })
  it('changes time correctly', () => {
    cy.contains('.MuiButton-label', '5m').should('exist')
    cy.contains('.MuiButton-label', '1h').should('exist')
    cy.contains('.MuiButton-label', '1d').should('exist')
  })
  it('should change indicators properly', () => {
    cy.get("img[alt='candleStick']").should('be.visible')
    cy.get("img[alt='indicators']").should('be.visible')
    cy.get("img[alt='indicators']").click()
    cy.contains('span', 'RSI').should('be.visible')
    cy.get("img[alt='candleStick']").click()
    cy.contains('span', 'MA').should('be.visible')
  })
})
