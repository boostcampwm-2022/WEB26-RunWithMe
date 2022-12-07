console.log(new Date());
const nowUtc = Date.now();
const timeOff = new Date().getTimezoneOffset() * 60000;
const today = new Date(nowUtc - timeOff).toISOString().substring(0, 16);
console.log(today);
const possibleTime = new Date(nowUtc - timeOff + 1000 * 60 * 60)
  .toISOString()
  .substring(0, 16);
