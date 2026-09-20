import { Page, Locator, BrowserContext, FrameLocator } from '@playwright/test'

/**
 * Interface defining reusable browser and UI interaction methods
 * for Playwright-based automation frameworks.
 */
export interface BrowserInteractions {

    /** The active Playwright Page instance. */
    page: Page;

    /** The browser context for the current session. */
    readonly context: BrowserContext;

    /**
     * Types text into an input field.
     */
    type(locator: Locator, name: string, data: string): Promise<void>;

    /**
     * Fills the field and presses Enter.
     */
    fillAndEnter(locator: Locator, name: string, data: string): Promise<void>;

    /**
     * Types text using keyboard events and presses Enter.
     */
    keyboardTypeAndEnter(locator: Locator, data: string): Promise<void>;

    /**
     * Clicks on an element when it becomes visible.
     */
    click(locator: Locator, name: string): Promise<void>;

    /**
     * Performs a forced click on an element (bypasses visibility checks).
     */
    forceClick(locator: Locator, name: string): Promise<void>;

    /**
     * Hovers over one element and clicks another (useful for menu navigation).
     */
    mouseHoverandClick(
        hoverlocator: Locator,
        clicklocator: Locator,
        Menu: string,
        name: string
    ): Promise<void>;

    /**
     * Performs a double-click on the given element.
     */
    doubleClick(locator: Locator, name: string): Promise<void>;

    /**
     * Hovers over an element.
     */
    mouseHover(hoverlocator: Locator, Menu: string): Promise<void>;

    /**
     * Drags an element to a target element.
     */
    dragAndDrop(sourcelocator: Locator, targetlocator: Locator): Promise<void>;

    /**
     * Waits until an element becomes visible on the UI.
     */
    waitForElementToVisible(locator: Locator, type: string): Promise<void>;

    /**
     * Waits until an element is not visible or removed from the DOM.
     */
    waitForElementToHidden(locator: Locator, type: string): Promise<void>;

    /**
     * Waits for a selector/locator to be attached or visible.
     */
    waitSelector(locator: Locator, name?: string): Promise<void>;

    /**
     * Selects an option from a dropdown by value, index, or label.
     */
    selectDropdown(
        locator: Locator,
        options: { value?: string; index?: number; label?: string }
    ): Promise<void>;

    /**
     * Accepts an alert and optionally validates its message.
     */
    acceptAlert(Data: string): Promise<void>;

    /**
     * Switches into an iframe using its selector and returns a FrameLocator.
     */
    switchToFrame(framelocator: string, name: string): Promise<FrameLocator>;

    /**
     * Returns the count of open browser windows/tabs.
     */
    multipleWindowsCount(): Promise<number>;

    /**
     * Switches to a browser window/tab based on its title and waits for a locator.
     */
    switchToWindow(windowTitle: string, locator: Locator): Promise<Page>;

    /**
     * Saves the current browser state (cookies, storage) to a file.
     */
    storeState(path: string): Promise<void>;

    /**
     * Loads the application URL and waits for network idle state.
     */
    loadApp(url: string): Promise<void>;

    /**
     * Returns the innerText of an element.
     */
    getInnerText(locator: Locator): Promise<string>;

    /**
     * Returns the textContent of an element.
     */
    getTextContent(locator: Locator): Promise<string | null | any>;

    /**
     * A unified method to get text from any type of element.
     */
    getText(locator: Locator): Promise<string>;

    /**
     * Returns the current page title.
     */
    getTitle(): Promise<string>;

    /**
     * Fetches the value of an attribute from an element.
     */
    fetchAttribute(locator: Locator, attName: string): Promise<string | null | undefined>;

    /**
     * Uploads a file using an <input type="file"> element.
     */
    uploadFile(locator: Locator, filePath: string): Promise<void>;

    /**
    * Checks the radio button or Checkbox element.
    */
    check(locator: Locator): Promise<void>;
}
