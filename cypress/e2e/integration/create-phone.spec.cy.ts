describe('Criar celulares', () => {
    const endPoint = '/objects';
  
    it('Deve criar um celular com marca e modelo especificados', function() {
      cy.fixture('phones').then((phones) => {
        cy.log('Criacao de celular para testes');
        cy.request('POST', endPoint, phones.phone1).then((response) => {
          expect(response.status).to.eq(200);
          const celularId = response.body.id;
  
          // Verifica se o celular foi criado corretamente
          cy.request(`${endPoint}/${celularId}`).then((res) => {
            cy.log('Verifica se o celular foi criado corretamente');
            expect(res.body.data.brand).to.eq(phones.phone1.data.brand);
            expect(res.body.data.model).to.eq(phones.phone1.data.model);
          });
        });
      });
    });
  
    it('Deve criar outro celular com dados diferentes', function() {
      cy.fixture('phones').then((phones) => {
        cy.log('Criacao de celular para testes');
        cy.request('POST', endPoint, phones.phone2).then((response) => {
          expect(response.status).to.eq(200);
          const celularId = response.body.id;
  
          // Verifica se o celular foi criado corretamente
          cy.request(`${endPoint}/${celularId}`).then((res) => {
            cy.log('Verifica se o celular foi criado corretamente');
            expect(res.body.data.brand).to.eq(phones.phone2.data.brand);
            expect(res.body.data.model).to.eq(phones.phone2.data.model);
          });
        });
      });
    });
  });
  