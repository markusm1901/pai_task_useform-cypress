describe('Form Functionality', () => {
  beforeEach(() => {
    cy.visit('http://localhost:3000'); 
    cy.window().then((win) => {
      cy.stub(win.console, 'log').as('consoleLog'); 
    });
  });

  it('should submit the form with all fields filled', () => {
    cy.get('input[name="name"]').type('asdf');
    cy.get('input[name="surname"]').type('asdf');
    cy.get('input[type="checkbox"][name="checked"]').check();
    cy.get('select[name="dropdown"]').select('2');
    cy.get('input[type="radio"][value="1"]').check();

    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).not.to.contains('Form data is not complete, please fill all inputs');
    });

    cy.get('@consoleLog').should('be.calledWithMatch', {
      name: 'John',
      surname: 'Doe',
      checked: true,
      dropdown: '2',
      radio: '1'
    });
  });

  it('should show alert when form is not completely filled', () => {
    cy.get('input[name="name"]').type('John');
    cy.get('button[type="submit"]').click();

    cy.on('window:alert', (txt) => {
      expect(txt).to.contains('Form data is not complete, please fill all inputs');
    });
  });

  it('should clear the form', () => {
    cy.get('input[name="name"]').type('asdf');
    cy.get('input[name="surname"]').type('asdf');
    cy.get('input[type="checkbox"][name="checked"]').check();
    cy.get('select[name="dropdown"]').select('2');
    cy.get('input[type="radio"][value="1"]').check();

    cy.get('button[type="button"]').contains('Clear').click();

    cy.get('input[name="name"]').should('have.value', '');
    cy.get('input[name="surname"]').should('have.value', '');
    cy.get('input[type="checkbox"][name="checked"]').should('not.be.checked');
    cy.get('select[name="dropdown"]').should('have.value', '1');
    cy.get('input[type="radio"][value="1"]').should('not.be.checked');
    cy.get('input[type="radio"][value="2"]').should('not.be.checked');
    cy.get('input[type="radio"][value="3"]').should('not.be.checked');
  });

  it('should confirm before clearing the form', () => {
    cy.get('input[name="name"]').type('asdf');
    cy.get('input[name="surname"]').type('asdf');
    cy.get('input[type="checkbox"][name="checked"]').check();
    cy.get('select[name="dropdown"]').select('2');
    cy.get('input[type="radio"][value="1"]').check();

    cy.window().then((win) => {
      cy.stub(win, 'confirm').returns(false);
    });

    cy.get('button[type="button"]').contains('Clear').click();
    cy.get('input[name="name"]').should('have.value', 'asdf');
    cy.get('input[name="surname"]').should('have.value', 'asdf');

    cy.window().then((win) => {
      win.confirm.returns(true);
    });

    cy.get('button[type="button"]').contains('Clear').click();
    cy.get('input[name="name"]').should('have.value', '');
    cy.get('input[name="surname"]').should('have.value', '');
  });
});