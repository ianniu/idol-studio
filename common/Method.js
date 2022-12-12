/**
 * @param Number A duration (number) in second
 * @returns The actual time in "00:00" format
 */
export const durationToTime = (duration) => {
  if (duration < 0) return '-:--'
  const minute = Math.floor(duration / 60)
  const rawSecond = Math.floor(duration % 60)
  const second = rawSecond < 10 ? `0${rawSecond}` : `${rawSecond}`
  return `${minute}:${second}`
}

/**
 * Shuffle an array using Durstenfeld Shuffle
 * @param {*} array
 * @returns
 */
export const shuffle = (array) => {
  if (!array || !array.length) return
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1))
    const temp = array[i]
    array[i] = array[j]
    array[j] = temp
  }
}
