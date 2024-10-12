import { test as base, expect } from "@playwright/test";
import { GlobalSearchBar } from "../page-objects/globalSearchBarPage.js";

export const test = base.extend({
    searchPage: async ({ page }, use) => {
        const searchPage = new GlobalSearchBar(page);

        await searchPage.searchBarLocator.waitFor({ state: "visible" });

        await use(searchPage);
    },
    searchAuthor: async ({ page }, use) => {
        const searchAuthor = new GlobalSearchBar(page);

        await searchAuthor.searchBarLocator.waitFor({ state: "visible" });
        await searchAuthor.searchItem(`"${searchAuthor.authorNameEng}"`);
        await page.waitForTimeout(10000);

        await use(searchAuthor);
    },
    invalidBookPage: async ({ page }, use) => {
        const invalidBookPage = new GlobalSearchBar(page);

        await invalidBookPage.searchBarLocator.waitFor({ state: "visible" });
        await invalidBookPage.searchItem("INVALIDBOOK23123123948858585{}{}'/.';[;");

        await use(invalidBookPage);
    },
    invalidAuthorPage: async ({ page }, use) => {
        const invalidAuthorPage = new GlobalSearchBar(page);

        await invalidAuthorPage.searchBarLocator.waitFor({ state: "visible" });
        await invalidAuthorPage.searchItem("INVALIAuthor23123123948858585{}{}'/.';[;");

        await use(invalidAuthorPage);
    },
});

export { expect };