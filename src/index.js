/* eslint-disable no-undef */
import React from 'react';
import {render} from 'react-dom';
import DashboardAddons from 'hub-dashboard-addons';
import {Widget} from './widget/widget';
import {Provider} from 'mobx-react';
import './index.css';
import registerServiceWorker from './registerServiceWorker';
import {stores} from './widget/stores/index';

DashboardAddons.registerWidget((dashboardApi, registerWidgetApi) => {
  render(
    <Provider {...stores}>
      <Widget
        dashboardApi={dashboardApi}
        registerWidgetApi={registerWidgetApi}
      />
    </Provider>,
    document.getElementById('root')
  );
});
registerServiceWorker();
