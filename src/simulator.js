/**
 * Boot the Mamba Simulator before the app is initialized.
 * * Usually, there's no need to modify this file.
 */
import '@mamba/pos/simulator/index.js';
import POS from '@mamba/pos/simulator/view.js';
import store from './store.js';

/** Initialize the Simulator View */
new POS({ target: document.body, store });
