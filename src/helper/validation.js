export const checkDate = value => new Date(value).toISOString() >= new Date(Date.now() - 24*60*60*1000).toISOString();  // 24h * 60min * 60s * 1000ms (yesterday same Time)
