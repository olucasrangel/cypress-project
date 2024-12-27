describe('Login Page', () => {
  const formFields = {
    username: '[data-test="username"]',
    password: '[data-test="password"]',
  };

  beforeEach(() => {
    cy.visit('/');
  });

  it('has a form with email and password fields', () => {
    cy.get('form')
      .should('exist')
      .within(() => {
        cy.get(formFields.username).should('exist');
        cy.get(formFields.password).should('exist');
      });
  });

  it('submits the form and redirects to the dashboard', () => {
    cy.get('form')
      .within(() => {
        cy.get(formFields.username).type('standard_user');
        cy.get(formFields.password).type('secret_sauce');
      })
      .submit();

    cy.url().should('eq', `${Cypress.config().baseUrl}/inventory.html`);
  });
});
