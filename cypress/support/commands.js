// ***********************************************
// This example commands.js shows you how to
// create various custom commands and overwrite
// existing commands.
//
// For more comprehensive examples of custom
// commands please read more here:
// https://on.cypress.io/custom-commands
// ***********************************************
//
// -- This is a child command --
// Cypress.Commands.add("drag", { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add("dismiss", { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite("visit", (originalFn, url, options) => { ... })

Cypress.Commands.add('login', (username, password) => {
    cy.visit(
        Cypress.env('host') + '/wp-login.php'
    )
    .wait( 1000 )
    .get( '#user_login' ).type( 'admin' )
    .get( '#user_pass' ).type( 'password' )
    .get( '#wp-submit' ).click()
})

Cypress.Commands.add('visitHeadlessSettings', (username, password) => {
    cy.visit(
        Cypress.env( 'host' ) + '/wp-admin/options-general.php?page=wpe-headless-settings'
    )
})

Cypress.Commands.add('resetHeadlessSettings', (username, password) => {
    cy.exec('npm run wp-env run tests-cli wp plugin deactivate wpe-headless')
    .exec('npm run wp-env run tests-cli wp option delete wpe_headless')
    .exec('npm run wp-env run tests-cli wp plugin activate wpe-headless')
})