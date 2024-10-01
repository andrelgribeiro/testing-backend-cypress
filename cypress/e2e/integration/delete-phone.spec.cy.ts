describe('Deletar celulares', () => {
    const endPoint = '/objects';
  
    it('Deve criar e deletar um celular', function() {
      cy.fixture('phones').then((phones) => {
        // Criação do celular antes de deletar
        cy.log('Criacao de celular para testes');
        cy.request('POST', endPoint, phones.phoneToDelete).then((response) => {
          const celularId = response.body.id;
  
          // Deleta o celular criado
          cy.request('DELETE', `${endPoint}/${celularId}`).then((res) => {
            cy.log('Verifica se o celular foi deletado corretamente');
            expect(res.status).to.eq(200);
          });
        });
      });
    });
  
    it('Deve verificar que o celular deletado não existe mais', function() {
      cy.fixture('phones').then((phones) => {
        // Criação do celular antes de deletar
        cy.log('Criacao de celular para testes');
        cy.request('POST', endPoint, phones.phoneToDelete).then((response) => {
          const celularId = response.body.id;
  
          // Deleta o celular
          cy.request('DELETE', `${endPoint}/${celularId}`).then(() => {
            // Verifica se o celular foi removido
            cy.request({
              url: `${endPoint}/${celularId}`,
              failOnStatusCode: false
            }).then((res) => {
                cy.log('Verifica se o celular foi deletado corretamente');
                expect(res.status).to.eq(404);
            });
          });
        });
      });
    });
  });
  