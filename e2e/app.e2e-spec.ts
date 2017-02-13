import { MefNgPage } from './app.po';

describe('mef-ng App', function() {
  let page: MefNgPage;

  beforeEach(() => {
    page = new MefNgPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
