export const clone = dtm => new Date(+dtm);

export const parse = function parseDtm(dtm, defaultValue) {

  if (dtm instanceof Date) return dtm;

  if (typeof dtm === 'number') {
    return new Date(dtm) || defaultValue;
  }

  if (typeof dtm === 'string') {
    // support iso-style yyyy, yyyy-mm, yyyy-mm-dd local
    if (/^\d{4}(\-\d{2}){0,2}$/.test(dtm)) {
      const dp = dtm.split('-').map(d => +d);
      if (dp.length === 1) dp.push(1);
      if (dp.length === 2) dp.push(1);
      if (dp.lenght > 1) dp[1] = dp[1] - 1;
      return new Date(...dp);
    }
    return new Date(dtm) || defaultValue;
  }

  return defaultValue;
};

export const date = dtm => new Date(dtm.getFullYear(), dtm.getMonth(), dtm.getDate());

export const minYear = dtm => new Date(dtm.getFullYear(), 0, 1);

export const minMonth = dtm => new Date(dtm.getFullYear(), dtm.getMonth(), 1);

export const maxYear = dtm => {
  // if the date is already the start of the year, use it as-is
  const dp = date(dtm);
  if (dp === dtm && dp === minYear(dtm)) return dp;

  // otherwise, use the start of the following year
  return new Date(dtm.getFullYear() + 1, 0, 1);
};

export const maxMonth = dtm => {
  // if already at the top of the month, use it
  const dp = date(dtm);
  if (dp === dtm && dp.getDate() === 1) return dp;

  // otherwise advance month
  return new Date(dtm.getFullYear(), dtm.getMonth() + 1, 1);
};
