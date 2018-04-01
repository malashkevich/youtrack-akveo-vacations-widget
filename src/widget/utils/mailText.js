import moment from 'moment'

const shortDescription = (start, end, countLogged, countOverall) =>
  `\nСобираюсь в отпуск с ${start.format('D.M.Y')} по ${end.format('D.M.Y')}.
  \nИтого дней: ${countOverall}
  \n---------------------
  \nЗалогано дней: ${countLogged}\n`;

const detailedDescription = table => `\nСписок дней:${table}`;

export function composeText(dates) {
  let start = moment.min(dates);
  let end = moment.max(dates);
  let countOverall = end.diff(start, 'days') + 1;
  let countLogged = dates.length;

  let short = shortDescription(start, end, countLogged, countOverall);
  let table = composeTable(dates);
  return `${short}${detailedDescription(table)}`;
}

function composeTable(dates) {
  return dates.map(date => `\n${date.format('MMMM Do YYYY, dddd')}`)
}