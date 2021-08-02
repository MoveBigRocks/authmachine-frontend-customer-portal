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