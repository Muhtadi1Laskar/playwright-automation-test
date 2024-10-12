import { test, expect } from "@playwright/test";
import { GlobalSearchBar } from "../page-objects/globalSearchBarPage.js";
import { BookList } from "../Test-Data/bookData.js";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Search Bar Test Suite', () => {
    test('Check the component of the Search Bar', async ({ page }) => {
        const search = new GlobalSearchBar(page);

        await search.searchBarLocator.waitFor({ state: "visible" });

        expect.soft(search.searchBarLocator).toBeVisible();
        expect.soft(search.booksTagLocator).toBeVisible();
        expect.soft(search.superStoreTagLocator).toBeVisible();
    });

    test('Check book options appears propely', async ({ page }) => {
        const search = new GlobalSearchBar(page);

        await search.searchBarLocator.waitFor({ state: "visible" });
        await search.searchItem(search.bookTitle);

        for(let index = 0; index < BookList.length; index++) {
            const { author, title, button } = search.getSuggestionBarSelector(index+1);

            await page.locator(author).waitFor({ state: "visible" });

            expect.soft(page.locator(author)).toHaveText(search.authorName);
            expect.soft(page.locator(title)).toHaveText(BookList[index]);
            expect.soft(page.locator(button)).toBeVisible();
        }
    });
    
});

