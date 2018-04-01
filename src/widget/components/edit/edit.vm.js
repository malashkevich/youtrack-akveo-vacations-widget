import {observable, action, computed} from 'mobx';
import {issueService} from '../../services/issueService';
import {issueStore} from '../../stores/issue.store';
import {configService} from '../../services/configService';
import {getTitle} from '../../utils/issueUtils';

class EditVM {
  @observable isLoading = false;

  @action
  setLoading(value) {
    this.isLoading = value;
  }

  @computed
  get issues() {
    return issueStore.issues.map(issue => {
      return {
        id: issue.id,
        title: getTitle(issue),
        isMain: issueStore.mainIssueId === issue.id
      }
    })
  }

  @computed
  get hasMainIssue() {
    return !!issueStore.mainIssueId
  }

  @action
  setMainIssueId(id) {
    issueStore.mainIssueId = id;
  }

  saveMainIssue() {
    this.setLoading(true);
    return configService.saveMainIssue(issueStore.mainIssueId)
      .finally(() => this.setLoading(false))
  }

  load() {
    this.setLoading(true);
    issueService.getIssuesByCurrentUser()
      .finally(() => this.setLoading(false))

  }
}

export const editVM = new EditVM();