import { test, expect } from "@playwright/test";
import { GlobalSearchBar } from "../page-objects/globalSearchBarPage.js";

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
});

