import { Locator, Page, BrowserContext, test, FrameLocator } from '@playwright/test';
import { BrowserInteractions } from './BrowserInteractions';
import path from 'path';

export abstract class BrowserInteractionsImpl implements BrowserInteractions {
    page: Page;
    readonly context: BrowserContext;

    constructor(page: Page, context: BrowserContext) {
        this.page = page;
        this.context = context;
    }

    /**
     * Types text into a textbox after clearing existing text.
     */
    async type(locator: Locator, data: string, name: string) {
        await test.step(`Typing "${data}" into textbox: ${name}`, async () => {
            await locator.clear();
            await locator.fill(data);
        });
    }

    /**
     * Types text, clears existing value, and presses Enter.
     */
    async fillAndEnter(locator: Locator, data: string, name: string) {
        await test.step(`Typing "${data}" and pressing ENTER on: ${name}`, async () => {
            await locator.clear();
            await locator.fill(data, { force: true });
            await locator.focus();
            await this.page.keyboard.press("Enter");
        });
    }

    /**
     * Types text using keyboard events and presses Enter.
     */
    async keyboardTypeAndEnter(locator: Locator, data: string) {
        await test.step(`Keyboard typing "${data}" and pressing ENTER`, async () => {
            await locator.clear();
            await locator.focus();
            await this.page.keyboard.type(data, { delay: 100 });
            await this.page.keyboard.press("Enter");
        });
    }

    /**
     * Clicks an element.
     */
    async click(locator: Locator, name: string) {
        await test.step(`Clicking on : ${name}`, async () => {
            await locator.waitFor({ state: 'visible' });
            await locator.click();
        });
    }

    /**
     * Force clicks an element.
     */
    async forceClick(locator: Locator, name: string) {
        await test.step(`Force clicking on : ${name}`, async () => {
            await locator.waitFor({ state: 'visible' });
            await locator.click({ force: true });
        });
    }

    /**
     * Saves browser storage state.
     */
    async storeState(path: string): Promise<void> {
        await test.step(`Saving storage state to: ${path}`, async () => {
            await this.context.storageState({ path });
        });
    }

    /**
     * Loads an application URL.
     */
    async loadApp(url: string) {
        await test.step(`Navigating to URL: ${url}`, async () => {
            await this.page.goto(url);
        });
    }

    /**
     * Returns innerText of an element.
     */
    async getInnerText(locator: Locator): Promise<string> {
        return await test.step(`Fetching innerText`, async () => {
            return locator.innerText();
        });
    }

    /**
     * Returns textContent of an element.
     */
    async getTextContent(locator: Locator): Promise<string | null> {
        return await test.step(`Fetching textContent`, async () => {
            return locator.textContent();
        });
    }

    /**
     * Returns input value of an element.
     */
    async getText(locator: Locator): Promise<string> {
        return await test.step(`Fetching input value`, async () => {
            return locator.inputValue();
        });
    }

    /**
     * Gets the page title after load.
     */
    async getTitle(): Promise<string> {
        return await test.step(`Getting page title`, async () => {
            await this.page.waitForLoadState('load');
            return this.page.title();
        });
    }

    /**
     * Waits for a selector to be attached.
     */
    async waitSelector(locator: Locator, name: string = "Element") {
        await test.step(`Waiting for selector: ${name}`, async () => {
            await locator.waitFor({ timeout: 30000, state: "attached" });
        });
    }

    /**
     * Fetches the value of an attribute.
     */
    async fetchAttribute(locator: Locator, attName: string): Promise<string | null> {
        return await test.step(`Fetching attribute "${attName}"`, async () => {
            return locator.getAttribute(attName);
        });
    }

    /**
     * Returns the number of open windows.
     */
    async multipleWindowsCount(): Promise<number> {
        return await test.step(`Fetching window count`, async () => {
            return this.page.context().pages().length;
        });
    }

