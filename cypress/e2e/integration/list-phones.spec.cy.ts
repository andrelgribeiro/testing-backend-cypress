describe('Buscar celular por ID', () => {
  const endPoint = '/objects';

  it('Deve retornar um celular específico pelo ID', () => {
    cy.fixture('phones').then((phones) => {
      // Criação do celular antes de deletar
      cy.request('POST', endPoint, phones.phoneToDelete).then((response) => {
        const celularId = response.body.id;
          cy.request(`${endPoint}/${celularId}`).then((response) => {
            expect(response.status).to.eq(200);
            cy.log('Validar celular listado');
            expect(response.body).to.have.property('id', celularId);
          });
        });
      });
  });

  it('Deve retornar 404 para celular não existente', () => {
    cy.request({
      url: `${endPoint}/9999`,
      failOnStatusCode: false
    }).then((response) => {
      cy.log('Validar erro na listagem');
      expect(response.status).to.eq(404);
    });
  });


  it('Deve retornar a lista de todos os celulares', () => {
    cy.request('GET', endPoint).then((response) => {
      expect(response.status).to.eq(200); // Verifica se a requisição foi bem-sucedida
      expect(response.body).to.be.an('array'); // Verifica se o corpo da resposta é um array
      expect(response.body.length).to.be.greaterThan(0); // Verifica se a lista de celulares não está vazia

      // Valida que cada objeto no array possui as propriedades esperadas
      response.body.forEach((phone: any) => {
        cy.log('Verifica se todos os celulares listados estão corretos');
        expect(phone).to.have.property('id');
        expect(phone).to.have.property('name');
        expect(phone).to.have.property('data');
      });
    });
  });

  it('Deve retornar uma lista vazia se não houver celulares (simulação)', () => {
    cy.request('GET', endPoint+'?id=0&id=0&id=0').then((response) => {
      // Deve retornar um array vazio.
      cy.log('Verifica se o array vazio na listagem por range');
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.eq(0);
    });
});

  it('Deve retornar um celular específico pelo ID', () => {
    cy.request('GET', endPoint+'?id=1&id=2&id=3').then((response) => {
      cy.log('Verifica o array na listagem por range');      
      expect(response.status).to.eq(200);
      expect(response.body).to.be.an('array');
      expect(response.body.length).to.eq(3);
    });
  });


});
