import React from 'react';
import {inject, observer} from 'mobx-react';
import {Container} from 'semantic-ui-react'
import {apiService} from './services/apiService';
import {issueService} from './services/issueService';
import {EditView} from './components/edit/editView';
import {MainView} from './components/mainView';

@inject('widgetStore') @observer
export class Widget extends React.Component {
  constructor(props) {
    super(props);
    const {registerWidgetApi} = props;
    registerWidgetApi({
      //onConfigure: () => this.setState({isConfiguring: true}),
      onRefresh: async () => {
        // await this.loadSelectedSprintData();
        // this.updateTitle();
      }
    })
  }

  componentDidMount() {
    let {dashboardApi, widgetStore} = this.props;
    widgetStore.initWidget(dashboardApi);
  }

  renderEdit() {
    return (
      <EditView/>
    )
  }

  renderMain() {
    return (
      <MainView/>
    )
  }

  render() {
    let {widgetStore} = this.props;
    let content = widgetStore.configMode ? this.renderEdit() : this.renderMain();
    return (
      <div>
        {content}
      </div>
    )
  }
}