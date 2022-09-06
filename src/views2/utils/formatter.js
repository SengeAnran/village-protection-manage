
export function formatMoney(value, precision = 2) {
  return Number(value || 0).toFixed(precision);
}

export function formatScore(value, precision = 1) {
  return Number(value || 0).toFixed(precision);
}
