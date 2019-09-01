import hotelsData from '../../src/contexts/Hotels';
import filter from 'lodash/filter';

describe('Home', () => {
    const route = '/Home';
    const hotelsPage = '[data-id="home-page"]';

    context('When \'Home\' is selected from navbar', () => {

        before(() => {
            cy.visit(`http://localhost:3000`);
            cy.get('[data-id="Home"]').click();
        });

        it('should display the hotels page', () => {
            cy.get(hotelsPage).should('exist');
        });

        it('should navigate to the hotel url', () => {
            cy.location().should((location) => {
                expect(location.pathname).to.eq(route);
            });
        });

        context('Hotel page is loaded', () => {
            it('should display countdown', () => {
                cy.get('.countdown').should('exist');
            });
        });
    });
});