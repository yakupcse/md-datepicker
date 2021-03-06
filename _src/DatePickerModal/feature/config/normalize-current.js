import * as D from 'lib/dateutils';

export default function normalizeCurrent(cfg) {
  const { value, min, max, monthsToShow: months, current: c } = cfg;

  // default to current date/time
  let tmp = new Date();

  // if there is a configured value in range, use that
  if (value instanceof Date && value >= min && value < max) {
    tmp = D.clone(value);
  }

  // if before min, set to min
  if (tmp < min) {
    tmp = D.clone(min);
  }

  // if after max, set to day before max
  const vmax = D.maxMonth(D.clone(max));
  vmax.setMonth(vmax.getMonth() - months);
  if (tmp >= D.maxMonth(max)) {
    tmp = D.prevMonth(max);
  }

  return { ...cfg, current: {
    months,
    year: c.year || tmp.getFullYear(),
    month: c.month || tmp.getMonth(),
    date: c.date || tmp.getDate(),
    hour: c.hour || tmp.getHours(),
    minute: c.minute || tmp.getMinutes(),
  } };
}
