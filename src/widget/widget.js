import React from 'react';
import {inject, observer} from 'mobx-react';
import {Spin} from 'antd';
import {EditComponent} from './components/edit/edit.component';
import {MainComponent} from './components/main/main.component';
import {widgetStore} from './stores/widget.store';

@inject('widgetStore') @observer
export class Widget extends React.Component {
  constructor(props) {
    super(props);
    const {registerWidgetApi} = props;
    registerWidgetApi({
      onConfigure: () => {
        widgetStore.setConfigMode(true);
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
      <EditComponent/>
    )
  }

  renderMain() {
    return (
      <MainComponent/>
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