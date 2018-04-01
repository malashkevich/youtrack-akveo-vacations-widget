const YOUTRACK_APPNAME = 'YouTrack';
const SERVICE_FIELDS = 'id,name,applicationName,homeUrl';
const SERVICES_ENDPOINT = `api/rest/services?fields=${SERVICE_FIELDS}`;

class ApiService {
  init(dashboardApi) {
    if (!dashboardApi)
      return;

    this.dashboardApi = dashboardApi;
    this.service = null;
    return this.prepareService()
      .then(() => console.log('Services initialized.'))
      .catch(err => console.log(`Init error: ${err}`))
  }

  prepareService() {
    return this.dashboardApi.readConfig()
      .then(config => {
        return this.getYouTrack(config)
      })
      .then(service => {
        return this.saveService(service)
      })
  }

  getYouTrack(config) {
    const configYouTrackId = config && config.youTrack && config.youTrack.id;
    const fetchHub = this.dashboardApi.fetchHub.bind(this.dashboardApi);
    return this.getYouTrackService(fetchHub, configYouTrackId);
  }

  saveService(service) {
    if (service && service.id) {
      this.service = service;
    }
  }

  getYouTrackService(fetchHub, youTrackId) {
    return this.getYouTrackServices(fetchHub).then(services => {
      if (youTrackId) {
        return services.filter(
          service => service.id === youTrackId
        )[0];
      }
      return services[0];
    })
  }

  getYouTrackServices(fetchHub) {
    return fetchHub(SERVICES_ENDPOINT)
      .then(data => {
        return (data.services || []).filter(
          service => service.applicationName === YOUTRACK_APPNAME && !!service.homeUrl
        );
      })
  }

  fetch(url, params) {
      return this.dashboardApi.fetch(this.service.id, url, params);
  };
}


export const apiService = new ApiService();