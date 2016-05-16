(function() {
  moment.locale('zh-cn');

  describe('readableDate', function() {
    var date, day, dayOfWeek, lastWeek, nextWeek, shortWeekdays, thisWeek, today, tomorrow, yesterday;
    date = moment().startOf('day');
    today = date.clone().startOf('day');
    yesterday = date.clone().add(-1, 'day');
    tomorrow = date.clone().add(1, 'day');
    shortWeekdays = ['日', '一', '二', '三', '四', '五', '六'];
    day = date.isoWeekday() % 7;
    dayOfWeek = shortWeekdays[day];
    lastWeek = date.clone().add(-1, 'week');
    nextWeek = date.clone().add(1, 'week');
    if (day > 3) {
      thisWeek = date.clone().startOf('isoWeek');
    } else {
      thisWeek = date.clone().endOf('isoWeek');
    }
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
      expect(thisWeek.readableDate(opts)).toEqual("本周" + shortWeekdays[thisWeek.isoWeekday() % 7]);
      expect(lastWeek.readableDate(opts)).toEqual("上周" + dayOfWeek);
      return expect(nextWeek.readableDate(opts)).toEqual("下周" + dayOfWeek);
    });
    it('should work all right when week options false', function() {
      var opts;
      opts = {
        currentWeek: false,
        nextWeek: false,
        lastWeek: false
      };
      expect(thisWeek.readableDate(opts)).not.toContain('本周');
      expect(lastWeek.readableDate(opts)).not.toContain('上周');
      return expect(nextWeek.readableDate(opts)).not.toContain('下周');
    });
    return it('should work all right with timezone', function() {
      var newYork, opts;
      opts = {
        currentWeek: true,
        nextWeek: true,
        lastWeek: true
      };
      newYork = moment().endOf('d').tz('America/New_York');
      expect(newYork.readableDate(opts)).toEqual('今天');
      newYork = moment().startOf('d').tz('America/New_York');
      return expect(newYork.readableDate(opts)).toEqual('昨天');
    });
  });

  describe('readableTime', function() {
    it('should format moment into a readable time for humanrize', function() {
      var hour, minute, now, second, yesterday;
      now = moment();
      second = now.clone().add(-2, 'second');
      minute = now.clone().add(-2, 'minute');
      hour = now.clone().add(-2, 'hour');
      yesterday = now.clone().add(-1, 'day').endOf('day');
      expect(second.readableTime()).toEqual('刚刚');
      expect(minute.readableTime()).toEqual('2 分钟前');
      expect(hour.readableTime()).toEqual('2 小时前');
      return expect(yesterday.readableTime()).toEqual('昨天');
    });
    it('should work all right with timezone', function() {
      var minute, now, yesterday;
      now = moment().tz('America/New_York');
      minute = now.clone().add(-2, 'minute');
      yesterday = now.clone().add(-1, 'day').endOf('day');
      expect(minute.readableTime()).toEqual('2 分钟前');
      return expect(yesterday.readableTime()).toEqual('昨天');
    });
    it('should work all right when change threshold', function() {
      var hour, now;
      now = moment();
      hour = now.clone().add(-2, 'hour');
      return expect(hour.readableTime({
        threshold: 'minute'
      })).not.toEqual('2 小时前');
    });
    return it('should work all right when change locale', function() {
      var hour, now, yesterday;
      now = moment();
      now.locale('en');
      hour = now.clone().add(-2, 'hour');
      yesterday = now.clone().add(-1, 'day').endOf('day');
      expect(hour.readableTime()).toEqual('2 hours ago');
      return expect(yesterday.readableTime()).toEqual('Yesterday');
    });
  });

}).call(this);
