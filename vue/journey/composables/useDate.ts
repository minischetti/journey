import * as datefns from 'date-fns'
export const useDate = () => {
    return {
        values: {
            today: datefns.startOfDay(new Date()),
            yesterday: datefns.startOfDay(datefns.subDays(new Date(), 1)),
            tomorrow: datefns.startOfDay(datefns.addDays(new Date(), 1)),

            thisWeek: datefns.startOfWeek(new Date()),
            lastWeek: datefns.startOfWeek(datefns.subWeeks(new Date(), 1)),
            nextWeek: datefns.startOfWeek(datefns.addWeeks(new Date(), 1)),

            thisMonth: datefns.startOfMonth(new Date()),
            lastMonth: datefns.startOfMonth(datefns.subMonths(new Date(), 1)),
            nextMonth: datefns.startOfMonth(datefns.addMonths(new Date(), 1)),

            thisYear: datefns.startOfYear(new Date()),
            lastYear: datefns.startOfYear(datefns.subYears(new Date(), 1)),
            nextYear: datefns.startOfYear(datefns.addYears(new Date(), 1)),
        },
        functions: {
            addMonths: datefns.addMonths,
            subMonths: datefns.subMonths,
        }
    }
}