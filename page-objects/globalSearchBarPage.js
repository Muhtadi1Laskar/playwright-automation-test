export class GlobalSearchBar {
    constructor(page) {
        this.page = page;

        // Selector
        this.searchSuggestionSelector = "//ul[contains(@class, 'search-results active')]";
        this.searchListSelector = `${this.searchSuggestionSelector}//li`;
        this.superStoreTagSelector = "//li[@data-value='SUPER_STORE']";
        this.bookAuthorSelector = "p[class='product-info__author']";
        this.bookTitleSelector = "a[class='product-info__name']";
        this.searchInputSelector = "//input[@id='js--search']";
        this.bookTagSelector = "//li[@data-value='BOOK']";
        this.trashIconSelector = { name: 'trash' };
        this.cartIconSelector = { name: 'cart' };
        this.yesBtnSelector = { name: 'হ্যাঁ' };
        

        // Locators
        this.suggestionSpaceLocator = this.page.locator(this.searchSuggestionSelector);
        this.trashIconLocator = this.page.getByRole('link', this.trashIconSelector);
        this.yesButtonLocator = this.page.getByRole('button', this.yesBtnSelector);
        this.superStoreTagLocator = this.page.locator(this.superStoreTagSelector);
        this.cartIconLocator = this.page.getByRole('link', this.cartIconSelector);
        this.searchListLocator = this.page.locator(this.searchListSelector);
        this.bookAuthorLocator = this.page.locator(this.bookAuthorSelector);
        this.searchBarLocator = this.page.locator(this.searchInputSelector);
        this.bookTitleLocator = this.page.locator(this.bookTitleSelector);
        this.booksTagLocator = this.page.locator(this.bookTagSelector);

        // Data
        this.bookTitle = "Kafka on the shore";
        this.authorName = "হারুকি মুরাকামি";
        this.authorNameEng = "Haruki Murakami";
        this.bookBanglaTitle = "কাফকা অন দ্য শোর";
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

    async removeFromCart() {
        await this.trashIconLocator.click();
        await this.yesButtonLocator.waitFor({ state: "visible" });
        await this.yesButtonLocator.click();
    }
}