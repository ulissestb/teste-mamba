import Network from './native/network'
import { Store } from 'svelte/store'

const defaultData = {
  isWifiEnabled: Network.isWifiEnabled(),
  wifis: [],
}

export class MambaStore extends Store {
  constructor(data) {
    /** Get persisted data from localstorage if available */
    if (localStorage) {
      const persistedStore = localStorage.getItem('mamba-store')
      data = persistedStore != null ? JSON.parse(persistedStore) : data
    }

    super(data)

    /** Persist store changes to localstorage */
    if (localStorage) {
      this.on('state', ({ current }) => {
        localStorage.setItem('mamba-store', JSON.stringify(current))
      })
    }
  }

  /** Set a promise to a property and, when its resolved, set the same property to its resolved value */
  setPromise(promiseProps) {
    for (const prop in promiseProps) {
      this.set({
        [prop]: Promise.resolve(promiseProps[prop])
          .then(data => {
            this.set({ [prop]: data })
          })
          .catch(e => {
            console.error(`[MambaStore] Promise error: ${e}`)
            this.set({ [prop]: e })
          }),
      })
    }
  }
}

export default new MambaStore(defaultData)
