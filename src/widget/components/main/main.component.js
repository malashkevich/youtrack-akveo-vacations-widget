import React from 'react';
import {inject, observer} from 'mobx-react'
import {Alert, Spin, Steps} from 'antd';
import {SelectDatesComponent} from './selectDates.component';
import {ExcludeDatesComponent} from './excludeDates.component';
import {ComposeEmailComponent} from './composeEmail.component';

const Step = Steps.Step;

const steps = [{
  title: 'Select dates',
  content: 'select-dates',
}, {
  title: 'Exclude if necessary',
  content: 'dates-exclude',
}, {
  title: 'Write email',
  content: 'send-email',
}];

@inject('mainVM') @observer
export class MainComponent extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      step: 0,
    };
  }

  next() {
    const step = this.state.step + 1;
    this.setState({step});
  }

  prev() {
    const step = this.state.step - 1;
    this.setState({step});
  }

  reset() {
    this.setState({step: 0})
  }

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

  renderSelectDates() {
    let {mainVM} = this.props;
    let nextEnabled = mainVM.dates.length > 0;
    return (
      <SelectDatesComponent
        issueData={mainVM.mainIssueData}
        daysCount={mainVM.daysCount}
        dateRange={mainVM.dates}
        nextEnabled={nextEnabled}
        changeDates={range => mainVM.changeDates(range)}
        next={() => this.next()}
      />
    )
  }

  renderExclude() {
    let {mainVM} = this.props;
    let nextEnabled = mainVM.dates.length > 0;
    let next = () => {
      mainVM.logTime()
        .then(result => result && this.next())
    };

    return (
      <ExcludeDatesComponent
        daysCount={mainVM.daysCount}
        previewItems={mainVM.previewItems}
        excludeDay={day => mainVM.excludeDay(day)}
        next={() => next()}
        prev={() => this.prev()}
        isLoading={mainVM.isLoading}
        nextEnabled={nextEnabled}
      />
    )
  }

  renderEmail() {
    return (
      <ComposeEmailComponent reset={() => this.reset()}/>
    )
  }

  renderStep() {
    switch (this.state.step) {
      case 0:
        return this.renderSelectDates();
      case 1:
        return this.renderExclude();
      default:
        return this.renderEmail();
    }
  }

  render() {
    let {mainVM} = this.props;

    if (mainVM.componentIsLoading)
      return <Spin/>;

    if (mainVM.error)
      return this.renderError();


    const {step} = this.state;
    return (
      <div>
        <Steps size='small' current={step}>
          {steps.map(item => <Step key={item.title} title={item.title}/>)}
        </Steps>
        {this.renderStep()}
      </div>
    )
  }
}

/*
* <Card title='Vacation logger'>
        {this.renderMessages()}
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
      </Card>
* */