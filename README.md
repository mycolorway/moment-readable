# moment-readable

Readble time formats for moment. A moment plugin


## Usage

### Readable Date

Just call `moment().readableDate()` and it returns a string in a human-readable format, correct to day.

You can pass options to this function. Following are available options:

* `defaultFormat`: The format to use for a ordinary date. If this is set, the `defaultFormat` and `defaultFormatWithYear` of i18n configurations is never used
* `currentWeek`: Wether to return the day of the week if the given moment and the current moment are in the same week
* `nextWeek`: Wether to return the day of the week if the given moment is in the next week of today
* `lastWeek`: Wether to return the day of the week if the given moment is in the previous week of today

## i18n

### Define a locale

The locale definations of moment.js cannot satisfy the requirement of moment-readable.js, so moment.readable has its own locale defination.

The function `moment.readable.defineLocale` defines a locale for moment.readable. It demands 2 arguments, the abbreviation of the locale and the configurations. Available configurations are:

* `yesterday`: Localized phrase of "Yesterday"
* `tomorrow`: Localized phrase of "Tomorrow"
* `today`: Localized phrase of "Today"
* `thisWeek`: Localized phrase of "This Week"
* `nextWeek`: Localized phrase of "Next Week"
* `lastWeek`: Localized phrase of "Last Week"
* `thisWeekdays`: Localized phrases of the seven days in this week, joined by '_'
* `nextWeekdays`: Localized phrases of the seven days in next week, joined by '_'
* `lastWeekdays`: Localized phrases of the seven days in previous week, joined by '_'
* `defaultFormat`: default format to for a ordinary date which is in the same year with current moment
* `defaultFormatWithYear`: default format to for a ordinary date which is not in the same year with current moment

For example, to define a new locale for spanish, just:

	moment.readable.defineLocale('sp', {
		yesterday: 'ayer',
		tomorrow: 'mañana',
		today: 'hoy',
		thisWeek: 'esta semana',
		nextWeek: 'la próxima semana',
		lastWeek: 'la semana pasada',
		thisWeekdays: 'este domingo_este lunes_este martes_este miércoles_este jueves_este viernes_este sábado',
	nextWeekdays: 'el domingo próximo_el lunes próximo_el martes próximo_el miércoles próximo_el jueves próximo_el viernes próximo_el sábado 	próximo',
		lastWeekdays: 'domingo pasado_lunes pasado_martes pasado_miércoles pasado_jueves pasado_viernes pasado_sábado pasado',
		defaultFormat: 'D de MMM',
		defaultFormatWithYear: 'D de MMM YYYY'
	});

### Determine the current locale

moment-readable use the locale of moment.