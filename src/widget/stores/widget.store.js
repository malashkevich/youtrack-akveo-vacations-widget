import {observable, action} from 'mobx';
import {apiService} from '../services/apiService';
import {issueService} from '../services/issueService';
import {configService} from '../services/configService';


class WidgetStore {
  @observable configMode = false;

  @action
  setConfigMode(value) {
    this.configMode = value;
    configService.setConfigMode(value);
  }

  initWidget(api) {
    configService.init(api);
    return apiService.init(api)
      .then(configService.getConfig())
      .then(config => {
        if (!config) {
          console.log('No configuration yet');
          this.setConfigMode(true);
        } else {

        }
      })
  }
}

export const widgetStore = new WidgetStore();