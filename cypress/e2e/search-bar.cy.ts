import { searchBarPage, searchResultPage } from '../pages';

describe('e2e:SearchBar component', () => {
  const enum should {
    searchBarVisible = 'Should SearchBar be visible.',
    doNothingOnClick = 'Should SearchBox should not do anything when click on empty input.',
    suggestionsAppear = 'Should TypeAhead be Revealed when input a searchTerm.',
    suggestionsDisappear = 'Should TypeAhead be Revealed when input a searchTerm and hidden when deleting searchTerm.',
    goToSearchResultsOnClick = 'Should go to results page when input a searchTerm and Click in zoomIcon.',
    goToSearchResultsOnEnter = 'Should go to results page when input a searchTerm and press Enter key.',
    notFoundForWrongSearchTerm = 'Should not found any item for a wrong SearchTerm.',
    detectMisspelledSearchTerm = 'Should detect a misspelled SearchTerm and look for proper term. ',
  }

  let searchTerm: string;
  let searchTermTwo: string;
  let typoSearchTerm: string;
  let correctedSearchTerm: string;

  beforeEach(() => {
    cy.visit('/');

    cy.url().should('contain', 'liverpool');
    cy.url().should('contain', 'tienda');

    cy.fixture('searchTerms.fixture')
      .as('searchTerms')
      .then((data) => {
        searchTerm = data.searchTermOne;
        searchTermTwo = data.typoSearchTerm;
        typoSearchTerm = data.typoSearchTerm;
        correctedSearchTerm = data.correctedSearchTerm;
      });
  });

  it(should.searchBarVisible, async () => {
    searchBarPage.mainSearchbar.should('be.visible');
    searchBarPage.zoomIcon.should('be.visible');
  });

  it(should.doNothingOnClick, async () => {
    searchBarPage.zoomIcon.should('be.visible');

    searchBarPage.zoomIcon.click();

    searchBarPage.typeAhead.should('not.be.visible');

    cy.url().should('include', 'liverpool');
    cy.url().should('include', 'tienda/home');
  });

  it(should.suggestionsAppear, async () => {
    searchBarPage.mainSearchbar.should('be.visible');

    searchBarPage.typeSearchTerm(searchTerm);
    cy.wait(2e3);
    cy.wrap(searchBarPage.typeAhead).should('be.visible');
  });

  it(should.suggestionsDisappear, async () => {
    searchBarPage.mainSearchbar.should('be.visible');

    searchBarPage.typeSearchTerm(searchTerm);
    cy.wait(2e3);
    searchBarPage.typeAhead.should('be.visible');

    searchBarPage.mainSearchbar.clear();
    cy.wait(2e3);

    searchBarPage.typeAhead.should('not.be.visible');
  });

  it(should.goToSearchResultsOnClick, async () => {
    searchBarPage.mainSearchbar.should('be.visible');

    searchBarPage.typeSearchTerm(searchTerm);
    searchBarPage.zoomIcon.click();

    cy.url().should('contain', 'tienda');
    cy.url().should('contain', searchTerm);
    cy.title().should('contain', searchTerm);

    searchResultPage.allResultsContain(searchTerm);
  });

  it(should.goToSearchResultsOnEnter, async () => {
    searchBarPage.mainSearchbar.should('be.visible');

    searchBarPage.typeSearchTerm(searchTerm, true);

    cy.url().should('contain', 'tienda');
    cy.url().should('contain', searchTerm);
    cy.title().should('contain', searchTerm);

    searchResultPage.allResultsContain(searchTerm);
  });

  it(should.notFoundForWrongSearchTerm, async () => {
    searchBarPage.mainSearchbar.should('be.visible');

    searchBarPage.typeSearchTerm(searchTermTwo, true);

    cy.url().should('contain', 'tienda');

    searchResultPage.noResultsText.should(
      'have.text',
      `Lo sentimos, no encontramos nada para "${searchTermTwo}"`,
    );
  });

  it(should.detectMisspelledSearchTerm, async () => {
    searchBarPage.mainSearchbar.should('be.visible');

    cy.log(typoSearchTerm);

    searchBarPage.typeSearchTerm(typoSearchTerm, true);

    cy.url().should('contain', 'tienda');
    cy.url().should('contain', typoSearchTerm);

    searchResultPage.allResultsContain(correctedSearchTerm);
  });
});
