import React from 'react';
import {inject, observer} from 'mobx-react';
import {Loading} from '../controls/loading';

@inject('editVM') @observer
export class EditView extends React.Component {

  componentDidMount() {
    let {editVM} = this.props;
    editVM.load();
  }

  renderIssue(issue) {
    return (
      <p key={issue.id}>{issue.id}</p>
    )
  }

  renderEdit() {
    let {editVM} = this.props;
    let issues = editVM.issues.map(issue => this.renderIssue(issue));
    return (
      <div>
        {issues}
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