/**
 * Boot the Mamba Simulator before the app is initialized.
 * * Usually, there's no need to modify this file.
 */
import * as Simulator from '@mamba/pos/simulator/index.js';
import store from './store.js';

/** Initialize the Simulator View */
Simulator.getVirtualPOS(store);
