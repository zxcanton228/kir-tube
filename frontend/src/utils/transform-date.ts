import dayjs from 'dayjs'
import relativeDate from 'dayjs/plugin/relativeTime'

dayjs.extend(relativeDate)

export const transformDate = (date: string | Date): string => dayjs(date).fromNow()
