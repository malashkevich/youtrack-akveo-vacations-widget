import {observable, computed, action} from 'mobx';

class IssueStore {
  @observable issues = [];

  @observable mainIssueId = null;

  @action
  setIssues(issues) {
    this.issues.replace(issues);
  }

  @action
  setMain(id) {
    this.mainIssueId = id;
  }
}

export const issueStore = new IssueStore();