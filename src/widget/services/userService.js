import {apiService} from './apiService';
import {widgetStore} from '../stores/widget.store';

const GET_CURRENT_USER = 'rest/user/current';

class UserService {
  getUser() {
    return apiService.fetch(GET_CURRENT_USER)
      .then(user => {
        widgetStore.setUser(user);
        return user;
      })
  }
}

export const userService = new UserService();