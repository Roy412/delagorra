import { format, parseISO } from 'date-fns';

export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const hitSlopArea = (offset) => ({
  top: offset,
  right: offset,
  bottom: offset,
  left: offset,
});

export const generateRandomString = (count = 5) => Math.random().toString(36).substr(2, count);

export const timeSince = (date, suf = '') => {
  if (isNaN(date)) {
    return null;
  }
  var seconds = Math.floor((new Date() - date) / 1000);

  var interval = seconds / 31536000;

  if (interval > 1) {
    const suffix = Math.floor(interval) > 1 ? ' yrs' : ' yr';
    return Math.floor(interval) + suffix + suf;
  }
  interval = seconds / 2592000;
  if (interval > 1) {
    const suffix = Math.floor(interval) > 1 ? ' mos' : ' mo';
    return Math.floor(interval) + suffix + suf;
  }
  interval = seconds / 86400;
  if (interval > 1) {
    const suffix = Math.floor(interval) > 1 ? ' days' : ' day';
    return Math.floor(interval) + suffix + suf;
  }
  interval = seconds / 3600;
  if (interval > 1) {
    const suffix = Math.floor(interval) > 1 ? ' hrs' : ' hr';
    return Math.floor(interval) + suffix + suf;
  }
  interval = seconds / 60;
  if (interval > 1) {
    const suffix = Math.floor(interval) > 1 ? ' mins' : ' min';
    return Math.floor(interval) + suffix + suf;
  }
  const suffix = Math.floor(interval) > 1 ? ' secs' : ' sec';
  return Math.floor(seconds) + suffix + suf;
};

export const convertToTimeString = (createdAt) => format(parseISO(createdAt), 'hh:mm a');
