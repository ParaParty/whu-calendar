declare global {
  interface Date {
    convertToICSDate(): [number, number, number]
    addDay(day: number): Date
    addWeek(week: number): Date
  }
}

import { nanoid } from 'nanoid'

Date.prototype.convertToICSDate = function (): [number, number, number] {
  let year = this.getFullYear()
  let month = this.getMonth() + 1
  let date = this.getDate()
  return [year, month, date]
}

Date.prototype.addDay = function (i: number): Date {
  return new Date(this.getTime() + i * 86400 * 1000)
}

Date.prototype.addWeek = function (i: number): Date {
  return this.addDay(i * 7)
}

export function uidGenerateFactory(base?: string): (s?: string) => string {
  if (base === null || base?.length == 0) {
    base = __filename
  }

  return (s) => {
    if (s === null || s?.length == 0) {
      s = nanoid()
    }
    return `${base}-${s}`
  }
}
