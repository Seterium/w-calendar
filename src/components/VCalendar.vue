<script>
import dayjs from '@/plugins/dayjs.js'

import constants from '@/utils/contants.js'

export default {
  name: 'VCalendar',
  data: () => ({
    date: dayjs(),
    constants
  }),
  computed: {
    dateMatrix() {
      const firstWeek = this.getWeekDays(this.date.startOf('month'))
      const lastWeek = this.getWeekDays(this.date.endOf('month'))

      const dateMatrix = []

      dateMatrix.push(firstWeek)

      const firstWeekEndDay = firstWeek[6].date
      const lastWeekStartDay = lastWeek[0].date

      const weeksCount = (lastWeekStartDay - firstWeekEndDay - 1) / 7

      let pointer = firstWeek[6].instance.add(1, 'day')

      for (let i = 1; i <= weeksCount; i += 1) {
        dateMatrix.push(this.getWeekDays(pointer))

        pointer = pointer.add(1, 'week')
      }

      dateMatrix.push(lastWeek)

      return dateMatrix
    }
  },
  methods: {
    getWeekDays(day) {
      const { opening, trailing } = this.getDayWeekShift(day.day())

      const week = []

      for (let i = opening; i > 0; i -= 1) {
        const instance = day.subtract(i, 'day')

        week.push(this.getDayConfig(instance))
      }

      week.push(this.getDayConfig(day))

      for (let i = 1; i <= trailing; i += 1) {
        const instance = day.add(i, 'day')

        week.push(this.getDayConfig(instance))
      }

      return week
    },
    getDayConfig(instance) {
      const day = instance.day()

      return {
        instance,
        date: instance.date(),
        isWeekend: [6, 0].includes(day),
        isPrevMonth: instance.month() !== this.date.month(),
        isWorkDay: this.isWorkDay(instance),
        isToday: instance.isToday()
      }
    },
    getDayWeekShift(dayIndex) {
      if (!dayIndex) {
        return {
          opening: 6,
          trailing: 0
        }
      }

      return {
        opening: dayIndex - 1,
        trailing: 7 - dayIndex
      }
    },
    isWorkDay(day) {
      const x = day.diff('1970-01-04', 'days') % 4

      return x === 1 || x === 2
    },
    changeMonth(scale) {
      this.date = this.date.add(scale, 'month')
    },
    swipeHandler(direction) {
      if (!['left', 'right'].includes(direction)) {
        return
      }

      this.changeMonth(direction === 'left' ? 1 : -1)
    },
    resetDate() {
      this.date = dayjs()
    }
  }
}
</script>
<template>
  <div class="v-calendar">
    <div class="v-calendar__header">
      <button
        class="v-calendar__header-action"
        @click="changeMonth(-1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </button>
      <button
        v-touch:hold="resetDate"
        class="v-calendar__header-text"
      >
        {{ date.format('MMMM') }}, {{ date.year() }}
      </button>
      <button
        class="v-calendar__header-action v-calendar__header-action--next"
        @click="changeMonth(1)"
      >
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
        >
          <path
            d="M0 0h24v24H0z"
            fill="none"
          />
          <path d="M20 11H7.83l5.59-5.59L12 4l-8 8 8 8 1.41-1.41L7.83 13H20v-2z" />
        </svg>
      </button>
    </div>
    <div
      v-touch:swipe="swipeHandler"
      class="v-calendar__wrap"
    >
      <div class="v-calendar__wrap-header">
        <div
          v-for="(name, index) in constants.daysOfWeek"
          :key="index"
          class="v-calendar__wrap-header-item"
        >
          <div class="v-calendar__wrap-header-item-text v-calendar__wrap-header-item-text--mobile">
            {{ name.short }}
          </div>
          <div class="v-calendar__wrap-header-item-text v-calendar__wrap-header-item-text--desktop">
            {{ name.full }}
          </div>
        </div>
      </div>
      <div
        v-for="week in dateMatrix"
        :key="week"
        class="v-calendar__week"
      >
        <div
          v-for="day in week"
          :key="`${week}--${day}`"
          class="v-calendar__day"
          :class="{
            'v-calendar__day--prev-month': day.isPrevMonth,
            'v-calendar__day--weekend': day.isWeekend,
            'v-calendar__day--work': day.isWorkDay,
            'v-calendar__day--today': day.isToday
          }"
        >
          <span>{{ day.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style src="@/assets/styles/components/VCalendar.scss" lang="scss"></style>