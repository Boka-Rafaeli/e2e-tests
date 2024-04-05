import { searchTest as test } from './tests';

test.beforeEach(async ({ yaHomePage }) => {
  await yaHomePage.visit('/e2e-tests/site/page1.html');
});

test('Enter "Яндекс" in search bar, press "Найти" - should be opened search results', async ({ yaHomePage }) => {
  const searchTextValue = 'Текст который надо найти';

  await yaHomePage.search.searchFreeText(searchTextValue);
  await yaHomePage.search.clickOnBtn();
  await yaHomePage.triangleButtonPresent();
  await yaHomePage.clickTriangleButtonUntilListVisible();
  await yaHomePage.checkResultFound(searchTextValue);
});
