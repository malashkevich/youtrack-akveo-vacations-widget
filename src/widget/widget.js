import React from 'react';
import {inject, observer} from 'mobx-react';
import {Spin} from 'antd';
import {EditView} from './components/edit/editView';
import {MainView} from './components/main/mainView';
import {widgetStore} from './stores/widget.store';

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

  componentWillMount() {
    widgetStore.setLoading(true)
  }

  componentDidMount() {
    let {dashboardApi, widgetStore} = this.props;
    widgetStore.initWidget(dashboardApi)
      .finally(() => widgetStore.setLoading(false))
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
        {widgetStore.isLoading && <Spin size='large'/>}
        {!widgetStore.isLoading && content}
      </div>
    )
  }
}