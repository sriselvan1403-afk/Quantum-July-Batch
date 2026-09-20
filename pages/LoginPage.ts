import { Page, BrowserContext, Locator } from '@playwright/test';
import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";
import { HomePage } from "./HomePage";

export class LoginPage extends BrowserInteractionsImpl {

    readonly page: Page;
    readonly username: Locator;
    readonly password: Locator;
    readonly signIn: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.username = page.getByRole('textbox', { name: 'Username' });
        this.password = page.getByRole('textbox', { name: 'Password' });
        this.signIn = page.getByRole('button', { name: 'Sign In' });
    }

    async enterUsername(username: string): Promise<void> {
        await this.type(this.username, username, 'username')
    }

    async enterPassword(password: string): Promise<void> {
        await this.type(this.password, password, 'password')
    }

    async clickLogin(): Promise<HomePage> {
        await this.click(this.signIn, 'Login');
        return new HomePage(this.page, this.context);
    }
}