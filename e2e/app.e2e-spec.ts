import { MefClientPage } from './app.po';

describe('mef-client App', () => {
  let page: MefClientPage;

  beforeEach(() => {
    page = new MefClientPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
