/// <reference types="cypress" />

context('WPE Headless', () => {
    describe('settings headers', () => {
        beforeEach(() => {
            cy.login()
            .wait(1000)
            .visitHeadlessSettings()
        })

        it('will display the settings page header', () => {
            cy.get('h1').invoke('html').should('eq', 'Headless by WP&nbsp;Engine')
            cy.get('h2.main').should('have.text', 'Headless Settings')
        })
    })

    describe('default settings field values', () => {
        before(() => {
            cy.resetHeadlessSettings()
        })

        beforeEach(() => {
            cy.login()
            .wait(1000)
            .visitHeadlessSettings()
        })

        it('will have a default settings', () => {
            cy.get('#frontend_uri').should('have.value', '')
            cy.get('#secret_key').should('not.have.value', '')
            cy.get('#menu_locations').should('have.value', 'Primary, Footer')
            cy.get('#disable_theme').should('be.checked')
            cy.get('#enable_rewrites').should('be.checked')
            cy.get('#enable_redirects').should('be.checked')
        })
    })
})