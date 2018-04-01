import {observable, action} from 'mobx';
import {apiService} from '../services/apiService';
import {issueService} from '../services/issueService';
import {configService} from '../services/configService';
import {issueStore} from './issue.store';
import {userService} from '../services/userService';


class WidgetStore {
  @observable configMode = false;
  @observable isLoading = false;
  @observable user = null;

  @action
  setLoading(value) {
    this.isLoading = value
  }

  @action
  setUser(user) {
    this.user = user;
  }

  @action
  setConfigMode(value, needCallWidgetAPI = true) {
    this.configMode = value;
    if (needCallWidgetAPI)
      configService.setConfigMode(value);
  }

  initWidget(api) {
    configService.init(api);
    return apiService.init(api)
      .then(() => userService.getUser())
      .then(() => configService.getConfig())
      .then(config => {
        if (!config) {
          console.log('No configuration yet');
          this.setConfigMode(true);
        } else {
          console.log('Config exists');
          issueStore.setMain(config.mainIssueId);
        }
      })
  }
}

export const widgetStore = new WidgetStore();