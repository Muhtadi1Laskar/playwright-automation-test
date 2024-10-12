export class GlobalSearchBar {
    constructor(page) {
        this.page = page;

        // Selector
        this.searchInputSelector = "//input[@id='js--search']";
        this.bookTagSelector = "//li[@data-value='BOOK']";
        this.superStoreTagSelector = "//li[@data-value='SUPER_STORE']";
        

        // Locators
        this.searchBarLocator = this.page.locator(this.searchInputSelector);
        this.booksTagLocator = this.page.locator(this.bookTagSelector);
        this.superStoreTagLocator = this.page.locator(this.superStoreTagSelector);
    }


    getSuggestionBarSelector(index) {
        return {
            author: `(//a[@class='dropdown-book-wrapper']//div//p[@class='author'])[${index}]`,
            title: `(//a[@class='dropdown-book-wrapper']//div//p[@class='title'])[${index}]`,
            button: `(//a[@class="dropdown-book-wrapper"]//button)[${index}]`
        }
    }

    async clickOnSearchBar() {
        await this.searchBarLocator.click();
    }

    async searchBook(name, index=4) {
        await this.searchItem(name);
        await this.clickOnOption(name, index)
    }

    async searchItem(name) {
        await this.searchBarLocator.fill(name);
    }

    async clickOnOption(index=4) {
        const selector = `(//a[@class='dropdown-book-wrapper']//div//p[@class='title'])[${index}]`;
        const locator = this.page.locator(selector);

        await locator.waitFor({ state: "visible" });
        await locator.click();
    }
}