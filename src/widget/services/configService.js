import {widgetStore} from '../stores/widget.store';

class ConfigService {
  init(dashboardApi) {
    this.api = dashboardApi;
  }

  getConfig() {
    return this.api.readConfig();
  }

  saveConfig(config) {
    return this.api.storeConfig(config)
      .then(() => widgetStore.setConfigMode(false, false))

  }


  setConfigMode(isEdit) {
    if (isEdit)
      this.api.enterConfigMode();
    else
      this.api.exitConfigMode();
  }

  saveMainIssue(mainIssueId) {
    return this.getConfig()
      .then(config => {
        return this.saveConfig({
          ...config,
          mainIssueId: mainIssueId
        });
      })
  }
}

export const configService = new ConfigService();