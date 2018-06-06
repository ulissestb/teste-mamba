  <Row label="1. Ultra economia" shortcut="1">
    <div slot="controller">
      <Switch bind:checked="isSleepEnabled" on:change="toggleSleep()"/>
    </div>
    <div slot="extra">
      {#if isSleepEnabled}
        <div class="range-container" style="margin-top: 15px;">
          <Range
            ref:range
            bind:value="sleepDelay"
            min={0}
            max={10}
            step={1}
            unit=" min"
            on:increment="increaseDelay()"
            on:decrement="decreaseDelay()"
            style="padding-left: 0; padding-right: 0;"
          />
          <div style="margin-top: 25px;">
            <Row label="2. Remover minuto" on:click="refs.range.decrement()" shortcut="2"/>
            <Row label="3. Adicionar minuto" on:click="refs.range.increment()" shortcut="3"/>
          </div>
        </div>
      {/if}
    </div>
  </Row>

<script>
  import System from '@mamba/native/system'
  import { Row } from '@mamba/collection'

  export default {
    components: {
      Range: '@mamba/range',
      Switch: '@mamba/switch',
      Row,
    },
    data() {
      return {
        sleepDelay: System.PowerManagement.getSleepDelay(),
        isSleepEnabled: System.PowerManagement.isSleepEnabled(),
      }
    },
    methods: {
      toggleSleep() {
        System.PowerManagement.toggleSleep()
      },
      increaseDelay() {
        System.PowerManagement.increaseSleepDelay()
      },
      decreaseDelay() {
        System.PowerManagement.decreaseSleepDelay()
      },
    },
  }
</script>

<style>
  /* .range-container {
    width: 100%;
    position: absolute;
    bottom: 0;
    left: 0;
  } */
</style>
