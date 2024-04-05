import { searchTest as test } from './tests';

test.beforeEach(async ({ yaHomePage }) => {
  await yaHomePage.visit('/e2e-tests/site/page1.html');
});

test('Enter "Яндекс" in search bar, press "Найти" - should be opened search results', async ({ yaHomePage }) => {
  const searchTextValue = 'Текст который надо найти';
  await yaHomePage.search.freeText(searchTextValue);
  await yaHomePage.search.clickOnBtn();
  await yaHomePage.triangleToBeVisible();
  await yaHomePage.clickOnTriangleBtnUntilListToBeVisible();
  await yaHomePage.checkFoundResult(searchTextValue);
});
