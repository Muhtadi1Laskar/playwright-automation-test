import { test as base, expect } from "@playwright/test";
import { GlobalSearchBar } from "../page-objects/globalSearchBarPage.js";

export const test = base.extend({
    searchPage: async ({ page }, use) => {
        const searchPage = new GlobalSearchBar(page);

        await searchPage.searchBarLocator.waitFor({ state: "visible" });

        await use(searchPage);
    },
    invalidBookPage: async ({ page }, use) => {
        const searchPage = new GlobalSearchBar(page);

        await searchPage.searchBarLocator.waitFor({ state: "visible" });
        await searchPage.searchItem("INVALIDBOOK23123123948858585{}{}'/.';[;");

        await use(invalidBookPage);
    },
});

export { expect };