import hotelsData from '../../src/contexts/Hotels';
import filter from 'lodash/filter';

describe('Hotels', () => {
    const route = '/Hotels';
    const hotelsPage = '[data-id="hotels-page"]';

    context('When \'Where to stay\' is selected from navbar', () => {

        before(() => {
            cy.visit(`http://localhost:3000`);
            cy.get('[data-id="Hotels"]').click();
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
            it.skip('should display explanatory text', () => {
                // TODO
            });

            it('should display entry for each hotel', () => {
                cy.get('.hotel_container').should('have.length', hotelsData.length);
            });

            it('should display each hotel\'s name', () => {
                cy.get('[data-id="hotel-name"]').should(names => {
                    names.each((key, name) => {
                        const results = filter(hotelsData, { name: name.innerHTML });
                        expect(results.length).to.be.greaterThan(0);
                        results.map(result => {
                            expect(result.name).eq(name.innerHTML);
                        });
                    });
                });
            });

            it('should display each hotel\'s address', () => {
                cy.get('[data-id="hotel-address"]').should(addresses => {
                    addresses.each((key, address) => {
                        const results = filter(hotelsData, { address: address.innerHTML });
                        expect(results.length).to.be.greaterThan(0);
                        results.map(result => {
                            expect(result.address).eq(address.innerHTML);
                        });
                    });
                });
            });

            it('should display each hotel\'s postcode', () => {
                cy.get('[data-id="hotel-postcode"]').should(postcodes => {
                    postcodes.each((key, postcode) => {
                        const results = filter(hotelsData, { postcode: postcode.innerHTML });
                        expect(results.length).to.be.greaterThan(0);
                        results.map(result => {
                            expect(result.postcode).eq(postcode.innerHTML);
                        });
                    });
                });
            });

            it('should display each hotel\'s distance from venue', () => {
                cy.get('[data-id="hotel-distance"]').should(distances => {
                    distances.each((key, distance) => {
                        const results = filter(hotelsData, { text: distance.innerHTML });
                        expect(results.length).to.be.greaterThan(0);
                        results.map(result => {
                            expect(result.text).eq(distance.innerHTML);
                        });
                    });
                });
            });

            it('should display button to each hotel\'s website', () => {
                cy.get('[data-id="hotel-url"]').should(urls => {
                    urls.each((key, url) => {
                        const results = filter(hotelsData, { url: url.href });
                        expect(results.length).to.be.greaterThan(0);
                        results.map(result => {
                            expect(result.url).eq(url.href);
                        });
                    });
                });
            });
        });
    });
});