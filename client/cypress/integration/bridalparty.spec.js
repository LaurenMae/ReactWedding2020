import bridalPartyData from '../../src/contexts/bridalParty';
import filter from 'lodash/filter';

describe('Bridal party', () => {
    const route = '/BridalParty';
    const bridalPartyPage = '[data-id="bridalParty-page"]';

    context('When bridal party is selected from navbar', () => {
        before(() => {
            cy.visit(`http://localhost:3000/`);
            cy.get('[data-id="BridalParty"]').click();
        });

        it('should display the bridal party page', () => {
            cy.get(bridalPartyPage).should('exist');
        });

        it('should navigate to the bridal party url', () => {
            cy.location().should((location) => {
                expect(location.pathname).to.eq(route);
            });
        });

        context('When bridal party page is loaded', () => {
            it('should display 4 groomsmen', () => {
                const expectedLength = filter(bridalPartyData, { role: 'groomsmen' }).length;
                cy.get('[data-id="groomsmen"]').find('.partyMember').should('have.length', expectedLength);
            });

            it('should display 4 bridesmaids', () => {
                const expectedLength = filter(bridalPartyData, { role: 'bridesmaids' }).length;
                cy.get('[data-id="bridesmaids"]').find('.partyMember').should('have.length', expectedLength);
            });

            it.skip('should display an image for each party member', () => {
                // TODO
                cy.get('.partyMember').find('img').should('have.length', bridalPartyData.length);
            });

            it('should display each members name', () => {
                cy.get('.partyMember').find('h4').should(names => {
                    names.each((key, name) => {
                        const results = filter(bridalPartyData, { name: name.innerHTML });
                        expect(results.length).to.be.greaterThan(0);
                        results.map(result => {
                            expect(result.name).eq(name.innerHTML);
                        });
                    });
                });
            });

            it('should display each members relation', () => {
                cy.get('.partyMember').find('p').should(relations => {
                    relations.each((key, relation) => {
                        const results = filter(bridalPartyData, { relation: relation.innerHTML });
                        expect(results.length).to.be.greaterThan(0);
                        results.map(result => {
                            expect(result.relation).eq(relation.innerHTML);
                        });
                    });
                });
            });
        });
    });
});