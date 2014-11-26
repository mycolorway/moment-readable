weekdays = [
  'Sunday'
  'Monday'
  'Tuesday'
  'Wednesday'
  'Thursday'
  'Friday'
  'Saturday'
]

moment.readable =
  locales:
    "en":
      yesterday: 'Yesterday'
      tomorrow: 'Tomorrow'
      today: 'Today'
      thisWeek: 'This Week'
      nextWeek: 'Next Week'
      lastWeek: 'Last Week'
      thisWeekdays: ("This #{ day }" for day in weekdays)
      nextWeekdays: ("Next #{ day }" for day in weekdays)
      lastWeekdays: ("Last #{ day }" for day in weekdays)
      defaultFormat: 'MMM Do'
      defaultFormatWithYear: 'MMM Do, YYYY'
    "zh-cn":
      yesterday: '昨天'
      tomorrow: '明天'
      today: '今天'
      thisWeek: '本周'
      nextWeek: '下周'
      lastWeek: '上周'
      thisWeekdays: ['本周日', '本周一', '本周二', '本周三', '本周四', '本周五', '本周六']
      nextWeekdays: ['下周日', '下周一', '下周二', '下周三', '下周四', '下周五', '下周六']
      lastWeekdays: ['上周日', '上周一', '上周二', '上周三', '上周四', '上周五', '上周六']
      defaultFormat: 'M月D日'
      defaultFormatWithYear: 'YYYY年M月D日'

moment.readable.defineLocale = (abbr, values) ->
  locale = moment.readable.locales[abbr]

  unless locale
    locale = {}
    locale[key] = val for key, val of moment.readable.locales['en']

  locale[key] = val for key, val of values
  moment.readable.locales[abbr] = locale

moment.readable.localeData = (abbr) ->
  abbr = abbr or moment.locale() or 'en'
  moment.readable.locales[abbr]

moment.fn.readableDate = (opts) ->
  return '' unless this.isValid()

  defaultOpts =
    defaultFormat: false
    currentWeek: true
    nextWeek: true
    lastWeek: false

  defaultOpts[key] = val for key, val of opts
  opts = defaultOpts

  date = this.clone().startOf('day')

  if date._z
    today = moment.tz(date._z.name).startOf('d')
  else
    today = moment().startOf('day')

  tomorrow = today.clone().add(1, 'd')
  yesterday = today.clone().add(-1, 'd')
  todayOfNextWeek = today.clone().add(1, 'week')
  todayOfLastWeek = today.clone().add(-1, 'week')

  locale = moment.readable.localeData(this.locale())

  if date.isSame(today)
    return locale.today
  if date.isSame(tomorrow)
    return locale.tomorrow
  if date.isSame(yesterday)
    return locale.yesterday
  if opts.currentWeek and date.isSame(today, 'isoweek')
    return locale.thisWeekdays[date.isoWeekday() % 7]
  if opts.lastWeek and date.isSame(todayOfLastWeek, 'isoweek')
    return locale.lastWeekdays[date.isoWeekday() % 7]
  if opts.nextWeek and date.isSame(todayOfNextWeek, 'isoweek')
    return locale.nextWeekdays[date.isoWeekday() % 7]
  if opts.defaultFormat
    return date.format(opts.defaultFormat)
  unless date.isSame(today, 'year')
    return date.format(locale.defaultFormatWithYear)
  return date.format(locale.defaultFormat)

moment.fn.readableTime = (opts) ->
  return '' unless this.isValid()

  defaultOpts =
    threshold: 'd'

  defaultOpts[key] = val for key, val of opts
  opts = defaultOpts

  now = moment()
  now = now.tz(this._z.name) if this._z
  yesterday = now.clone().add(-1, 'day')

  locale = moment.readable.localeData(this.locale())

  return this.fromNow() if now.isSame(this, opts.threshold)
  return locale.yesterday if yesterday.isSame(this, 'day')
  return this.format(locale.defaultFormat) if this.isSame(now, 'year')
  return this.format(locale.defaultFormatWithYear)
