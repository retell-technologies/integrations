/**
 * Creates and returns a new debounced version of the passed function
 * that will postpone its execution until after wait milliseconds
 * have elapsed since the last time it was invoked.
 * @name debounce
 * @param func Function
 * @param timeout number (milliseconds)
 * @returns Function
 */
export default function debounce(func: Function, timeout = 300): (...args: any[]) => void {
  let timer: NodeJS.Timeout

  return (...args: any[]) => {
    clearTimeout(timer)
    timer = setTimeout(() => { // @ts-ignore
      func.apply(this, args) }, timeout)
  }
}
