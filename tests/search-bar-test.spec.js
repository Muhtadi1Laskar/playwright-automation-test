import { test, expect } from "@playwright/test";
import { GlobalSearchBar } from "../page-objects/globalSearchBarPage.js";

test.beforeEach(async ({ page }) => {
    await page.goto('/');
});

test.describe('Search Bar Test Suite', () => {
    test('Search book by Name', async ({ page }) => {
        await page.pause();
    }); 
});

