import {observable, computed, action} from 'mobx';

class IssueStore {
  @observable issues = [];

  @observable mainIssue = null;

  @action
  setIssues(issues) {
    this.issues.replace(issues);
  }

  @action
  setMain(issue) {
    this.mainIssue = issue;
  }
}

export const issueStore = new IssueStore();