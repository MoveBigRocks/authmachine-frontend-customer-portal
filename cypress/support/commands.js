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
// cypress/support/commands.js
const { MailSlurp } = require("mailslurp-client");

const apiKey = "6cc35168df60d5d0b2a16d2aeec44dbf46bd32479326d9e726840ce6e380b920";
const mailslurp = new MailSlurp({ apiKey });

Cypress.Commands.add("createInbox", () => {
    return mailslurp.createInbox();
  });
  
  Cypress.Commands.add("waitForLatestEmail", (inboxId) => {
    return mailslurp.waitForLatestEmail(inboxId);
  });

  import 'cypress-file-upload';