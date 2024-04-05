import { Navbar } from '../components/navigation/navbar';
import test, { Page } from '@playwright/test';
import { Search } from '../components/search';

export class BasePage {
  readonly navbar: Navbar;
  readonly search: Search;

  constructor(protected page: Page) {
    this.navbar = new Navbar(page);
    this.search = new Search(page);
  }

  async visit(url: string): Promise<void> {
    await test.step(`Opening the url "${url}"`, async () => {
      await this.page.goto(url, { waitUntil: 'networkidle' });
    });
  }

  async reload(): Promise<void> {
    const currentUrl = this.page.url();

    await test.step(`Reloading page with url "${currentUrl}"`, async () => {
      await this.page.reload({ waitUntil: 'domcontentloaded' });
    });
  }
}
