function asyncSleep(interval: number) {
  return new Promise((resolve) => {
    setInterval(resolve, interval)
  })
}
