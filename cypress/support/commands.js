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
Cypress.Commands.add('fillMandatoryFieldAndSubmit',  user => { 
    
    cy.get('#firstName').type(user.primeiroNome)
    cy.get('#lastName').type(user.sobreNome)
    cy.get('#email').type(user.email) 
    cy.pickRandomOption()
    cy.get('#open-text-area').type(user.descriacaoTexto)

    cy.get('button[type="submit"]').as('button').click()
    
 })


 Cypress.Commands.add('pickRandomOption', () => {

  const selectElement = cy.get('select').as('select');

  selectElement
  .find('option') // Encontra todas as opções
  .then(($options) => {
    const randomIndex = Math.floor(Math.random() * $options.length); // Gera um índice aleatório
    const randomValue = $options[randomIndex].value; // Obtém o valor da opção aleatória
    
    
    cy.get('@select')
    .invoke('show')
    .select(randomValue); // Seleciona a opção aleatória
  });   

 })

Cypress.Commands.add('fillMandatoryFieldAndSubmitStandard',  (user = {
    primeiroNome: 'John',
    sobreNome: 'Brown',
    email: '2Ht4x@example.com',
    descriacaoTexto: 'Teste'
}) => {  
    cy.get('#firstName').type(user.primeiroNome)
    cy.get('#lastName').type(user.sobreNome)
    cy.get('#email').type(user.email)
    cy.get('#open-text-area').type(user.descriacaoTexto)   
    cy.get('button[type="submit"]').as('button').click()
    
 })
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