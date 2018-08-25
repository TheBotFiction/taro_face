/* @flow */
import { configure } from 'enzyme'
import Adapter from 'enzyme-adapter-react-16'

class LocalStorageMock {
  store = {}

  clear (): void {
    this.store = {}
  }

  getItem (key: string): string | null {
    return this.store[key] || null
  }

  setItem (key: string, value: string): void {
    this.store[key] = value
  }

  removeItem (key: string): void {
    delete this.store[key]
  }
}

global.localStorage = new LocalStorageMock()

configure({ adapter: new Adapter() })
