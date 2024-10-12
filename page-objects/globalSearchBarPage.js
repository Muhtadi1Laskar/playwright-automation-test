export class GlobalSearchBar {
    constructor(page) {
        this.page = page;

        // Selector
        this.searchInputSelector = "//input[@id='js--search']";
        this.bookTagSelector = "//li[@data-value='BOOK']";
        this.superStoreTagSelector = "//li[@data-value='SUPER_STORE']";
        this.searchSuggestionSelector = "//ul[contains(@class, 'search-results active')]";
        this.searchListSelector = `${this.searchSuggestionSelector}//li`;
        

        // Locators
        this.searchBarLocator = this.page.locator(this.searchInputSelector);
        this.booksTagLocator = this.page.locator(this.bookTagSelector);
        this.superStoreTagLocator = this.page.locator(this.superStoreTagSelector);
        this.suggestionSpaceLocator = this.page.locator(this.searchSuggestionSelector);
        this.searchListLocator = this.page.locator(this.searchListSelector);

        // Data
        this.bookTitle = "Kafka on the shore";
        this.authorName = "হারুকি মুরাকামি";
        this.authorNameEng = "Haruki Murakami"
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
        await this.searchBarLocator.type(name, {delay: 5});
    }

    async clickOnOption(index=4) {
        const selector = `(//a[@class='dropdown-book-wrapper']//div//p[@class='title'])[${index}]`;
        const locator = this.page.locator(selector);

        await locator.waitFor({ state: "visible" });
        await locator.click();
    }
}