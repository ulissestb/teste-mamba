import MambaStore from '@mamba/store';

const initialData = {};
const store = MambaStore(initialData);

if (__DEV__) {
  window.MambaStore = store;
}

export default store;
