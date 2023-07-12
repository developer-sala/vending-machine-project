import setup from './characterGenerator.js';
import bundleOfEvents from './vendingMachineEvents.js';

(async () => {
  await setup();
  bundleOfEvents();
})();
