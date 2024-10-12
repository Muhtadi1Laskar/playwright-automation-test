import { test, expect } from "../fixture/searchBar.js";
import { BookList } from "../Test-Data/bookData.js";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Search Bar Test Suite', () => {
    test('Check the component of the Search Bar', async ({ searchPage }) => {
        expect.soft(searchPage.searchBarLocator).toBeVisible();
        expect.soft(searchPage.booksTagLocator).toBeVisible();
        expect.soft(searchPage.superStoreTagLocator).toBeVisible();
    });

    test('Check book options appears propely', async ({searchPage, page }) => {
        await searchPage.searchItem(searchPage.bookTitle);

        for(let index = 0; index < BookList.length; index++) {
            const { author, title, button } = searchPage.getSuggestionBarSelector(index+1);

            await page.locator(author).waitFor({ state: "visible" });

            expect.soft(page.locator(author)).toHaveText(searchPage.authorName);
            expect.soft(page.locator(title)).toHaveText(BookList[index]);
            expect.soft(page.locator(button)).toBeVisible();
        }
    });

    test('Check search with invalid book name', async ({ invalidBookPage }) => {
        expect(invalidBookPage.suggestionSpaceLocator).not.toBeVisible();
    });

    test('Check search with invalid author', async ({ invalidBookPage }) => {
        expect(invalidBookPage.suggestionSpaceLocator).not.toBeVisible();
    });

    test.only('Check search with author name is working properly', async ({ searchAuthor, page }) => {
        const count = await searchAuthor.searchListLocator.count();

        for(let index = 1; index < Number(count); index++) {
            const { author } = searchAuthor.getSuggestionBarSelector(index);

            expect.soft(page.locator(author)).toBeVisible();
        }
    });
});

