import hotelsData from '../../src/contexts/Hotels';

describe('Hotels', () => {
    const route = '/Hotels';
    const bridalPartyPage = '[data-id="hotels-page"]';

    before(() => {
        cy.visit(`http://localhost:3000${route}`);
    });

    context('When bridal party is selected from navbar', () => {
        it('should display the bridal party page', () => {
            cy.get(bridalPartyPage).should('exist');
        });
    });
});