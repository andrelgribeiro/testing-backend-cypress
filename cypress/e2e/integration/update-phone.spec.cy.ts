describe('Atualizar celulares', () => {
    const endPoint = '/objects';
  
    it('Deve atualizar um campo específico (modelo) de um celular', function() {
      cy.fixture('phones').then((phones) => {
        // Criação do celular antes de atualizar
        cy.log('Criação do celular antes de atualizar');
        cy.request('POST', endPoint, phones.phoneToUpdate).then((response) => {
          const celularId = response.body.id;
  
          // Atualiza o modelo do celular
          cy.request('PATCH', `${endPoint}/${celularId}`, { name: 'NameModelo2' }).then((res) => {
            cy.log('Validação do celular de atualizar');
            expect(res.status).to.eq(200);
            expect(res.body.name).to.eq('NameModelo2');
          });
        });
      });
    });
  
    it('Deve atualizar todos os campos de um celular', function() {
      cy.fixture('phones').then((phones) => {
        // Criação do celular antes de atualizar
        cy.log('Criação do celular antes de atualizar');
        cy.request('POST', endPoint, phones.phoneToUpdate).then((response) => {
          const celularId = response.body.id;
  
          // Atualiza todos os campos do celular
          cy.request('PUT', `${endPoint}/${celularId}`, phones.updatedPhone).then((res) => {
            cy.log('Validação do celular de atualizar');
            expect(res.status).to.eq(200);
            expect(res.body.data.brand).to.eq(phones.updatedPhone.data.brand);
            expect(res.body.data.model).to.eq(phones.updatedPhone.data.model);
          });
        });
      });
    });
  });
  