export function getTitle(issue) {
  if (!issue)
    return '';
  return issue.field.find(f => f.name === 'summary').value
}

export function getHref(issue) {
  if (!issue)
    return '';
  return `/youtrack/issue/${issue.id}`
}