describe('Login Page', () => {
  const TEST_CREDENTIALS = {
    validUsername: 'standard_user',
    validPassword: 'secret_sauce',
  };

  const ROUTES = {
    login: '/',
    dashboard: '/inventory.html',
  };

  const SELECTORS = {
    form: 'form',
    inputs: {
      username: '[data-test="username"]',
      password: '[data-test="password"]',
    },
  };

  beforeEach(() => {
    cy.visit(ROUTES.login);
  });

  const fillLoginForm = (username, password) => {
    cy.get(SELECTORS.form).within(() => {
      cy.get(SELECTORS.inputs.username).type(username);
      cy.get(SELECTORS.inputs.password).type(password);
    });
  };

  const submitForm = () => {
    cy.get(SELECTORS.form).submit();
  };

  const assertRedirectToDashboard = () => {
    const expectedUrl = `${Cypress.config().baseUrl}${ROUTES.dashboard}`;
    cy.url().should('eq', expectedUrl);
  };

  describe('Form Structure', () => {
    it('should display a single form with required input fields', () => {
      cy.get(SELECTORS.form)
        .should('have.length', 1)
        .within(() => {
          cy.get(SELECTORS.inputs.username).should('have.length', 1);
          cy.get(SELECTORS.inputs.password).should('have.length', 1);
        });
    });
  });

  describe('Form Submission', () => {
    it('should redirect to dashboard when submitted with valid credentials', () => {
      fillLoginForm(
        TEST_CREDENTIALS.validUsername,
        TEST_CREDENTIALS.validPassword
      );
      submitForm();
      assertRedirectToDashboard();
    });
  });
});
