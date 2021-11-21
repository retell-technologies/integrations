/**
 * The createUUID function returns unique string
 * @returns string
 */
export default function createUUID() {
  let date = new Date().getTime()
  return 'xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'
    .replace(/[xy]/g, string => {
      const r = (date + Math.random() * 16) % 16 | 0
      date = Math.floor(date / 16)
      return (string === 'x' ? r : ((r & 0x3) | 0x8)).toString(16)
    })
}
