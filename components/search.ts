import { Button } from '../page-factory/button';
import { Input } from '../page-factory/input';
import { Page } from '@playwright/test';

export class Search {
  private readonly searchButton: Button;
  private readonly searchInputField: Input;

  constructor(public page: Page) {
    this.searchButton = new Button({ page, locator: '.search3__button.mini-suggest__button', name: 'search button' });
    this.searchInputField = new Input({ page, locator: '#text', name: 'text' });
  }

  async searchFreeText(text: string) {
    await this.searchInputField.fill(text);
  }

  async clickOnBtn() {
    await this.searchButton.click();
  }
}