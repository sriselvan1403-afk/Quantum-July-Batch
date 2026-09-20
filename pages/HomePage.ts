import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";
import { Locator, Page, BrowserContext } from "@playwright/test";
import { ContactLeadsPage } from "./ContactLeadsPage";

export class HomePage extends BrowserInteractionsImpl {

    readonly page: Page;
    readonly dashboardOverview: Locator;
    readonly contactsLeads: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.dashboardOverview = page.getByRole('heading', { name: 'Dashboard Overview' });
        this.contactsLeads = page.getByRole('link', { name: 'Contacts / Leads' });
    }

    async clickContacts(): Promise<ContactLeadsPage> {
        await this.click(this.contactsLeads, 'contacts');
        return new ContactLeadsPage(this.page, this.context);
    }
}