const to = 'mailto:vacation.requests@akveo.com';
const subject = user => `Отпуск для ${user}`;
const text = body => `Привет. Я хочу в отпуск.\n${body}`;


const encode = encodeURIComponent;

export function getMailtoUrl(user = 'test', body) {
  const link = [];

  if (subject) {
    link.push(`subject=${encode(subject(user))}`);
  }
  if (body) {
    link.push(`body=${encode(text(body))}`);
  }
  return `${to}?${link.join('&')}`;
}

export function getGmailMailto(user = 'test', body) {
//  https://mail.google.com/mail/?view=cm&fs=1&to=someone@example.com&su=SUBJECT&body=BODY&bcc=someone.else@example.com

  const link = [];

  if (subject) {
    link.push(`subject=${encode(subject(user))}`);
  }
  if (body) {
    link.push(`body=${encode(text(body))}`);
  }
  return `${to}?${link.join('&')}`;
}