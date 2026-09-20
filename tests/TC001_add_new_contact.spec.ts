import { expect, test } from '../customFixtures/crmFixtures.ts';
import { ExcelReader } from '../utils/excelUtils';
import { FakerData } from '../utils/fakerUtils';
import { appConstants } from '../constants/appConstants';
import path from 'path';
 

test('Add New Contact and Verify', async ({ addContactDetailsPage, contactsLeadsPage }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Arpitha' },
        { type: 'TestCase', description: 'Add new contact and verify its displayed' },
        { type: 'Test Description', description: "Verifying newly created contact is displayed in contact leads page" }
    );

     const filePath = path.resolve(__dirname, '../resources/testdata.xlsx');
    const excelReader = new ExcelReader(filePath);
    const excelData = excelReader.getRowByTestcase('contact', 'TC_ID', 'TC_001');

    const contactName = FakerData.getFirstName();
    await addContactDetailsPage.enterName(contactName);
    await addContactDetailsPage.enterEmail(FakerData.getEmail());
    await addContactDetailsPage.enterPhoneNumber(excelData.PHONE_NUMBER);
    await addContactDetailsPage.enterCompany(FakerData.company());
    await addContactDetailsPage.selectGender(excelData.GENDER);
    await addContactDetailsPage.selectStatus(appConstants.Status.Active);
    await addContactDetailsPage.selectContactSorce(appConstants.Contact_Source.Email_Campaign);
    await addContactDetailsPage.enterleadScore(excelData.LEAD_SCORE);
    await addContactDetailsPage.enterDeals(excelData.DEALS);
    await addContactDetailsPage.enterTotalValue(excelData.TOTAL_VALUE);
    await addContactDetailsPage.selectInterestedServices(appConstants.Interested_Services.Marketing);
    await addContactDetailsPage.selectPriority(appConstants.Priority.High);
    await addContactDetailsPage.enterLastContact(excelData.LAST_CONTACT);
    await addContactDetailsPage.enterNotes(excelData.DESCRIPTION);
    await addContactDetailsPage.clickAddButton();

    const contactsPage = await contactsLeadsPage.switchBackToContactsPage();
    await expect(await contactsPage.getFirstContactName()).toHaveText(contactName);
 
});

