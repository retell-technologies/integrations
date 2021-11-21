export default function makeQuery(options: any, prefix?: string): string {
  return (
    `?${Object.keys(options)
      .reduce((queryArray: string[], key) => {
        const value = options[key]
        if (typeof value === 'object') {
          if (!Object.keys(options[key]).length) {
            return queryArray
          }
          queryArray.push(makeQuery(value, key).substring(1))
          return queryArray
        }
        queryArray.push(
          `${prefix ? `${prefix}.` : ''}${key}=${encodeURIComponent(value)}`,
        )
        return queryArray
      }, [])
      .join('&')}`
  )
}
