import bridalPartyData from '../../src/contexts/bridalParty';
import filter from 'lodash/filter';

describe('Bridal party', () => {
    const route = '/bridalParty';
    const bridalPartyPage = '[data-id="bridalParty-page"]';

    before(() => {
        cy.visit(`http://localhost:3000${route}`);
    });

    context('When bridal party is selected from navbar', () => {
        it('should display the bridal party page', () => {
            cy.get(bridalPartyPage).should('exist');
        });

        it('should navigate to the bridal party url', () => {
            cy.location().should((location) => {
                expect(location.pathname).to.eq(route);
            });
        });
    });

    context('When bridal party page is loaded', () => {
        it('should display 4 groomsmen', () => {
            cy.get('[data-id="groomsmen"]').find('.partyMember').should('have.length', 4);
        });

        it('should display 4 bridesmaids', () => {
            cy.get('[data-id="bridesmaids"]').find('.partyMember').should('have.length', 4);
        });

        it.skip('should display an image for each party member', () => {
            // TODO
            cy.get('.partyMember').find('img').should('have.length', 8);
        });

        it('should display each members name', () => {
            cy.get('.partyMember').find('h4').should(names => {
                names.map(name => {
                    const results = filter(bridalPartyData, { name: name.innerHTML });
                    results.map(result => {
                        expect(result.name).eq(name.innerHTML);
                    });
                });
            });
        });

        it('should display each members relation', () => {
            cy.get('.partyMember').find('p').should(relations => {
                relations.map(relation => {
                    const results = filter(bridalPartyData, { relation: relation.innerHTML });
                    results.map(result => {
                        expect(result.relation).eq(relation.innerHTML);
                    });
                });
            });
        });
    });
});