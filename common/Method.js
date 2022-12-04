/**
 * (@param) A duration (number) in second
 * (@return) The actual time in "00:00" format
 */
export const durationToTime = (duration) => {
  if (duration < 0) return '-:--'
  const minute = Math.floor(duration / 60)
  const rawSecond = Math.floor(duration % 60)
  const second = rawSecond < 10 ? `0${rawSecond}` : `${rawSecond}`
  return `${minute}:${second}`
}
