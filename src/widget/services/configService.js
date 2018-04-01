class ConfigService {
  init(dashboardApi) {
    this.api = dashboardApi;
  }

  getConfig() {
    return this.api.readConfig();
  }

  setConfigMode(isEdit) {
    if (isEdit)
      this.api.enterConfigMode();
    else
      this.api.exitConfigMode();
  }
}

export const configService = new ConfigService();