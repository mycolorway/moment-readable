(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('moment-readable', ["moment"], function (a0) {
      return (root['readable'] = factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("moment"));
  } else {
    root.moment = root.moment || {};
    root.moment['readable'] = factory(moment);
  }
}(this, function (moment) {

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('moment-readable', ["moment"], function (a0) {
      return (root['readable'] = factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("moment"));
  } else {
    root.moment = root.moment || {};
    root.moment['readable'] = factory(moment);
  }
}(this, function (moment) {

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('moment-readable', ["moment"], function (a0) {
      return (root['readable'] = factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("moment"));
  } else {
    root.moment = root.moment || {};
    root.moment['readable'] = factory(moment);
  }
}(this, function (moment) {

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('moment-readable', ["moment"], function (a0) {
      return (root['readable'] = factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("moment"));
  } else {
    root.moment = root.moment || {};
    root.moment['readable'] = factory(moment);
  }
}(this, function (moment) {

(function (root, factory) {
  if (typeof define === 'function' && define.amd) {
    // AMD. Register as an anonymous module unless amdModuleId is set
    define('moment-readable', ["moment"], function (a0) {
      return (root['readable'] = factory(a0));
    });
  } else if (typeof exports === 'object') {
    // Node. Does not work with strict CommonJS, but
    // only CommonJS-like environments that support module.exports,
    // like Node.
    module.exports = factory(require("moment"));
  } else {
    root.moment = root.moment || {};
    root.moment['readable'] = factory(moment);
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
        var i, len, results;
        results = [];
        for (i = 0, len = weekdays.length; i < len; i++) {
          day = weekdays[i];
          results.push("This " + day);
        }
        return results;
      })(),
      nextWeekdays: (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = weekdays.length; i < len; i++) {
          day = weekdays[i];
          results.push("Next " + day);
        }
        return results;
      })(),
      lastWeekdays: (function() {
        var i, len, results;
        results = [];
        for (i = 0, len = weekdays.length; i < len; i++) {
          day = weekdays[i];
          results.push("Last " + day);
        }
        return results;
      })(),
      defaultFormat: 'MMM Do',
      defaultFormatWithYear: 'MMM Do, YYYY',
      justNow: 'just now'
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
      defaultFormatWithYear: 'YYYY年M月D日',
      justNow: '刚刚'
    }
  }
};

moment.readable.defineLocale = function(abbr, values) {
  var key, locale, ref, val;
  locale = moment.readable.locales[abbr];
  if (!locale) {
    locale = {};
    ref = moment.readable.locales['en'];
    for (key in ref) {
      val = ref[key];
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
    currentWeek: true,
    nextWeek: true,
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
  if (now.diff(this, 'minutes') < 1) {
    return locale.justNow;
  }
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

return readable;

}));

return readable;

}));

return readable;

}));

return readable;

}));

return readable;

}));
