export class SearchBarPage {
  private mainSearchbarSelector = '#mainSearchbar';
  private zoomIconSelector = '.icon-zoom';
  private typeAheadSelector = '.m-typeahead';

  get mainSearchbar() {
    return cy.get(this.mainSearchbarSelector);
  }

  get zoomIcon() {
    return this.mainSearchbar.parent().get('.icon-zoom');
  }

  get typeAhead() {
    return cy.get(this.typeAheadSelector);
  }

  typeSearchTerm(term: string, pressEnter = false) {
    const searchTerm = !pressEnter ? term : `${term}{enter}`;

    this.mainSearchbar.type(searchTerm);
  }
}

export default new SearchBarPage();
