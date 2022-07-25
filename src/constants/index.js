export const colors = ["blue", "pink", "brown", "green", "purple"];

export function parseNumber(x) {
  return Math.floor(x)
    .toString()
    .replace(/\B(?=(\d{3})+(?!\d))/g, ",");
}

export function getRandomColor() {
  return colors[Math.floor(Math.random() * colors.length)];
}

export function isEmpty(obj) {
  return Object.keys(obj).length === 0 && obj.constructor === Object;
}
