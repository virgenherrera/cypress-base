import { SearchBarPage } from './search-bar.page';

export class SearchResultPage extends SearchBarPage {
  private resultTitlesSelector = 'h5.card-title.a-card-description';
  private notResultsSelector = '.o-nullproduct-title-query';

  get resultTitles() {
    return cy.get(this.resultTitlesSelector);
  }

  get noResultsText() {
    return cy.get(this.notResultsSelector);
  }

  allResultsContain(term: string) {
    this.resultTitles.each(($el) => {
      cy.wrap($el).should('contain', term);
    });
  }
}

export default new SearchResultPage();
