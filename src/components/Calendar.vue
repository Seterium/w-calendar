<script setup lang="ts">
import type { Dayjs } from 'dayjs'

import { ref, computed, watch } from 'vue'

import { usePointerSwipe, useSwipe } from '@vueuse/core'

import IconArrowLeft from '@/icons/arrow-left.svg?component'
import IconArrowRight from '@/icons/arrow-right.svg?component'

import dayjs from '@/plugins/dayjs'
import * as constants from '@/utils/constants'

type TDayConfig = {
  instance: Dayjs,
  date: number,
  isWeekend: boolean,
  isPrevMonth:boolean,
  isWorkDay: boolean,
  isToday: boolean
}

const isTouchDevice = ('ontouchstart' in window) || !!navigator.maxTouchPoints

const el = ref<HTMLElement | null>(null)
const swipe = useSwipe(el)
const pointerSwipe = usePointerSwipe(el)

watch(swipe.isSwiping, (value) => {
  if (value && isTouchDevice) {
    switch (swipe.direction.value) {
      case 'RIGHT':
        changeMonth(-1)
        break
      case 'LEFT':
        changeMonth(1)
        break

      default:
        break
    }
  }
})

watch(pointerSwipe.isSwiping, (value) => {
  if (value && !isTouchDevice) {
    switch (pointerSwipe.direction.value) {
      case 'RIGHT':
        changeMonth(-1)
        break
      case 'LEFT':
        changeMonth(1)
        break

      default:
        break
    }
  }
})

const date = ref(dayjs())

const dateMatrix = computed(() => {
  const firstWeek = getWeekDays(date.value.startOf('month'))
  const lastWeek = getWeekDays(date.value.endOf('month'))

  const matrix: Array<TDayConfig[]> = []

  matrix.push(firstWeek)

  const firstWeekEndDay = firstWeek[6].date
  const lastWeekStartDay = lastWeek[0].date

  const weeksCount = (lastWeekStartDay - firstWeekEndDay - 1) / 7

  let pointer = firstWeek[6].instance.add(1, 'day')

  for (let i = 1; i <= weeksCount; i += 1) {
    matrix.push(getWeekDays(pointer))

    pointer = pointer.add(1, 'week')
  }

  matrix.push(lastWeek)

  return matrix
})

const getWeekDays = (day: Dayjs): TDayConfig[] => {
  const { opening, trailing } = getDayWeekShift(day.day())

  const week: TDayConfig[] = []

  for (let i = opening; i > 0; i -= 1) {
    const instance = day.subtract(i, 'day')

    week.push(getDayConfig(instance))
  }

  week.push(getDayConfig(day))

  for (let i = 1; i <= trailing; i += 1) {
    const instance = day.add(i, 'day')

    week.push(getDayConfig(instance))
  }

  return week
}

const getDayConfig = (instance: Dayjs): TDayConfig => {
  const day = instance.day()

  return {
    instance,
    date: instance.date(),
    isWeekend: [6, 0].includes(day),
    isPrevMonth: instance.month() !== date.value.month(),
    isWorkDay: isWorkDay(instance),
    isToday: instance.isToday()
  }
}

const getDayWeekShift = (dayIndex: number) => {
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
}

const isWorkDay = (day: Dayjs) => {
  const x = day.diff('1970-01-01', 'days') % 4

  return x === 1 || x === 2
}

