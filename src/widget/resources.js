const SERVICE_FIELDS = 'id,name,applicationName,homeUrl';
const HUB_USER_FIELDS = 'id,name,login,banned,banReason,profile(email/email,avatar/url)';

const SPRINT_FIELDS = 'id,name,start,finish';
const AGILE_FIELDS = `id,name,sprints(${SPRINT_FIELDS}),sprintsSettings(disableSprints,explicitQuery),columnSettings(field(id,name)),owner(id,ringId,fullName)`;
const SPRINT_BOARD_CELL_FIELDS = 'id,column(id),issues(id)';
const SPRINT_BOARD_ROW_FIELDS = `id,cells(${SPRINT_BOARD_CELL_FIELDS})`;
const SPRINT_BOARD_COLUMN_FIELDS = 'id,agileColumn(fieldValues(name,presentation),wipLimit(max,min))';
const SPRINT_BOARD_FIELDS = `id,name,columns(${SPRINT_BOARD_COLUMN_FIELDS}),swimlanes(${SPRINT_BOARD_ROW_FIELDS}),orphanRow(${SPRINT_BOARD_ROW_FIELDS})`;
const SPRINT_EXTENDED_FIELDS = `${SPRINT_FIELDS},board(${SPRINT_BOARD_FIELDS}),goal`;

export async function loadAgiles(fetchYouTrack) {
  return await fetchYouTrack(`api/agiles?fields=${AGILE_FIELDS}`);
}

export async function loadAgile(fetchYouTrack, agileId) {
  return await fetchYouTrack(`api/agiles/${agileId}?fields=${AGILE_FIELDS}`);
}

export async function loadExtendedSprintData(fetchYouTrack, boardId, sprintId) {
  return await fetchYouTrack(`api/agiles/${boardId}/sprints/${sprintId}?fields=${SPRINT_EXTENDED_FIELDS}`);
}

export async function getYouTrackServices(fetchHub) {
  const data = await fetchHub(`api/rest/services?fields=${SERVICE_FIELDS}`);
  return (data.services || []).filter(
    service => service.applicationName === 'YouTrack' && !!service.homeUrl
  );
}

export function getYouTrackService(fetchHub, youTrackId) {
 return getYouTrackServices(fetchHub).then(services => {
    if (youTrackId) {
      return services.filter(
        service => service.id === youTrackId
      )[0];
    }
    return services[0];
  })
}

export async function getHubUser(fetchHub, userHubId, profileBaseUrl) {
  const hubUser = await fetchHub(
    `api/rest/users/${userHubId}?fields=${HUB_USER_FIELDS}`
  );
  return {
    name: hubUser.name,
    login: hubUser.login,
    banned: hubUser.banned,
    banReason: hubUser.banReason,
    email: hubUser.profile.email && hubUser.profile.email.email,
    avatarUrl: hubUser.profile.avatar.url,
    href: `${profileBaseUrl}/users/${hubUser.id}`
  };
}