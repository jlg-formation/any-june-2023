describe('My First Test', () => {
  it('Visits the initial project page', () => {
    cy.visit('/');
    cy.contains('Gestion Stock');
    cy.contains('Mentions Légales');
    cy.contains('a', 'Voir le stock').click();
    cy.get('a[title="Ajouter"]').click();

    const uuid = () => Cypress._.random(0, 1e6);
    const id = uuid();
    const name = `outil-${id}`;
    cy.focused().clear().type(name);
    cy.get('input').eq(1).clear().type('1.23');
    cy.get('input').eq(2).clear().type('56');
    cy.contains('form button', 'Ajouter').click();
    cy.contains('tbody tr td', name).click();
    cy.get('button[title="Supprimer"]').click();
    cy.contains('tbody tr td', name).should('not.exist');
  });
});
