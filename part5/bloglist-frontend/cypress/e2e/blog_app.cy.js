describe('Blog app', () => {
  beforeEach(() => {
    cy.request('POST', 'http://localhost:3003/api/testing/reset')
    const user = {
      name: 'cypress',
      username: 'cypress',
      password: 'cypress'
    }
    cy.request('POST', 'http://localhost:3003/api/users/', user) 
    cy.visit('http://localhost:3000')
  })

  it('log in form is shown', () => {
    cy.contains('log in')
  })

  describe('Login', () => {
    it('succeeds with correct credentials', () => {
      cy.get('#username').type('cypress')
      cy.get('#password').type('cypress')
      cy.contains('login').click()
      cy.contains('cypress logged in')
    })

    it('fails with wrong credentials', () => {
      cy.get('#username').type('cypress')
      cy.get('#password').type('press')
      cy.contains('login').click()
      cy.get('#notification')
        .should('include.text', 'wrong username or password')
    })
  })

  describe('When logged in', () => {
    beforeEach(() => {
      cy.request('POST', 'http://localhost:3003/api/login', 
      {
        username: 'cypress',
        password: 'cypress'
      }).then(res => {
        localStorage.setItem('loggedBlogUser', JSON.stringify(res.body))
      })
      cy.visit('http://localhost:3000')
    })

    it('a blog can be created', () => {
      cy.create({
        title: 'A cypress blog',
        author: 'Cypress',
        url: 'www.cypress.io'
      })

      cy.contains('A cypress blog Cypress')
      cy.visit('http://localhost:3000')
    })

    it('a blog can be liked', () => {
      cy.create({
        title: 'A cypress blog',
        author: 'Cypress',
        url: 'www.cypress.io'
      })
      cy.contains('view').click()
      cy.contains('like').click()

      cy.contains('likes 1')
    })

    it('a blog can be deleted', () => {
      cy.create({
        title: 'A cypress blog',
        author: 'Cypress',
        url: 'www.cypress.io'
      })
      cy.visit('http://localhost:3000')
      cy.contains('view').click()
      cy.contains('delete').click()
      cy.contains('A cypress blog').should('not.exist')
    })

    it ('blogs are sorted by likes', () => {
      cy.create({
        title: 'A cypress blog',
        author: 'Cypress',
        url: 'www.cypress.io'
      })
      cy.create({
        title: 'A good blog',
        author: 'Cypress',
        url: 'www.cypress.io'
      })
      cy.create({
        title: 'A bad blog',
        author: 'Cypress',
        url: 'www.cypress.io'
      })

      cy.contains('A cypress blog').contains('view').click()
      cy.contains('A cypress blog').contains('like').click()
      cy.contains('A cypress blog').contains('hide').click()

      cy.contains('A good blog').contains('view').click()
      cy.contains('A good blog').contains('like').click()
      cy.contains('A good blog').contains('like').click()
      cy.contains('A good blog').contains('hide').click()

      cy.get('.blog').eq(0).should('contain', 'A good blog')
      cy.get('.blog').eq(1).should('contain', 'A cypress blog')
      cy.get('.blog').eq(2).should('contain', 'A bad blog')
    })

  })



})
