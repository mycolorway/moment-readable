var moment;

if (typeof require !== "undefined" && require !== null) {
  moment = require('moment');
} else {
  moment = this.moment;
}

moment.readable = function(date, type, opts) {
  if (type === 'date') {
    return date.readableDate(opts);
  }
  return '';
};

moment.readable.locales = {
  "en": {
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    today: 'Today',
    thisWeek: 'This Week',
    nextWeek: 'Next Week',
    lastWeek: 'Last Week',
    thisWeekdays: ['This Sunday', 'This Monday', 'This Tuesday', 'This Wednesday', 'This Thursday', 'This Friday', 'This Saturday'],
    nextWeekdays: ['Next Sunday', 'Next Monday', 'Next Tuesday', 'Next Wednesday', 'Next Thursday', 'Next Friday', 'Next Saturday'],
    lastWeekdays: ['Last Sunday', 'Last Monday', 'Last Tuesday', 'Last Wednesday', 'Last Thursday', 'Last Friday', 'Last Saturday'],
    defaultFormat: 'MMM Do',
    defaultFormatWithYear: 'MMM Do, YYYY'
  },
  "zh-cn": {
    yesterday: '昨天',
    tomorrow: '明天',
    today: '今天',
    thisWeek: '本周',
    nextWeek: '下周',
    lastWeek: '上周',
    thisWeekdays: ['本周日', '本周一', '本周二', '本周三', '本周四', '本周五', '本周六'],
    nextWeekdays: ['下周日', '下周一', '下周二', '下周三', '下周四', '下周五', '下周六'],
    lastWeekdays: ['上周日', '上周一', '上周二', '上周三', '上周四', '上周五', '上周六'],
    defaultFormat: 'M月D日',
    defaultFormatWithYear: 'YYYY年M月D日'
  }
};

moment.readable.defineLocal = function(locale_abbr, opts) {
  var defaultOpts, key, val;
  defaultOpts = {
    yesterday: 'Yesterday',
    tomorrow: 'Tomorrow',
    today: 'Today',
    thisWeek: 'This Week',
    nextWeek: 'Next Week',
    lastWeek: 'Last Week',
    thisWeekdays: 'This Sunday_This Monday_This Tuesday_This Wednesday_This Thursday_This Friday_This Saturday',
    nextWeekdays: 'Next Sunday_Next Monday_Next Tuesday_Next Wednesday_Next Thursday_Next Friday_Next Saturday',
    lastWeekdays: 'Last Sunday_Last Monday_Last Tuesday_Last Wednesday_Last Thursday_Last Friday_Last Saturday',
    defaultFormat: 'MMM Do',
    defaultFormatWithYear: 'MMM Do, YYYY'
  };
  for (key in opts) {
    val = opts[key];
    defaultOpts[key] = val;
  }
  defaultOpts['thisWeekdays'] = defaultOpts['thisWeekdays'].split('_');
  defaultOpts['nextWeekdays'] = defaultOpts['nextWeekdays'].split('_');
  defaultOpts['lastWeekdays'] = defaultOpts['lastWeekdays'].split('_');
  return moment.readable.locales[locale_abbr] = defaultOpts;
};

moment.readable.getLocale = function(locale_abbr) {
  return moment.readable.locales[locale_abbr] || moment.readable.locales[moment.locale()] || moment.readable.locales['en'];
};

moment.fn.readableDate = function(opts) {
  var date, defaultOpts, key, locale, today, todayOfLastWeek, todayOfNextWeek, tomorrow, val, yesterday;
  if (!this.isValid()) {
    return '';
  }
  defaultOpts = {
    defaultFormat: false,
    currentWeek: false,
    nextWeek: false,
    lastWeek: false
  };
  for (key in opts) {
    val = opts[key];
    defaultOpts[key] = val;
  }
  opts = defaultOpts;
  date = this.clone().startOf('day');
  today = moment().startOf('day');
  if (date._z) {
    today = today.tz(date._z.name);
  }
  tomorrow = today.clone().add(1, 'd');
  yesterday = today.clone().add(-1, 'd');
  todayOfNextWeek = today.clone().add(1, 'week');
  todayOfLastWeek = today.clone().add(-1, 'week');
  locale = moment.readable.getLocale();
  if (date.isSame(today)) {
    return locale.today;
  }
  if (date.isSame(tomorrow)) {
    return locale.tomorrow;
  }
  if (date.isSame(yesterday)) {
    return locale.yesterday;
  }
  if (opts.currentWeek && date.isSame(today, 'isoweek')) {
    return locale.thisWeekdays[date.isoWeekday() % 7];
  }
  if (opts.lastWeek && date.isSame(todayOfLastWeek, 'isoweek')) {
    return locale.lastWeekdays[date.isoWeekday() % 7];
  }
  if (opts.nextWeek && date.isSame(todayOfNextWeek, 'isoweek')) {
    return locale.nextWeekdays[date.isoWeekday() % 7];
  }
  if (opts.defaultFormat) {
    return date.format(opts.defaultFormat);
  }
  if (!date.isSame(today, 'year')) {
    return date.format(locale.defaultFormatWithYear);
  }
  return date.format(locale.defaultFormat || locale.defaultFormatWithYear);
};

if (typeof module !== "undefined" && module !== null) {
  module.exports = moment;
} else {
  this.moment = moment;
}