    /**
     * Switches to a new window based on title.
     */
    async switchToWindow(windowTitle: string, locator: Locator): Promise<Page> {
        return await test.step(`Switching to window: ${windowTitle}`, async () => {
            const [newPage] = await Promise.all([
                this.context.waitForEvent('page'),
                locator.click()
            ]);
            for (const page of newPage.context().pages()) {
                if ((await page.title()).includes(windowTitle)) {
                    await page.bringToFront();
                    return page;
                }
            }
            throw new Error(`New page with title: ${windowTitle} not displayed`);
        });
    }

    async switchToExistingWindow(windowTitle: string): Promise<Page> {
    for (const page of this.context.pages()) {
        if ((await page.title()).includes(windowTitle)) {
            await page.bringToFront();
            return page;
        }
    }
    throw new Error(`Window with title '${windowTitle}' not found`);
}

    /**
     * Handles browser alert and accepts it.
     */
    async acceptAlert(Data: string) {
        await test.step(`Accepting alert with data: ${Data}`, async () => {
            this.page.on("dialog", async (dialog) => {
                await dialog.accept(Data);
            });
        });
    }

    /**
     * Switches to an iframe and returns FrameLocator.
     */
    async switchToFrame(framelocator: string, name: string): Promise<FrameLocator> {
        return await test.step(`Switching to frame: ${name}`, async () => {
            await this.page.waitForSelector(framelocator, { state: "attached", timeout: 5000 });
            return this.page.frameLocator(framelocator);
        });
    }

    /**
     * Hover → Click action.
     */
    async mouseHoverandClick(locator: Locator, clicklocator: Locator, menu: string, name: string) {
        await test.step(`Hover and click on ${menu} → ${name}`, async () => {
            await locator.hover();
            await clicklocator.click();
        });
    }

    /**
     * Selects dropdown option by value/index/label.
     */
    async selectDropdown(locator: Locator, options: { value?: string; index?: number; label?: string }) {
        await test.step(`Selecting dropdown option`, async () => {
            await locator.selectOption(options);
        });
    }

    /**
     * Mouse hover.
     */
    async mouseHover(locator: Locator, menu: string) {
        await test.step(`Hovering over: ${menu}`, async () => {
            await locator.hover();
        });
    }

    /**
     * Drags one element to another.
     */
    async dragAndDrop(sourceLocator: Locator, targetLocator: Locator) {
        await test.step(`Dragging element to target`, async () => {
            await sourceLocator.waitFor({ state: 'visible' });
            await targetLocator.waitFor({ state: 'visible' });
            await sourceLocator.dragTo(targetLocator);
        });
    }

    /**
     * Double click.
     */
    async doubleClick(locator: Locator, name: string) {
        await test.step(`Double clicking: ${name}`, async () => {
            await locator.dblclick({ force: true });
        });
    }

    /**
     * Waits for element to become visible.
     */
    async waitForElementToVisible(locator: Locator, name: string) {
        await test.step(`Waiting for element to become visible: ${name}`, async () => {
            await locator.waitFor({ state: 'visible', timeout: 20000 });
        });
    }

    /**
     * Waits for element to become hidden.
     */
    async waitForElementToHidden(locator: Locator, name: string) {
        await test.step(`Waiting for element to become hidden: ${name}`, async () => {
            await locator.waitFor({ state: 'hidden', timeout: 20000 });
        });
    }

    /**
     * Uploads a file using <input type="file"> element.
     */
    async uploadFile(locator: Locator, filePath: string) {
        await test.step(`Uploading file: ${filePath}`, async () => {
            const absolutePath = path.resolve(__dirname, filePath);
            await locator.waitFor({ state: 'visible' });
            await locator.setInputFiles(absolutePath);
        });
    }

    /**
    * Download a file element.
    */
    async downloadFile(locator: Locator): Promise<void> {
        const downPromise = this.page.waitForEvent('download');
        await this.click(locator, 'Download');
        const downFile = await downPromise;
        await downFile.saveAs('../resources/' + downFile.suggestedFilename());
    }

    /**
     * Radio button or Checkbox
     */
    async check(locator: Locator): Promise<void> {
        await locator.check();
    }



}
