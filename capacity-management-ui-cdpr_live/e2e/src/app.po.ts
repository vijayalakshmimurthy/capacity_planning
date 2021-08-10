import { browser, by, element } from 'protractor';
/** browser */
export class AppPage {
  /** navigation */
  navigateTo() {
    return browser.get(browser.baseUrl) as Promise<any>;
  }
/** get app-root */
  getTitleText() {
    return element(by.css('app-root h1')).getText() as Promise<string>;
  }
}
