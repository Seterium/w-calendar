import dayjs from 'dayjs'

import utc from 'dayjs/plugin/utc'
import timezone from 'dayjs/plugin/timezone'
import updateLocale from 'dayjs/plugin/updateLocale'
import pluralGetSet from 'dayjs/plugin/pluralGetSet'
import customParseFormat from 'dayjs/plugin/customParseFormat'
import weekday from 'dayjs/plugin/weekday'
import isToday from 'dayjs/plugin/isToday'

import 'dayjs/locale/ru'

dayjs.extend(utc)
dayjs.extend(timezone)
dayjs.extend(updateLocale)
dayjs.extend(pluralGetSet)
dayjs.extend(customParseFormat)
dayjs.extend(weekday)
dayjs.extend(isToday)

dayjs.locale('ru')

dayjs.updateLocale('ru', {
  months: [
    'Январь',
    'Февраль',
    'Март',
    'Апрель',
    'Май',
    'Июнь',
    'Июль',
    'Август',
    'Сентябрь',
    'Октябрь',
    'Ноябрь',
    'Декабрь'
  ]
})

export default dayjs