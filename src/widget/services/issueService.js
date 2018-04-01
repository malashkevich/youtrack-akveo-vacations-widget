import {apiService} from './apiService';
import {issueStore} from '../stores/issue.store';

const GET_ISSUES_BY_ME_FILTER = 'project:%20Vacations%20and%20created%20by:%20me%20';
const ISSUES_ENDPOINT = 'rest/issue';
const ISSUE_WORKTIME_ENDPOINT = id => `rest/issue/${id}/timetracking/workitem`;


class IssueService {
  getIssuesByCurrentUser() {
    return apiService.fetch(`${ISSUES_ENDPOINT}?${GET_ISSUES_BY_ME_FILTER}`)
      .then(data => {
        issueStore.setIssues(data.issue);
      })
  }

  logTime(id) {
    let url = ISSUE_WORKTIME_ENDPOINT(id);
    return apiService.fetch(url, {
      method: 'post',
      body: {
        date: 1353316956611,
        duration: 240,
        description: '',
        workType: {
          name: 'Sick'
        }
      }
    })
  }
}

export const issueService = new IssueService();