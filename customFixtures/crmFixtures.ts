import { test as baseTest, expect, Page, BrowserContext, APIResponse } from '@playwright/test';
import { LoginPage } from '../pages/LoginPage';
import { HomePage } from '../pages/HomePage';
import { ContactLeadsPage } from '../pages/ContactLeadsPage';
import { AddContactDetailsPage } from '../pages/AddContactDetailsPage';
import {APIUtils} from '../utils/APIUtils'
import {URLConstants} from '../constants/urlConstants';
import dotenv from 'dotenv';
dotenv.config({path:"EnvFile/qa.env"});


type CRMFixtures = {
  page: Page;
  context: BrowserContext;

  
  homePage: HomePage;
  contactsLeadsPage: ContactLeadsPage;
  addContactDetailsPage: AddContactDetailsPage;
  apiCreateContact: {response: APIResponse, payload: any};
};

const crmTest = baseTest.extend<CRMFixtures>({
  homePage: async ({ page, context }, use) => {
    await page.goto(URLConstants.adminURL);

    const username = process.env.CRM_USERNAME || 'automate.crm';
    const password = process.env.CRM_PASSWORD || 'test@123';

    const loginPage = new LoginPage(page, context);
    await loginPage.enterUsername(username);
    await loginPage.enterPassword(password);
    const homePage = await loginPage.clickLogin();

    await use(homePage);
  },

  // Provide ContactsLeadsPage fixture
  contactsLeadsPage: async ({ homePage }, use) => {
    const contactsLeadsPage = await homePage.clickContacts();
    await use(contactsLeadsPage);
  },

  // Provide AddContactDetailsPage fixture
  addContactDetailsPage: async ({ contactsLeadsPage }, use) => {
    const addContactDetailsPage = await contactsLeadsPage.clickAddNewContact();
    await use(addContactDetailsPage);
  },

  apiCreateContact: async ({request}, use)=> {
    const apiUtils = new APIUtils(request);
    const response = await apiUtils.createContact();
    await use(response);
  }
});

// **Export your custom test and expect** (do NOT re-export from Playwright)
export { crmTest as test, expect };
