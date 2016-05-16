moment.locale('zh-cn')

describe 'readableDate', ->
  date = moment().startOf('day')
  today = date.clone().startOf('day')
  yesterday = date.clone().add(-1, 'day')
  tomorrow = date.clone().add(1, 'day')

  shortWeekdays = ['日', '一', '二', '三', '四', '五', '六']
  day = date.isoWeekday() % 7
  dayOfWeek = shortWeekdays[day]

  lastWeek = date.clone().add(-1, 'week')
  nextWeek = date.clone().add(1, 'week')

  if day > 3
    thisWeek = date.clone().startOf('isoWeek')
  else
    thisWeek = date.clone().endOf('isoWeek')

  it 'should format moment into a readable date for human', ->
    opts =
      currentWeek: true
      nextWeek: true
      lastWeek: true

    expect(today.readableDate(opts)).toEqual("今天")
    expect(yesterday.readableDate(opts)).toEqual("昨天")
    expect(tomorrow.readableDate(opts)).toEqual("明天")
    expect(thisWeek.readableDate(opts)).toEqual("本周#{ shortWeekdays[thisWeek.isoWeekday() % 7] }")
    expect(lastWeek.readableDate(opts)).toEqual("上周#{ dayOfWeek }")
    expect(nextWeek.readableDate(opts)).toEqual("下周#{ dayOfWeek }")

  it 'should work all right when week options false', ->
    opts =
      currentWeek: false
      nextWeek: false
      lastWeek: false

    expect(thisWeek.readableDate(opts)).not.toContain('本周')
    expect(lastWeek.readableDate(opts)).not.toContain('上周')
    expect(nextWeek.readableDate(opts)).not.toContain('下周')

  it 'should work all right with timezone', ->
    opts =
      currentWeek: true
      nextWeek: true
      lastWeek: true

    newYork = moment().endOf('d').tz('America/New_York')
    expect(newYork.readableDate(opts)).toEqual('今天')

    newYork = moment().startOf('d').tz('America/New_York')
    expect(newYork.readableDate(opts)).toEqual('昨天')

describe 'readableTime', ->
  it 'should format moment into a readable time for humanrize', ->
    now = moment()

    second = now.clone().add(-2, 'second')
    minute = now.clone().add(-2, 'minute')
    hour = now.clone().add(-2, 'hour')
    yesterday = now.clone().add(-1, 'day').endOf('day')

    expect(second.readableTime()).toEqual('刚刚')
    expect(minute.readableTime()).toEqual('2 分钟前')
    expect(hour.readableTime()).toEqual('2 小时前')
    expect(yesterday.readableTime()).toEqual('昨天')

  it 'should work all right with timezone', ->
    now = moment().tz('America/New_York')

    minute = now.clone().add(-2, 'minute')
    yesterday = now.clone().add(-1, 'day').endOf('day')

    expect(minute.readableTime()).toEqual('2 分钟前')
    expect(yesterday.readableTime()).toEqual('昨天')

  it 'should work all right when change threshold', ->
    now = moment()
    hour = now.clone().add(-2, 'hour')

    expect(hour.readableTime({
      threshold: 'minute'
    })).not.toEqual('2 小时前')

  it 'should work all right when change locale', ->
    now = moment()
    now.locale('en')
    hour = now.clone().add(-2, 'hour')
    yesterday = now.clone().add(-1, 'day').endOf('day')

    expect(hour.readableTime()).toEqual('2 hours ago')
    expect(yesterday.readableTime()).toEqual('Yesterday')
