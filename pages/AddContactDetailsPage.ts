import { BrowserInteractionsImpl } from "../utils/BrowserInteractionsImpl";
import { BrowserContext, Locator, Page } from "@playwright/test";
import { ContactLeadsPage } from "./ContactLeadsPage";

export class AddContactDetailsPage extends BrowserInteractionsImpl {

    readonly page: Page;
    readonly contactName: Locator;
    readonly email: Locator;
    readonly phoneNumber: Locator;
    readonly profileDropdown: Locator;
    readonly logout: Locator;
    readonly company: Locator;
    readonly statusDropdown: Locator;
    readonly priorityDropdown: Locator;
    readonly date: Locator;
    readonly addButton: Locator;
    readonly contactSource: Locator;
    readonly leadScore: Locator;
    readonly deals: Locator;
    readonly totalValue: Locator;
    readonly checkbox: Locator;
    readonly notes: Locator;

    constructor(page: Page, context: BrowserContext) {
        super(page, context);
        this.page = page;
        this.contactName = page.locator(`#contact_name`);
        this.email = page.locator(`#email`);
        this.phoneNumber = page.locator(`#phone`);
        this.profileDropdown = page.locator('#userDropdownButton');
        this.logout = page.getByRole('link', { name: 'Logout' });
        this.company = page.locator(`#company`);
        this.statusDropdown = page.locator(`select[name="status"]`);
        this.contactSource = page.locator(`select[name="source"]`);
        this.leadScore = page.locator(`#lead_score`);
        this.deals = page.locator(`#deals`);
        this.totalValue = page.locator(`#total_value`);
        this.priorityDropdown = page.locator(`select[name="priority"]`);
        this.date = page.locator(`#last_contact`);
        this.addButton = page.getByRole('button', { name: 'Add' });
        this.checkbox = page.getByRole('button', { name: 'Add' });
        this.notes = page.locator(`#notes`);
    }

    async enterName(value: string): Promise<void> {
        await this.type(this.contactName, value, 'contact name');
    }

    async enterEmail(value: string): Promise<void> {
        await this.type(this.email, value, 'email');
    }

    async enterPhoneNumber(value: string): Promise<void> {
        await this.type(this.phoneNumber, value, 'phone number');
    }

    async logoutUser(): Promise<void> {
        await this.click(this.profileDropdown, 'profile drop down');
        await this.click(this.logout, 'logout');
    }

    async enterCompany(value: string): Promise<String> {
        await this.type(this.company, value, 'Company name');
        return value;
    }

    async selectGender(value: string): Promise<void> {
        const radio = this.page.locator(`input[type="radio"][value="${value}"]`);
        await this.check(radio);
    }

    async selectStatus(value: string): Promise<void> {
        await this.selectDropdown(this.statusDropdown, { 'label': value });
    }

    async selectContactSorce(value: string): Promise<void> {
        await this.selectDropdown(this.contactSource, { 'label': value });
    }

    async enterleadScore(value: string): Promise<void> {
        await this.type(this.leadScore, value, 'Lead Score');
    }

    async enterDeals(value: string): Promise<void> {
        await this.type(this.deals, value, 'Deals');
    }

    async enterTotalValue(value: string): Promise<void> {
        await this.type(this.totalValue, value, 'Total Value');
    }

    async selectInterestedServices(value: string): Promise<void> {
        const checkbox = this.page.locator(`input[type="checkbox"][value="${value}"]`);
        await this.check(checkbox);
    }

    async selectPriority(label: string): Promise<void> {
        await this.selectDropdown(this.priorityDropdown, { 'label': label });
    }

    async enterLastContact(value: string): Promise<void> {
        await this.type(this.date, value, 'Date');
    }

    async enterNotes(value: string): Promise<void> {
        await this.type(this.notes, value, 'Notes');
    }

    async clickAddButton(): Promise<void> {
        await this.click(this.addButton, 'Add Button');
    }

}