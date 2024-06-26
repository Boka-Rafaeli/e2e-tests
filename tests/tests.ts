import { ContextPagesFixture, contextPagesFixture } from '../fixtures/context-pages';
import { PlaywrightPagesFixture, pagesFixture } from '../fixtures/playwright-pages';
import { combineFixtures } from '../utils/fixtures';
import { test as base } from '@playwright/test';

export const searchTest = base.extend<ContextPagesFixture, PlaywrightPagesFixture>(
  combineFixtures(contextPagesFixture, pagesFixture)
);
