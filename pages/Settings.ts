import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";
import { BrowserContext, Locator, Page } from "@playwright/test";
import { ContactLeadsPage } from "./ContactLeadsPage";

export class Settings extends BrowserInteractionsImpl {

    readonly page: Page;
    readonly chooseFile: Locator;
    readonly uploadPhoto: Locator;
    readonly mergeButton: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.chooseFile = page.getByRole('button', { name: 'Choose File' });
        this.uploadPhoto = page.getByRole('button', { name: 'Upload Photo' });
        this.mergeButton = page.locator(`//div/button[text()='Merge']`);
    }

    async clickChooseFile(value: string): Promise<void> {
        await this.uploadFile(this.chooseFile, value);
    }

    async clickUploadFile(): Promise<void> {
        await this.click(this.uploadPhoto, 'Upload');
    }
}