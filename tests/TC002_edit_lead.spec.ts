import { expect, test } from '../customFixtures/crmFixtures';
import { ExcelReader } from '../utils/excelUtils';
import { FakerData } from '../utils/fakerUtils';
import { appConstants } from '../constants/appConstants';


test('Edit Contact and Verify', async ({ addContactDetailsPage, contactsLeadsPage }) => {
    test.info().annotations.push(
        { type: 'Author', description: 'Vishnu' },
        { type: 'TestCase', description: 'Edit contact and verify its updated' },
        { type: 'Test Description', description: "Verifying edited contact details are updated in contact leads page" }
    );

    const excelReader = new ExcelReader('.../resources/testdata.xlsx');
    const excelData = excelReader.getRowByTestcase('contact', 'TC_ID', 'TC_002');

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

    // const actualContactName = await contactsPage.getFirstContactName();
    // expect(actualContactName).toContain(contactName);

    await expect(await contactsPage.getFirstContactName()).toHaveText(contactName);
    //await page.pause();
});

