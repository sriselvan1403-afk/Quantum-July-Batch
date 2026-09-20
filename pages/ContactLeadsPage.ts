import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";
import { BrowserContext, Locator, Page } from "@playwright/test";
import { AddContactDetailsPage } from "./AddContactDetailsPage";
import { MergeLeads } from "./MergeLeads";
import { Settings } from "./Settings";

export class ContactLeadsPage extends BrowserInteractionsImpl {

    readonly page: Page;
    readonly addNewContact: Locator;
    readonly tableContact_Name: Locator;
    readonly addMergeLeads: Locator;
    readonly settings: Locator;
    readonly exportCSV: Locator;
    readonly tableCompany: Locator;
    readonly tableStatus: Locator;
    readonly editLead: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.addNewContact = page.getByRole('link', { name: 'Add New Contact' });
        this.tableContact_Name = page.locator(`//table/tbody/tr[1]/td[1]//div/p[1]`);
        this.addMergeLeads = page.getByRole('button', { name: 'Merge Leads' });
        this.settings = page.locator(`a button svg[data-lucide='settings']`);
        this.exportCSV = page.getByRole('button', { name: 'Export CSV' });
        this.tableCompany = page.locator(`//table/tbody/tr[1]/td[2]`);
        this.tableStatus = page.locator(`//table/tbody/tr[1]/td[3]/span`);
        this.editLead = page.locator(`//input[@name='lead]`);
    }

    async clickAddNewContact(): Promise<AddContactDetailsPage> {
        const newPage = await this.switchToWindow('Add Contacts & Leads', this.addNewContact);
        return new AddContactDetailsPage(newPage, this.context);
    }
    async switchBackToContactsPage(): Promise<ContactLeadsPage> {
        const mainPage = await this.switchToExistingWindow("Contacts & Leads");
        return new ContactLeadsPage(mainPage, this.context);
    }

    async getFirstContactName(): Promise<Locator> {
        return this.tableContact_Name;
    }

    async isCompanyNameDisplayed(): Promise<string> {
        return await this.tableCompany.innerText();
    }

    async isStatusDisplayed(): Promise<string> {
        return await this.tableStatus.innerText();
    }

    async clickMergeLeads(): Promise<MergeLeads> {
        await this.click(this.addMergeLeads, 'Merge Leads');
        return new MergeLeads(this.page, this.context);
    }

    async clicksettings(): Promise<Settings> {
        await this.click(this.settings, 'Settings');
        return new Settings(this.page, this.context);
    }

    async clickExportCSV(): Promise<void> {
        await this.downloadFile(this.exportCSV);
    }
}