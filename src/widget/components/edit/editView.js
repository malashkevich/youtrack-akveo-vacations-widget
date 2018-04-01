import React from 'react';
import {inject, observer} from 'mobx-react';
import {Header, Button} from 'semantic-ui-react';
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
        <Header as='h3'>
          Vacation settings
          <Header.Subheader>
            Choose your task for time logging.
          </Header.Subheader>
        </Header>
        <IssuesTable
          issues={editVM.issues}
          onMainChange={editVM.setMainIssueId}
        />
        <Button
          positive
          compact
          disabled={disabled}
          onClick={() => editVM.saveMainIssue()}>Save</Button>
      </div>
    )
  }

  renderContent() {
    let {editVM} = this.props;
    if (editVM.isLoading)
      return (<Loading/>);
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