import {observable, action, computed} from 'mobx';
import {issueService} from '../../services/issueService';
import {issueStore} from '../../stores/issue.store';

class EditVM {
  @observable isLoading = false;

  @action
  setLoading(value) {
    this.isLoading = value;
  }

  @computed
  get issues() {
    return issueStore.issues;
  }

  load() {
    this.setLoading(true);
    issueService.getIssuesByCurrentUser()
      .finally(() => this.setLoading(false))

  }
}

export const editVM = new EditVM();