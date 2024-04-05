import { ContextPagesFixture } from './context-pages';
import { YaHomePage } from '../pages/ya-home-page';
import { YaMenuPage } from '../pages/ya-menu-page';
import { Fixtures } from '@playwright/test';

export type PlaywrightPagesFixture = {
  yaHomePage: YaHomePage;
  yaMenuPage: YaMenuPage;
};

export const pagesFixture: Fixtures<PlaywrightPagesFixture, ContextPagesFixture> = {
  yaHomePage: async ({ contextPage }, use) => {
    const yaHomePage = new YaHomePage(contextPage);

    await use(yaHomePage);
  },
  yaMenuPage: async ({ contextPage }, use) => {
    const yaMenuPage = new YaMenuPage(contextPage);

    await use(yaMenuPage);
  }
};
