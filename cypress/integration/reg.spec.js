describe("Sign up", () => {
    it("can load oauth site", () => {
        cy.visit("https://auth.openunited.com/")
        cy.contains("Register");
    });
    it("can click sign up link", () => {
        cy.get('.auth-form').find('.ant-form').find('a').eq(1).click()
        cy.contains("Sign In")
      });
      const username = "Test_Authmachine"
      let inboxId;
      let emailAddress;
      let name;
      
    it("can generate a new email address and sign up", () => {
        // see commands.js custom commands
        cy.createInbox().then((inbox) => {
          // verify a new inbox was created
          assert.isDefined(inbox);
      
          // save the inboxId for later checking the emails
          inboxId = inbox.id;
          emailAddress = inbox.emailAddress;
          var newStr = emailAddress.replace(/-/g, "");
          name = newStr.substr(0, newStr.indexOf('@'));
         
      
          // sign up with inbox email address and the password
          cy.get(".auth-form").find('.ant-form-item-control-input-content').find('.ant-input').first().type(username)
          cy.get(".auth-form").find('.ant-form-item-control-input-content').find('.ant-input').first().should("have.value", username)
          cy.get(".auth-form").find('.ant-form-item-control-input-content').find('.ant-input').eq(1).type(emailAddress)
          cy.get(".auth-form").find('.ant-form-item-control-input-content').find('.ant-input').eq(1).should('have.value', emailAddress)
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
    //assert.isDefined(code)
    let first_index = code;
    let first_result = first_index.substring(0,1)
    cy.get('.ant-input').first().type(first_result)
    cy.get('.ant-input').first().should('have.value',first_result)
    let second_result = first_index.substring(1,2)
    cy.get('.ant-input').eq(1).type(second_result)
    cy.get('.ant-input').eq(1).should('have.value',second_result)
    let third_result = first_index.substring(2,3)
    cy.get('.ant-input').eq(2).type(third_result)
    cy.get('.ant-input').eq(2).should('have.value',third_result)
    let fourth_result = first_index.substring(3,4)
    cy.get('.ant-input').eq(3).type(fourth_result)
    cy.get('.ant-input').eq(3).should('have.value',fourth_result)
    let fifth_result = first_index.substring(4,5)
    cy.get('.ant-input').eq(4).type(fifth_result)
    cy.get('.ant-input').eq(4).should('have.value',fifth_result)
    let six_result = first_index.substring(5,6)
    cy.get('.ant-input').eq(5).type(six_result)
    cy.get('.ant-input').eq(5).should('have.value',six_result)
    cy.get('.ant-form').find('button').click()
    
  })
  it("can log in with confirmed account", () => {
    cy.contains("Email verified! Please set your username and password.")
    // fill out username (email) and password
    cy.get('.ant-input').first().type(name)    // change user name
    cy.get('.ant-input').first().should('have.value', name)
    cy.get('.ant-input').eq(1).type('admin12345')
    cy.get('.ant-input').eq(1).should('have.value', 'admin12345')
    cy.get('.ant-input').eq(2).type('admin12345')
    cy.get('.ant-input').eq(2).should('have.value', 'admin12345')
    // submit
    cy.get('.ant-form-item-control-input-content').find('button').click()
    cy.contains('My Profile')
   })
  it("can change password", () => {
    cy.contains('Change Password')
    cy.get('.ant-layout-sider-children').find('.ant-menu-item').eq(4).click()
    cy.contains('Old Password')
    cy.get('.ant-form').find('.ant-form-item-control-input').first().type('admin12345')
    cy.get('.ant-form').find('.ant-form-item-control-input').first().should('have.value', 'admin12345')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(1).type('world12345')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(1).should('have.value', 'world12345')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(2).type('world12345')
    cy.get('.ant-form').find('.ant-form-item-control-input').eq(2).should('have.value', 'world12345')
    cy.get('.ant-form').find('button').click()
  })
  
  it("can update profile and upload file", () => {
    const filepath = 'Images/burger'
    cy.get('.ant-layout-sider-children').find('.ant-menu-item').eq(1).click()
    cy.contains('Edit')
    cy.get('.ant-row').find('button').click()
    cy.get('.avatar-container').find('button').attachFile(filepath)
    cy.get('.ant-form-item-control-input-content').find('#email').type('test@gmail.com')
    cy.get('.ant-form-item-control-input-content').find('#email').should('have.value', 'test@gmail.com')
    cy.get('.ant-form-item-control-input-content').find('#username').type('testuser')
    cy.get('.ant-form-item-control-input-content').find('#username').should('have.value', 'testuser')
    cy.get('.ant-form-item-control-input-content').find('#fullName').type('testfullname')
    cy.get('.ant-form-item-control-input-content').find('#fullName').should('have.value', 'testfullname')
    cy.get('.ant-form-item-control-input-content').find('#nickName').type('nickName')
    cy.get('.ant-form-item-control-input-content').find('#nickName').should('have.value', 'nickName')
    cy.get('.ant-form').find('button').eq(4).click()
  })
  
  it("Test Logout", () => {
    cy.get('.ant-layout-header').find('button').click()
  })
  });