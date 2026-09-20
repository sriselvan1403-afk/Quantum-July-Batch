import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";
import { BrowserContext, Locator, Page } from "@playwright/test";
import { ContactLeadsPage } from "./ContactLeadsPage";

export class MergeLeads extends BrowserInteractionsImpl {

    readonly page: Page;
    readonly primaryLead: Locator;
    readonly duplicateLead: Locator;
    readonly mergeButton: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.primaryLead = page.locator(`select[name="primary_lead"]`);
        this.duplicateLead = page.locator(`select[name="duplicate_lead"]`);
        this.mergeButton = page.locator(`//div/button[text()='Merges']`);
    }

    async selectPrimaryLead(label: string): Promise<void> {
        await this.selectDropdown(this.primaryLead, {'label':label});
    }

    async selectDuplicateLead(label: string): Promise<void> {
        await this.selectDropdown(this.duplicateLead, {'label':label});
    }

    async clickMerge(): Promise<ContactLeadsPage> {
        await this.click(this.mergeButton,'Merge Button');
        return new ContactLeadsPage(this.page,this.context);
    }
}