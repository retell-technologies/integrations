/**
 * The `formatDuration` function getting a number of symbols and returning
 * function for formatting seconds to format `minutes:seconds`
 *
 * If `symbols` is `1`: `formatDuration(1)(433) => '7:13'`
 *
 * If `symbols` is `2`: `formatDuration(2)(433) => '07:13'`
 * @param symbols `1` | `2`
 * @returns `(duration: number) => string`
 */
export default function formatDuration(symbols: 1 | 2 = 2) {
  return (duration: number): string => {
    const mins = `0${(Math.floor(duration / 60)).toString()}`
    const secs = `0${(Math.floor(duration) % 60).toString()}`

    return `${mins.length > symbols ? mins.substr(1) : mins}:${secs.substr(-2)}`
  }
}
