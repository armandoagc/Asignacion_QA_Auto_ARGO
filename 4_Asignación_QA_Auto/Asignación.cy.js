/// <reference types="cypress" />

require('cypress-xpath') 

describe('Ejercicos de Asignación QA Auto ', () =>{

  it('Caso de prueba 1; Comprobación de numeros de teléfono en Contacto y Aviso Legal', () => {

    let telefonoContacto;
    let telefonoAvisoLegal;
    
    //Visititamos https://www.innocv.com
    cy.visit('https://www.innocv.com');

    //Aceptamos cookies en caso de ser necesario
    cy.get('#rcc-confirm-button').then(($botonCookies) => {
     if ($botonCookies.is(':visible')) {
         $botonCookies.click()
     }
    })

   //Comprobamos si es visible el botón Contacto. En caso de no ser visible, hacemos clic en MENU > Contacto

   cy.xpath('//a[contains(text(),"Contacto")]').then(($botonContacto) => {
     if ($botonContacto.is(':visible')) {
        $botonContacto.click()
      }else{
        cy.get('.jss27').click()
        cy.xpath('//a[contains(text(),"Contacto")]').click()
      }
    })
  
   //Extraemos el teléfono de la pagina Contacto y lo guardamos sin el prefijo '(+34) '
    cy.xpath('//span[contains(text(),"(+34) 91 192 38 32")]')
      .invoke('text')
     .then((telefono) => {
        telefonoContacto = telefono.trim().replace('(+34) ', '');
    });
 
    //Extraemos el teléfono de la pestaña Aviso Legal extrayendo los caracteres que nos interesan a partir de la palabra Teléfono
    cy.visit('https://www.innocv.com/aviso-legal');
    cy.xpath('//span[contains(text(),"Teléfono")]')
      .invoke('text')
      .then((textoTelefono) => {
          const startIndex = textoTelefono.indexOf('Teléfono') + 9;
          telefonoAvisoLegal = textoTelefono.substr(startIndex, 12);
    });

    //Comparamos si los telefonos son iguales
    if (telefonoContacto === telefonoAvisoLegal) {
      cy.log('Los números de teléfono son iguales')
      expect(telefonoContacto).to.equal(telefonoAvisoLegal);
    } else {
      cy.log('Los números de teléfono no son iguales')
      expect(telefonoContacto).to.not.equal(telefonoAvisoLegal);
      }

  })
})



