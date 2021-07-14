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
//
// -- This is a parent command --
// Cypress.Commands.add('login', (email, password) => { ... })
//
//
// -- This is a child command --
// Cypress.Commands.add('drag', { prevSubject: 'element'}, (subject, options) => { ... })
//
//
// -- This is a dual command --
// Cypress.Commands.add('dismiss', { prevSubject: 'optional'}, (subject, options) => { ... })
//
//
// -- This will overwrite an existing command --
// Cypress.Commands.overwrite('visit', (originalFn, url, options) => { ... })
const { MailSlurp } = require("mailslurp-client");

Cypress.Commands.add("createInbox", () => {
  // instantiate MailSlurp
  const mailslurp = new MailSlurp({ apiKey: Cypress.env("a8b2715e2987720256902c3e7627055a55efd8cca346ceb7238c46e884914cb2") });
  // return { id, emailAddress } or a new randomly generated inbox
  return mailslurp.createInbox();
});