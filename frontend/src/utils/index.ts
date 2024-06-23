// 节流函数
export const throttle = (func: Function, wait: number, isGap: boolean = false) => {
  let timeout: number | null
  let previous = 0

  return (...args: any[]) => {
    const now = Date.now()
    const remaining = wait - (now - previous)

    if (!isGap && (remaining <= 0 || remaining > wait)) {
      if (timeout) {
        clearTimeout(timeout)
        timeout = null
      }

      previous = now
      func(...args)
    } else if (!timeout) {
      timeout = setTimeout(() => {
        previous = Date.now()
        timeout = null
        func(...args)
      }, wait)
    }
  }
}