const changeMonth = (scale: number) => {
  date.value = date.value.add(scale, 'month')
}
</script>
<template>
  <div class="calendar">
    <div class="calendar__header">
      <button
        class="calendar__header-action"
        @click="changeMonth(-1)"
      >
        <IconArrowLeft />
      </button>
      <button class="calendar__header-text">
        {{ date.format('MMMM') }}, {{ date.year() }}
      </button>
      <button
        class="calendar__header-action"
        @click="changeMonth(1)"
      >
        <IconArrowRight />
      </button>
    </div>
    <div
      ref="el"
      class="calendar__wrap"
    >
      <div class="calendar__wrap-header">
        <div
          v-for="(name, index) in constants.daysOfWeek"
          :key="index"
          class="calendar__wrap-header-item"
        >
          <div class="calendar__wrap-header-item-text calendar__wrap-header-item-text--mobile">
            {{ name.short }}
          </div>
          <div class="calendar__wrap-header-item-text calendar__wrap-header-item-text--desktop">
            {{ name.full }}
          </div>
        </div>
      </div>
      <div
        v-for="(week, weekIndex) in dateMatrix"
        :key="weekIndex"
        class="calendar__week"
      >
        <div
          v-for="day in week"
          :key="`${weekIndex}--${day}`"
          class="calendar__day"
          :class="{
            'calendar__day--prev-month': day.isPrevMonth,
            'calendar__day--work': day.isWorkDay,
            'calendar__day--today': day.isToday
          }"
        >
          <span>{{ day.date }}</span>
        </div>
      </div>
    </div>
  </div>
</template>
<style lang="scss">
.calendar {
  display: flex;
  flex-direction: column;
  flex-grow: 2;
  height: 100%;

  &__header {
    display: flex;
    align-items: center;
    justify-content: space-between;
    margin-bottom: 16px;
    padding: 16px;
    border-bottom: 1px solid #eee;

    &-text {
      font-size: 32px;
      background-color: transparent;
      border: none;
      user-select: none;

      @media (max-width: 768px) {
        font-size: 20px;
      }
    }

    &-action {
      display: flex;
      align-items: center;
      justify-content: center;
      width: 42px;
      height: 42px;
      padding: 0;
      background-color: transparent;
      border: none;
      transition-duration: 0.2s;

      &:hover {
        background-color: #eee;
        cursor: pointer;

        @media (max-width: 768px) {
          background-color: transparent;
        }
      }

      svg {
        width: 38px;
        height: 38px;
      }

      &--next {
        svg {
          transform: rotate(180deg);
        }
      }
    }
  }

  &__wrap {
    display: grid;
    flex-grow: 2;
    grid-template-rows: 40px repeat(6, 1fr);
    gap: 8px;
    padding: 8px;
    padding-top: 0;
    user-select: none;

    &:hover {
      cursor: grab;
    }

    &:active {
      cursor: grabbing;
    }

    @media (max-width: 768px) {
      gap: 4px;
    }

    &-header {
      display: grid;
      grid-template-columns: repeat(7, 1fr);
      gap: 8px;
      margin-bottom: 8px;

      &-item {
        display: flex;
        align-items: center;
        justify-content: center;
        padding-bottom: 8px;
        border-bottom: 1px solid #eee;

        &-text {
          color: rgb(0 0 0 / 30%);
          font-size: 18px;
          letter-spacing: 1px;

          &--desktop {
            @media (max-width: 768px) {
              display: none;
            }
          }

          &--mobile {
            display: none;

            @media (max-width: 768px) {
              display: flex;
            }
          }
        }
      }
    }
  }

  &__week {
    display: grid;
    grid-template-columns: repeat(7, 1fr);
    gap: 8px;

    @media (max-width: 768px) {
      gap: 4px;
    }
  }

  &__day {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 100%;
    font-size: 32px;
    background-color: #fafafa;

    @media (max-width: 768px) {
      font-size: 20px;
    }

    &--prev-month {
      background-color: transparent;
      border: 1px solid #eee;

      span {
        opacity: 0.3;
      }
    }

    &--work {
      &::after {
        position: absolute;
        bottom: 0;
        left: 0;
        z-index: 1;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 100%;
        height: 20px;
        color: #fff;
        font-size: 12px;
        background-color: #10b981;
        content: '';

        @media (max-width: 768px) {
          height: 16px;
        }
      }
    }

    &--today {
      &::before {
        position: absolute;
        top: 0;
        left: 0;
        z-index: 3;
        width: 100%;
        height: 100%;
        box-shadow: inset 0 0 0 4px red;
        content: '';
      }
    }
  }
}
</style>