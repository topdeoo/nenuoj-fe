import formatDistanceToNow from 'date-fns/formatDistanceToNow'
import toDate from 'date-fns/toDate'
import format from 'date-fns/format'

export function formate (value: number) {
  const num = value * 100
  return `${num.toFixed(2)}%`
}

export function timePretty (time: number | string = 0) {
  return format(toDate(parseInt(`${time}`)), 'yyyy-MM-dd HH:mm:ss')
}

export function timeagoPretty (time: number | string) {
  return formatDistanceToNow(toDate(parseInt(`${time}`)))
}

export function timeContest (time: number) {
  const h = Math.floor(time / (1000 * 60 * 60))
  const m = Math.floor((time - h * 1000 * 60 * 60) / (1000 * 60))
  const s = Math.floor((time - h * 1000 * 60 * 60 - m * 1000 * 60) / 1000)
  const ss = String(s).padStart(2, '0')
  const mm = String(m).padStart(2, '0')
  return `${h}:${mm}:${ss}`
}
