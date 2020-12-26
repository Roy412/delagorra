export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const hitSlopArea = (offset) => ({
  top: offset,
  right: offset,
  bottom: offset,
  left: offset,
});

export const generateRandomString = (count = 5) => Math.random().toString(36).substr(2, count);
