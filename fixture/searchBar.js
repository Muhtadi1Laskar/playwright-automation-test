import { test as base, expect } from "@playwright/test";
import { GlobalSearchBar } from "../page-objects/globalSearchBarPage.js";

export const test = base.extend({
    searchPage: async ({ page }, use) => {
        const searchPage = new GlobalSearchBar(page);

        await searchPage.searchBarLocator.waitFor({ state: "visible" });

        await use(searchPage);
    },
    searchBook: async ({ page }, use) => {
        const searchBook = new GlobalSearchBar(page);

        await searchBook.searchBarLocator.waitFor({ state: "visible" });
        await searchBook.searchItem(searchBook.bookTitle);
        await page.waitForTimeout(10000);

        await use(searchBook);
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
    addToCart: async ({ page }, use) => {
        const addToCart = new GlobalSearchBar(page);

        await addToCart.searchBarLocator.waitFor({ state: "visible" });
        await addToCart.searchItem(addToCart.bookTitle);
        await page.waitForTimeout(10000);

        const { button } = addToCart.getSuggestionBarSelector(3);
        await page.locator(button).click();
        await addToCart.cartIconLocator.click();

        await addToCart.bookTitleLocator.waitFor({ state: "visible" });

        await use(addToCart);

        await addToCart.removeFromCart();
    }
});

export { expect };