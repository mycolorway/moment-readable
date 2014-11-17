(function() {
  moment.locale('zh-cn');

  describe('readableDate', function() {
    var anotherDayOfWeek, anotherWeekday, date, dayOfWeek, lastWeek, nextWeek, shortWeekdays, someDay, thisWeek, today, tomorrow, weekday, yesterday;
    date = moment();
    today = date.clone().startOf('day');
    yesterday = date.clone().add('day', -1);
    tomorrow = date.clone().add('day', 1);
    thisWeek = date.clone().startOf('week');
    lastWeek = date.clone().add('week', -1);
    nextWeek = date.clone().add('week', 1);
    someDay = moment("1984-03-18");
    shortWeekdays = ['日', '一', '二', '三', '四', '五', '六'];
    weekday = date.isoWeekday() % 7;
    dayOfWeek = shortWeekdays[weekday];
    anotherWeekday = weekday > 3 ? weekday - 2 : weekday + 2;
    anotherDayOfWeek = shortWeekdays[anotherWeekday];
    thisWeek = thisWeek.add('day', anotherWeekday - 1);
    it('should format moment into a readable date for human', function() {
      var opts;
      opts = {
        currentWeek: true,
        nextWeek: true,
        lastWeek: true
      };
      expect(today.readableDate(opts)).toEqual("今天");
      expect(yesterday.readableDate(opts)).toEqual("昨天");
      expect(tomorrow.readableDate(opts)).toEqual("明天");
      expect(thisWeek.readableDate(opts)).toEqual("本周" + anotherDayOfWeek);
      expect(lastWeek.readableDate(opts)).toEqual("上周" + dayOfWeek);
      return expect(nextWeek.readableDate(opts)).toEqual("下周" + dayOfWeek);
    });
    it('should format next week as a date when nextWeek option is set false', function() {
      var d, m, opts, this_y, y;
      opts = {
        currentWeek: true,
        nextWeek: false,
        lastWeek: true
      };
      this_y = date.year();
      y = nextWeek.year();
      m = nextWeek.month() + 1;
      d = nextWeek.date();
      if (this_y === y) {
        return expect(nextWeek.readableDate(opts)).toEqual(m + "月" + d + "日");
      } else {
        return expect(nextWeek.readableDate(opts)).toEqual(y + "年" + m + "月" + d + "日");
      }
    });
    it('should format last week as a date when lastWeek option is set false', function() {
      var d, m, opts, this_y, y;
      opts = {
        currentWeek: true,
        nextWeek: true,
        lastWeek: false
      };
      this_y = date.year();
      y = lastWeek.year();
      m = lastWeek.month() + 1;
      d = lastWeek.date();
      if (this_y === y) {
        return expect(lastWeek.readableDate(opts)).toEqual(m + "月" + d + "日");
      } else {
        return expect(lastWeek.readableDate(opts)).toEqual(y + "年" + m + "月" + d + "日");
      }
    });
    return it('should format current week as a date when currentWeek option is set false', function() {
      var d, m, opts, this_y, y;
      opts = {
        currentWeek: false,
        nextWeek: true,
        lastWeek: true
      };
      this_y = date.year();
      y = thisWeek.year();
      m = thisWeek.month() + 1;
      d = thisWeek.date();
      if (this_y === y) {
        return expect(thisWeek.readableDate(opts)).toEqual(m + "月" + d + "日");
      } else {
        return expect(thisWeek.readableDate(opts)).toEqual(y + "年" + m + "月" + d + "日");
      }
    });
  });

  describe('readableTime', function() {
    var now, twoHour, twoMin, twoSec, yesterday;
    now = moment();
    twoSec = now.clone().add('second', -2);
    twoMin = now.clone().add('minute', -2);
    twoHour = now.clone().add('hour', -2);
    yesterday = now.clone().add('day', -1).endOf('day');
    return it('should format moment into a readable time for human, current time must be after 2:00 AM', function() {
      expect(twoSec.readableTime()).toEqual('几秒前');
      expect(twoMin.readableTime()).toEqual('2分钟前');
      expect(twoHour.readableTime()).toEqual('2小时前');
      return expect(yesterday.readableTime()).toEqual('昨天');
    });
  });

}).call(this);
