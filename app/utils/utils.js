export const capitalizeFirstLetter = (string) => string.charAt(0).toUpperCase() + string.slice(1);

export const hitSlopArea = (offset) => ({
  top: offset,
  right: offset,
  bottom: offset,
  left: offset,
});
