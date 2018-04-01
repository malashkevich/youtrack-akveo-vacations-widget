import React from 'react';
import {inject, observer} from 'mobx-react';
import {Spin, Button, Card, Divider, Row} from 'antd';
import {IssuesTableComponent} from './issuesTable.component';

@inject('editVM') @observer
export class EditComponent extends React.Component {

  componentDidMount() {
    let {editVM} = this.props;
    editVM.load();
  }

  renderEdit() {
    let {editVM} = this.props;
    let disabled = !editVM.hasMainIssue;
    return (
      <Card title='Choose task for logging vacations'>
        <div>
          <IssuesTableComponent
            issues={editVM.issues}
            mainIssueId={editVM.mainIssueId}
            onMainChange={editVM.setMainIssueId}
          />
          <Divider dashed={true}/>
          <Row type='flex' justify='end'>
            <Button
              type='primary'
              disabled={disabled}
              onClick={() => editVM.saveMainIssue()}>Save</Button>
          </Row>
        </div>
      </Card>
    )
  }

  renderContent() {
    let {editVM} = this.props;
    if (editVM.isLoading)
      return (<Spin/>);
    else
      return this.renderEdit()
  }

  render() {
    return (
      <div>
        {this.renderContent()}
      </div>
    )

  }
}