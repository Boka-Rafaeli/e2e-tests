import { ComponentProps, LocatorProps } from '../types/page-factory/component';
import { expect, Locator, Page, test } from '@playwright/test';
import { locatorTemplateFormat } from '../utils/page-factory';
import { capitalizeFirstLetter } from '../utils/generic';

export abstract class Component {
  private name: string | undefined;
  private iframe: string | undefined;
  locator: string;
  page: Page;

  constructor({ page, locator, name, iframe }: ComponentProps) {
    this.page = page;
    this.locator = locator;
    this.name = name;
    this.iframe = iframe;
  }

  getLocator(props: LocatorProps = {}): Locator {
    const { locator, ...context } = props;
    const withTemplate = locatorTemplateFormat(locator || this.locator, context);

    if (!this.iframe) {
      return this.page.locator(withTemplate);
    }
    return this.page.frameLocator(this.iframe).locator(withTemplate);
  }

  get typeOf(): string {
    return 'component';
  }

  get typeOfUpper(): string {
    return capitalizeFirstLetter(this.typeOf);
  }

  get componentName(): string {
    if (!this.name) {
      throw Error('Provide "name" property to use "componentName"');
    }

    return this.name;
  }

  private getErrorMessage(action: string): string {
    return `The ${this.typeOf} with name "${this.componentName}" and locator ${this.locator} ${action}`;
  }

  async shouldBeVisible(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should be visible on the page`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, { message: this.getErrorMessage('is not visible') }).toBeVisible();
    });
  }

  async checkIsVisible(locatorProps: LocatorProps = {}): Promise<boolean> {
    return await test.step(`${this.typeOfUpper} "${this.componentName}" should be visible on the page`, async () => {
      const locator = this.getLocator(locatorProps);
      try {
        const isVisible = await locator.isVisible({ timeout: 1000 });
        return isVisible;
      } catch (e) {
        console.error(this.getErrorMessage('is not visible'), e);
        return false;
      }
    });
  }

  async shouldHaveText(text: string, locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should have text "${text}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await expect(locator, { message: this.getErrorMessage(`does not have text "${text}"`) }).toContainText(text);
    });
  }

  async shouldHaveTextInItems(expectedText: string, locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`${this.typeOfUpper} "${this.componentName}" should have text "${expectedText}"`, async () => {
      const locator = this.getLocator(locatorProps);
      let items = await locator.allInnerTexts();
      expect(items, { message: this.getErrorMessage(`does not have text "${expectedText}"`) }).toContain(expectedText);
    });
  }

  async click(locatorProps: LocatorProps = {}): Promise<void> {
    await test.step(`Clicking the ${this.typeOf} with name "${this.componentName}"`, async () => {
      const locator = this.getLocator(locatorProps);
      await locator.click();
    });
  }
}