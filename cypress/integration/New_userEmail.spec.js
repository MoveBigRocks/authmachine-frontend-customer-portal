describe("Sign up", () => {
    it("can load oauth demo site", () => {
      cy.visit("https://auth.openunited.com/")
      cy.contains("Register");
    })
  
    it("can click sign up link", () => {
      
      cy.get('.auth-form').find('.ant-form').find('a').eq(1).click()
      cy.contains("Sign In")
    })
  
  const username = "plain-storage"
  let inboxId;
  let emailAddress;
  
  it("can generate a new email address and sign up", () => {
    // see commands.js custom commands
    cy.createInbox().then((inbox) => {
      // verify a new inbox was created
      assert.isDefined(inbox);
  
      // save the inboxId for later checking the emails
      inboxId = inbox.id;
      emailAddress = inbox.emailAddress;
  
      // sign up with inbox email address and the password
      cy.get(".auth-form").find('.ant-form-item-control-input-content').find('.ant-input').eq(0).type(username)
      cy.get(".auth-form").find('.ant-form-item-control-input-content').find('.ant-input').eq(0).should('not.have.text', ' ')
      cy.get(".auth-form").find('.ant-form-item-control-input-content').find('.ant-input').eq(1).type(emailAddress)
      cy.get(".auth-form").find('.ant-form-item-control-input-content').find('.ant-input').eq(1).should('not.have.text', ' ')
      cy.get('.ant-form').find('.ant-form-item-control-input').find('button').click();
    })
  })
  let code;
  it("can receive the confirmation email and extract the code", () => {
    // wait for an email in the inbox
    cy.waitForLatestEmail(inboxId).then((email) => {
      // verify we received an email
      assert.isDefined(email)
  
      // verify that email contains the code
      assert.strictEqual(/verification code is/.test(email.body), true)
      var x = email.body
      var num = x.replace(/[^0-9]/g,'')
      code = num.substring(0,6)
      
    })
  })
  it("can enter confirmation code and confirm user", () => {
    assert.isDefined(code)
    
    cy.get('.ant-input').eq(0).type(code)
    cy.get('.ant-input').eq(0).should('not.have.text', ' ')
    cy.get('.ant-form').find('button').click()
    cy.get('.ant-form').find('button').should('not.have.text', ' ')
  })
  it("can log in with confirmed account", () => {
    cy.contains("Email verified! Please set your username and password.")
    // fill out username (email) and password
    cy.get('.ant-input').eq(0).type('pbazngeqadfu2')    // change user name
    cy.get('.ant-input').eq(0).should('not.have.text', ' ')
    cy.get('.ant-input').eq(1).type('admin12345')
    cy.get('.ant-input').eq(1).should('not.have.text', ' ')
    cy.get('.ant-input').eq(2).type('admin12345')
    cy.get('.ant-input').eq(2).should('not.have.text', ' ')
    // submit
    cy.get('.ant-form-item-control-input-content').find('button').click()
    cy.contains('My Profile')
  })
  it("can change password", () => {
    cy.contains('Change Password')
    cy.get('.ant-layout-sider-children').find('.ant-menu-item').eq(4).click()
    cy.contains('Old Password')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(0).type('admin12345')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(0).should('not.have.text', ' ')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(1).type('world12345')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(1).should('not.have.text', ' ')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(2).type('world12345')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(2).should('not.have.text', ' ')
    cy.get('.ant-form').find('button').click()
  })
  
  it("can update profile and upload file", () => {
    const filepath = 'images/burger'
    cy.get('.ant-layout-sider-children').find('.ant-menu-item').eq(1).click()
    cy.contains('Edit')
    cy.get('.ant-row').find('button').click()
    cy.get('.avatar-container').find('button').attachFile(filepath)
    cy.get('.ant-form-item-control-input-content').find('#email').type('test@gmail.com')
    cy.get('.ant-form-item-control-input-content').find('#email').should('not.have.text', ' ')
    cy.get('.ant-form-item-control-input-content').find('#username').type('testuser')
    cy.get('.ant-form-item-control-input-content').find('#username').should('not.have.text', ' ')
    cy.get('.ant-form-item-control-input-content').find('#fullName').type('testfullname')
    cy.get('.ant-form-item-control-input-content').find('#fullName').should('not.have.text', ' ')
    cy.get('.ant-form-item-control-input-content').find('#nickName').type('nickName')
    cy.get('.ant-form-item-control-input-content').find('#nickName').should('not.have.text', ' ')
    cy.get('.ant-form').find('button').eq(4).click()
  })
  
  it("Test Logout", () => {
    cy.get('.ant-layout-header').find('button').click()
  })
  })