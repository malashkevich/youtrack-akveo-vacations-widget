import React from 'react';
import {inject, observer} from 'mobx-react'
import {Alert, Spin} from 'antd';
import {Link} from '../controls/link';
import {TimeLogger} from './timeLogger';

@inject('mainVM') @observer
export class MainView extends React.Component {

  componentWillMount() {
    let {mainVM} = this.props;
    mainVM.setComponentLoading(true);
  }

  componentDidMount() {
    let {mainVM} = this.props;
    mainVM.load()
  }

  renderError() {
    let {mainVM} = this.props;
    if (mainVM.error)
      return <Alert
        message='Error'
        description={mainVM.error}
        type='error' closable
        afterClose={() => {
          mainVM.setError(null);
          mainVM.switchEditMode()
        }}/>
  }

  renderMessages() {
    let {mainVM} = this.props;
    if (mainVM.successMessage)
      return <Alert message={mainVM.successMessage} type='success' closable
                    afterClose={() => mainVM.setSuccess(null)}/>
  }

  render() {
    let {mainVM} = this.props;

    if (mainVM.componentIsLoading)
      return <Spin/>;

    if (mainVM.error)
      return this.renderError();


    let issueData = mainVM.mainIssueData;

    return (
      <div>
        {this.renderMessages()}
        <h2> Vacation logger </h2>
        <h4> Select dates and log your vacations! </h4>
        <div>
          <p> This is your issue for logging: <Link {...issueData} /></p>
        </div>
        <div>
          <TimeLogger
            isLoading={mainVM.isLoading}
            dateRange={mainVM.dates}
            daysCount={mainVM.daysCount}
            previewItems={mainVM.previewItems}
            logTime={() => mainVM.logTime()}
            onDatesChange={range => mainVM.changeDates(range)}
            excludeDay={day => mainVM.excludeDay(day)}/>
        </div>
      </div>
    )
  }
}