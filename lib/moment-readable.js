(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module.
    define('simple-template', ["moment"], function (moment) {
      return (root.returnExportsGlobal = factory(moment));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like enviroments that support module.exports,
    // like Node.
    module.exports = factory(require("moment"));
  } else {
    root.moment = factory(moment);
  }
}(this, function (moment) {

var day, weekdays;

weekdays = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];

moment.readable = {
  locales: {
    "en": {
      yesterday: 'Yesterday',
      tomorrow: 'Tomorrow',
      today: 'Today',
      thisWeek: 'This Week',
      nextWeek: 'Next Week',
      lastWeek: 'Last Week',
      thisWeekdays: (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = weekdays.length; _i < _len; _i++) {
          day = weekdays[_i];
          _results.push("This " + day);
        }
        return _results;
      })(),
      nextWeekdays: (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = weekdays.length; _i < _len; _i++) {
          day = weekdays[_i];
          _results.push("Next " + day);
        }
        return _results;
      })(),
      lastWeekdays: (function() {
        var _i, _len, _results;
        _results = [];
        for (_i = 0, _len = weekdays.length; _i < _len; _i++) {
          day = weekdays[_i];
          _results.push("Last " + day);
        }
        return _results;
      })(),
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
  }
};

moment.readable.defineLocale = function(abbr, values) {
  var key, locale, val, _ref;
  locale = moment.readable.locales[abbr];
  if (!locale) {
    locale = {};
    _ref = moment.readable.locales['en'];
    for (key in _ref) {
      val = _ref[key];
      locale[key] = val;
    }
  }
  for (key in values) {
    val = values[key];
    locale[key] = val;
  }
  return moment.readable.locales[abbr] = locale;
};

moment.readable.localeData = function(abbr) {
  abbr = abbr || moment.locale() || 'en';
  return moment.readable.locales[abbr];
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
  if (date._z) {
    today = moment.tz(date._z.name).startOf('d');
  } else {
    today = moment().startOf('day');
  }
  tomorrow = today.clone().add(1, 'd');
  yesterday = today.clone().add(-1, 'd');
  todayOfNextWeek = today.clone().add(1, 'week');
  todayOfLastWeek = today.clone().add(-1, 'week');
  locale = moment.readable.localeData(this.locale());
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
  return date.format(locale.defaultFormat);
};

moment.fn.readableTime = function(opts) {
  var defaultOpts, key, locale, now, val, yesterday;
  if (!this.isValid()) {
    return '';
  }
  defaultOpts = {
    threshold: 'd'
  };
  for (key in opts) {
    val = opts[key];
    defaultOpts[key] = val;
  }
  opts = defaultOpts;
  now = moment();
  if (this._z) {
    now = now.tz(this._z.name);
  }
  yesterday = now.clone().add(-1, 'day');
  locale = moment.readable.localeData(this.locale());
  if (now.isSame(this, opts.threshold)) {
    return this.fromNow();
  }
  if (yesterday.isSame(this, 'day')) {
    return locale.yesterday;
  }
  if (this.isSame(now, 'year')) {
    return this.format(locale.defaultFormat);
  }
  return this.format(locale.defaultFormatWithYear);
};


return moment;


}));