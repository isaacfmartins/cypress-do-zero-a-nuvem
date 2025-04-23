const { faker, base} = require('@faker-js/faker')

const user = {}

beforeEach(() => {

  cy.visit('./src/index.html')
  user.primeiroNome = faker.person.firstName()
  user.sobreNome = faker.person.lastName()
  user.email = faker.internet.email()
  user.descriacaoTexto = faker.lorem.sentence()
})


describe('Central de Atendimento ao Cliente TAT', () => {



  it('verifica o título da aplicação', () => {

    cy.title().should('eq', 'Central de Atendimento ao Cliente TAT');
    cy.get('#title').should('have.text', 'CAC TAT');


  })

  it('Preenchendo todos os campos obrigatórios', () => {
    
    const longText = user.descriacaoTexto.repeat(5)

    cy.clock()

    cy.get('#firstName').as('firstName')
    cy.get('#lastName').as('lastName')
    cy.get('#email').as('email')
    cy.get('#open-text-area').as('open-text-area')
    cy.get('@firstName').type(user.primeiroNome)
    cy.get('@lastName').type(user.sobreNome)
    cy.get('@email').type(user.email)
    cy.get('@open-text-area').type(longText, { delay: 0 })

    cy.get('button[type="submit"]').as('button')
    cy.get('@button').click()

    cy.get('span[class="success"] strong').as('mensagemSuccess')
    cy.get('@mensagemSuccess').should('be.visible')
    cy.get('@mensagemSuccess').should('have.text', 'Mensagem enviada com sucesso.');
    cy.tick(3000)
    cy.get('@mensagemSuccess').should('not.be.visible')

  })

  it('Preenchendo todos os campos obrigatórios com delay na mensagem', () => {

    cy.clock()
    cy.get('#firstName').as('firstName')
    cy.get('#lastName').as('lastName')
    cy.get('#email').as('email')
    cy.get('#open-text-area').as('open-text-area')
    cy.get('@firstName').type(user.primeiroNome)
    cy.get('@lastName').type(user.sobreNome)
    cy.get('@email').type(user.email)
    cy.get('@open-text-area').type(user.descriacaoTexto)
    cy.get('button[type="submit"]').as('button')
    cy.get('span[class="success"] strong').as('mensagemSuccess')
    cy.get('@button').click()

    cy.get('@mensagemSuccess').should('be.visible')
    cy.get('@mensagemSuccess').should('have.text', 'Mensagem enviada com sucesso.', { delay: 0 });
    cy.tick(3000) 
    cy.get('@mensagemSuccess').should('not.be.visible')

  })

  it('Preenchendo formulário com email invalido', () => {

    cy.clock()
    cy.get('#firstName').as('firstName')
    cy.get('#lastName').as('lastName')
    cy.get('#email').as('email')
    cy.get('#open-text-area').as('open-text-area')
    cy.get('@firstName').type(user.primeiroNome)
    cy.get('@lastName').type(user.sobreNome)
    cy.get('@email').type(user.primeiroNome)
    cy.get('@open-text-area').type(user.descriacaoTexto)
    cy.get('button[type="submit"]').as('button')
    cy.get('span[class="error"] strong').as('mensagemError')
    cy.get('@button').click()

    cy.get('@mensagemError').should('be.visible')
    cy.get('@mensagemError').should('have.text', 'Valide os campos obrigatórios!', { delay: 0 });
    cy.tick(3000)
    cy.get('@mensagemError').should('not.be.visible')

  })

  it('verifica se campo telefone aceita apenas número', () => {

    cy.clock()
    cy.get('#firstName').as('firstName')
    cy.get('#lastName').as('lastName')
    cy.get('#email').as('email')
    cy.get('#open-text-area').as('open-text-area')
    cy.get('@firstName').type(user.primeiroNome)
    cy.get('@lastName').type(user.sobreNome)
    cy.get('@email').type(user.email)
    cy.get('@open-text-area').type(user.descriacaoTexto)
    cy.get('button[type="submit"]').as('button')
    cy.get('span[class="error"] strong').as('mensagemError')
    cy.get('#phone').as('phone')
    cy.get('@phone').type('abc')
    cy.get('@phone').should('not.have.value', /^[A-Za-z]+$/).clear();
    cy.get('@button').click()

    cy.get('@mensagemError').should('exist')
    cy.get('@mensagemError').should('have.text', 'Valide os campos obrigatórios!', { delay: 0 });
    cy.tick(3000)
    cy.get('@mensagemError').should('not.be.visible')

  })

  it('verifica se telefone é obrigatório', () => {

    cy.clock()
    cy.get('#firstName').as('firstName')
    cy.get('#lastName').as('lastName')
    cy.get('#email').as('email')
    cy.get('#open-text-area').as('open-text-area')
    cy.get('@firstName').type(user.primeiroNome)
    cy.get('@lastName').type(user.sobreNome)
    cy.get('@email').type(user.email)
    cy.get('@open-text-area').type(user.descriacaoTexto)
    cy.get('#phone').as('phone')
    cy.get('#phone-checkbox').as('phone-checkbox')
    cy.get('@phone-checkbox').check()
    cy.get('@phone').type(' ')
    cy.get('@phone').should('not.have.value', /^[A-Za-z]+$/).clear();
    cy.get('button[type="submit"]').as('button')
    cy.get('@button').click()
    
    cy.get('span[class="error"] strong').as('mensagemError')
    cy.get('@mensagemError').should('be.visible')
    cy.get('@mensagemError').should('have.text', 'Valide os campos obrigatórios!', { delay: 0 });
    cy.tick(3000)
    cy.get('@mensagemError').should('not.be.visible')

  })
  it('verifica se preenche e limpa os campos nome, sobrenome, email e telefone', () => {

    cy.clock()
    cy.get('#firstName').as('firstName')
    cy.get('#lastName').as('lastName')
    cy.get('#email').as('email')
    cy.get('#open-text-area').as('open-text-area')
    cy.get('@firstName').type(user.primeiroNome)
    cy.get('@lastName').type(user.sobreNome)
    cy.get('@email').type(user.email)
    cy.get('@open-text-area').type(user.descriacaoTexto)
    cy.get('@firstName').should('have.value', (user.primeiroNome)).clear()
    .should('have.value', (''))
    cy.get('@lastName').should('have.value', (user.sobreNome)).clear()
    .should('have.value', (''))
    cy.get('@email').should('have.value', (user.email)).clear()
    .should('have.value', (''))
    cy.get('@open-text-area').should('have.value', (user.descriacaoTexto)).clear()
    .should('have.value', ('')) 
    cy.get('#phone').as('phone')
    cy.get('#phone-checkbox').as('phone-checkbox')
    cy.get('@phone-checkbox').check()
    cy.get('@phone').type(' ')
    cy.get('@phone').should('not.have.value', /^[A-Za-z]+$/).clear()
    .should('have.value', '');
    cy.get('button[type="submit"]').as('button')
    cy.get('@button').click()
    
    cy.get('span[class="error"] strong').as('mensagemError')
    cy.get('@mensagemError').should('be.visible')
    cy.get('@mensagemError').should('have.text', 'Valide os campos obrigatórios!', { delay: 0 });
    cy.tick(3000)
    cy.get('@mensagemError').should('not.be.visible')

  })

  it('verifica se exibe mensagem de erro ao enviar formulário com campos obrigatórios vazios', () => {
    cy.clock()
    cy.get('button[type="submit"]').as('button').click()
    
    cy.get('span[class="error"] strong').as('mensagemError')
    .should('be.visible')
    .should('have.text', 'Valide os campos obrigatórios!', { delay: 0 });
    cy.tick(3000)
    cy.get('span[class="error"] strong').as('mensagemError')
    .should('not.be.visible');

  })

  it('verifica se preenche usando Comandos Customizados', () => {
    cy.clock()
    cy.fillMandatoryFieldAndSubmit(user)
    cy.get('span[class="success"] strong').as('mensagemSuccess')
    .should('be.visible')
    .should('have.text', 'Mensagem enviada com sucesso.');
    cy.tick(3000)
    cy.get('span[class="success"] strong').as('mensagemSuccess')
    .should('not.be.visible');


  })

  it('verifica se preenche usando Contains', () => {
    cy.fillMandatoryFieldAndSubmitStandard()
    cy.contains('sucesso.')

  })

  it('Seleciona produto YouTube', () => { 
    
  
    cy.get('#firstName').type(user.primeiroNome)
    cy.get('#lastName').type(user.sobreNome)
    cy.get('#email').type(user.email)
    cy.get('#product').select('YouTube')
    cy.get('#product').should('have.value', 'youtube')
    cy.get('#open-text-area').type(user.descriacaoTexto)

    cy.get('button[type="submit"]').click()
  })
  
  it('Seleciona produto Mentoria', () => {
    cy.get('#firstName').type(user.primeiroNome)
    cy.get('#lastName').type(user.sobreNome)
    cy.get('#email').type(user.email)
    cy.get('#product').select('mentoria')
    cy.get('#product').should('have.value', 'mentoria')
    cy.get('#product').should('have.value', 'mentoria')
    cy.get('#open-text-area').type(user.descriacaoTexto)

    cy.get('button[type="submit"]').click()  
  })

  it('Seleciona produto Blog', () => {
    cy.get('#firstName').type(user.primeiroNome)
    cy.get('#lastName').type(user.sobreNome)
    cy.get('#email').type(user.email)    
    cy.get('#product').select(1)
    cy.get('#product').should('have.value', 'blog')
    cy.get('#open-text-area').type(user.descriacaoTexto)

    cy.get('button[type="submit"]').click()
  })

  it('Seeciona produto Aleatório', () => {
    cy.fillMandatoryFieldAndSubmit(user)
  })

  it('Verifica se o radiobutton "Feedback" foi marcado', () => {
    cy.get('input[type=radio][value="feedback"]').check()
    .should('be.checked')
  })

  it('Verifica se marca cada tipo de atendimento', () => {
    cy.get('input[type=radio]').each(($elementos) => {
        cy.wrap($elementos)
        .check()
        .should('be.checked')
    })

  })

  it('Verifica se o checkboxes foram marcados', () => {
    cy.get('input[type=checkbox]')
    .check()
    .should('be.checked')
    .last()
    .uncheck()
    .should('be.not.checked')
  })

  it('seleciona um arquivo da pasta fixtures', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json')
    .then(input => {
      expect(input[0].files[0].name).to.eq('example.json')
    })
  })

  it('seleciona um arquivo da simulando um drag-and-drop', () => {
    cy.get('input[type="file"]').selectFile('cypress/fixtures/example.json', {action: 'drag-drop'})
    .then(input => {
      expect(input[0].files[0].name).to.eq('example.json')
    })
  })

  it('seleciona um arquivo utilizando uma fixture para a qual foi dada um alias', () => {
    cy.fixture('example.json', null).as('exampleFile'); 

    cy.get('input[type="file"]').selectFile('@exampleFile')
    .then(input => {
      expect(input[0].files[0].name).to.eq('example.json')
    })
  
  })

  it('verifica que a política de privacidade abre em outra aba sem a necessidade de um clique',()=>{

    cy.get('#privacy a').should('have.attr', 'href', 'privacy.html').and('have.attr', 'target', '_blank')

  })

  it('acessa a página da política de privacidade removendo o target e então clicando no link',()=>{

    cy.get('#privacy a').invoke('removeAttr', 'target').click()
    cy.url().should('include', 'privacy.html') 
    

  })

  it('mensagens de sucesso e erro usando .invoke()', () => {
    

    cy.get('.success')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Mensagem enviada com sucesso.')
    .invoke('hide')
    .should('not.be.visible')

    cy.get('.error')
    .should('not.be.visible')
    .invoke('show')
    .should('be.visible')
    .and('contain', 'Valide os campos obrigatórios!')
    .invoke('hide')
    .should('not.be.visible')

  })

  it('preenche o campo da área de texto usando o comando invoke', () => {
    cy.get('#open-text-area')
    .invoke('val', 'um texto qualquer')
    .should('have.value', 'um texto qualquer')
  })

  it('faz uma requisição HTTP ', () => {

    cy.request({
      method: 'GET',
      url: 'https://cac-tat-v3.s3.eu-central-1.amazonaws.com/index.html'
    }).should((response) => {
      expect(response.status).to.eq(200)
      expect(response.statusText).to.eq('OK')
      expect(response.body).to.contain('CAC TAT')
    })
  })

  it('find the cat', () => {

    cy.get('#cat').invoke('show').should('be.visible')
    cy.get('#title').invoke('text', 'Cat')
    cy.get('#title').should('contain', 'Cat')

  })

 


  
})
