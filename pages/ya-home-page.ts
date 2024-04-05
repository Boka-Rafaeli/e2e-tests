import { ListItem } from '../page-factory/list-item';
import { Button } from '../page-factory/button';
import { Page } from '@playwright/test';
import { BasePage } from './base-page';

export class YaHomePage extends BasePage {
  private readonly resultList: ListItem;
  private readonly resulItems: ListItem;
  private readonly triangle: Button;

  constructor(public page: Page) {
    super(page);
    this.triangle = new Button({ page, locator: '.arrow-button', name: 'Triangle Button' });
    this.resultList = new ListItem({ page, locator: '#dynamicList', name: 'Dynamic List' });
    this.resulItems = new ListItem({ page, locator: '#dynamicList li', name: 'List Items' });
  }

  async triangleButtonPresent() {
    await this.triangle.shouldBeVisible();
  }

  async clickTriangleButtonUntilListVisible() {
    let isVisible = false;
    while (!isVisible) {
      await this.triangle.click();
      isVisible = await this.resultList.checkIsVisible();
    }
  }

  async checkResultFound(text: string) {
    await this.resulItems.shouldHaveTextInItems(text);
  }


}
