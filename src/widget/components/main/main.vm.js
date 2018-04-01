import {observable, action, computed} from 'mobx'
import moment from 'moment';
import {issueService} from '../../services/issueService';
import {getHref, getTitle} from '../../utils/issueUtils';
import {widgetStore} from '../../stores/widget.store';

class MainVM {
  @observable componentIsLoading = false;
  @observable isLoading = false;
  @observable mainIssue = null;
  @observable dates = [];
  @observable excludedDates = [];
  @observable error = null;
  @observable successMessage = null;

  @action
  setComponentLoading(value) {
    this.componentIsLoading = value;
  }

  @action
  setLoading(value) {
    this.isLoading = value;
  }

  @action
  setMainIssue(issue) {
    this.mainIssue = issue;
  }

  @action
  changeDates(range) {
    this.dates.replace(range);
    this.excludedDates.replace([]);
  }

  @action
  setError(text) {
    this.error = text;
  }

  @action
  setSuccess(text) {
    this.successMessage = text;
  }

  @computed
  get daysCount() {
    return this.filteredDates.length;
  }

  @computed
  get mainIssueData() {
    return {
      text: getTitle(this.mainIssue),
      href: getHref(this.mainIssue),
    }
  }

  @computed
  get filteredDates() {
    if (this.dates.length === 0)
      return [];
    let [start, end] = this.dates;
    let count = end.diff(start, 'days') + 1;
    let items = [];

    for (let i = 0; i < count; i++) {
      let date = start.clone().add(i, 'days');
      if (this.excludedDates.every(excludedDate => !excludedDate.isSame(date)))
        items.push(date)
    }
    return items;
  }

  @computed
  get previewItems() {
    return this.filteredDates.map(time => {
      return {
        key: time.valueOf(),
        title: time.format('MMM Do ddd')
      }
    });
  }

  load() {
    return issueService.getMainIssue()
      .then(issue => {
        this.setMainIssue(issue)
      })
      .catch(err => this.handleError(err))
      .finally(() => {
        this.setComponentLoading(false)
      })
  }

  logTime() {
    this.setLoading(true);
    if (this.dates.length > 0 || !this.mainIssue) {
      issueService.issueExists(this.mainIssue.id)
        .then(() => {
          return issueService.logTimeForRange(this.mainIssue.id, this.filteredDates)
        })
        .catch(err => this.handleError(err))
        .finally(() => {
          this.clearData();
          this.setSuccess('Vacations logged!');
          this.setLoading(false)
        })
    }
    else
      this.setLoading(false);
  }

  clearData() {
    this.changeDates([]);
  }

  handleError(err) {
    console.error(err);
    this.setError('Issue don\'t exists or other error. Please check logs.')
  }

  switchEditMode() {
    widgetStore.setConfigMode(true)
  }

  excludeDay(day) {
    this.excludedDates.push(moment(day))
  }

}

export const mainVM = new MainVM();