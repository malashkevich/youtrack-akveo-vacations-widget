import React from 'react';
import {inject, observer} from 'mobx-react';
import {Spin, Button} from 'antd';
import {Loading} from '../controls/loading';
import {IssuesTable} from './issuesTable';

@inject('editVM') @observer
export class EditView extends React.Component {

  componentDidMount() {
    let {editVM} = this.props;
    editVM.load();
  }

  renderEdit() {
    let {editVM} = this.props;
    let disabled = !editVM.hasMainIssue;
    return (
      <div>
        <h3>
          Vacation settings
          <h4>
            Choose your task for time logging.
          </h4>
        </h3>
        <IssuesTable
          issues={editVM.issues}
          onMainChange={editVM.setMainIssueId}
        />
        <Button
          disabled={disabled}
          onClick={() => editVM.saveMainIssue()}>Save</Button>
      </div>
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