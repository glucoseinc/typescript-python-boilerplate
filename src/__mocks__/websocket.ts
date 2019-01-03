export const startMock = jest.fn()
export const stopMock = jest.fn()

const mock = jest.fn().mockImplementation(() => {
  return {
    start: startMock,
    stop: stopMock,
  }
})

export default mock()
