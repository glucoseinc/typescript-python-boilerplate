import * as enzyme from 'enzyme'
import * as Adapter from 'enzyme-adapter-react-16'
import * as fetch from 'jest-fetch-mock'

enzyme.configure({adapter: new Adapter()})

location.assign = jest.fn()
location.replace = jest.fn()

// @ts-ignore global.fetch
global.fetch = fetch
// @ts-ignore global.fetch
global.fetch.mockResponse(JSON.stringify({}))
