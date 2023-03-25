import moment from 'moment-timezone'

export function convertTimezone(date: Date, fromTimezone: string, toTimezone: string): Date {
  const momentDate = moment(date).tz(fromTimezone)
  return momentDate.clone().tz(toTimezone).toDate()
}
