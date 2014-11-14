(function() {
  describe('format moment into a readable date for human', function() {
    return it('should format moment into a readable date for human', function() {
      var date, dayOfWeek, lastWeek, nextWeek, opts, someDay, thisWeek, today, tomorrow, yesterday;
      moment.locale('zh-cn');
      date = moment();
      today = date.clone().startOf('day');
      yesterday = date.clone().add('day', -1);
      tomorrow = date.clone().add('day', 1);
      thisWeek = date.clone().startOf('week');
      lastWeek = date.clone().add('week', -1);
      nextWeek = date.clone().add('week', 1);
      someDay = moment("1984-03-18");
      opts = {
        currentWeek: true,
        nextWeek: true,
        lastWeek: true
      };
      dayOfWeek = ['日', '一', '二', '三', '四', '五', '六'][date.isoWeekday() % 7];
      expect(today.readableDate(opts)).toEqual("今天");
      expect(yesterday.readableDate(opts)).toEqual("昨天");
      expect(tomorrow.readableDate(opts)).toEqual("明天");
      expect(thisWeek.readableDate(opts)).toEqual("本周一");
      expect(lastWeek.readableDate(opts)).toEqual("上周" + dayOfWeek);
      return expect(nextWeek.readableDate(opts)).toEqual("下周" + dayOfWeek);
    });
  });

}).call(this);
