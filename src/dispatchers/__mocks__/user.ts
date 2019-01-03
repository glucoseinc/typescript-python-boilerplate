export const loginMock = jest.fn()

const mock = jest.fn().mockImplementation(() => {
  return {
    login: loginMock,
  }
})

export default mock
