import {apiService} from './apiService';
import {issueStore} from '../stores/issue.store';
import moment from 'moment';

const GET_ISSUES_BY_ME_FILTER = 'rest/issue/byproject/VACATIONS?max=500';
const ISSUES_ENDPOINT = 'rest/issue';
const ISSUE_WORKTIME_ENDPOINT = id => `rest/issue/${id}/timetracking/workitem`;
const GET_ISSUE_BY_ID_ENDPOINT = id => `${ISSUES_ENDPOINT}/${id}`;
const ISSUE_EXISTS_ENDPOINT = id => `rest/issue/${id}/exists`;


class IssueService {
  getIssuesByCurrentUser() {
    return apiService.fetch(GET_ISSUES_BY_ME_FILTER)
      .then(data => issueStore.setIssues(data));
  }

  getMainIssue() {
    let id = issueStore.mainIssueId;
    if (!id)
      throw new Error('no main issue');

    return apiService.fetch(GET_ISSUE_BY_ID_ENDPOINT(id))
  }

  issueExists(issueId) {
    return apiService.fetch(ISSUE_EXISTS_ENDPOINT(issueId))
  }

  logTimeForRange(issueId, dates) {
    return Promise.all(dates.map(date => {
      return this.logTime(issueId, date.valueOf())
    }));
  }

  logTime(id, date) {
    let url = ISSUE_WORKTIME_ENDPOINT(id);
    return apiService.fetch(url, {
      method: 'post',
      body: {
        date: date,
        duration: 8 * 60,
        description: '',
        workType: {
          name: 'Vacation'
        }
      }
    })
  }
}

export const issueService = new IssueService();