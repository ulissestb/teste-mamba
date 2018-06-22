<Title label="Brilho da tela"/>

<div class="container">
  <Range
    ref:range
    icon="assets/images/icons/brightness.png"
    bind:value="brightness"
    min={10}
    on:increment="increaseBrightness()"
    on:decrement="decreaseBrightness()"
  />

  <div style="margin-top: 25px;">
    <Row label="1. Diminuir brilho" on:click="refs.range.decrement()" shortcut="1"/>
    <Row label="2. Aumentar brilho" on:click="refs.range.increment()" shortcut="2"/>
  </div>
</div>

<style>
  .container {
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    width: 100%;
  }
</style>

<script>
  import Screen from '@mamba/native/screen'
  import { Row } from '@mamba/collection'
  import { Title } from '@mamba/appbar'

  export default {
    components: {
      Range: '@mamba/range',
      Row,
      Title,
    },
    data() {
      return {
        brightness: Screen.brightness.get() * 10,
      }
    },
    methods: {
      increaseBrightness() {
        Screen.brightness.increase()

        /** If developing, show the brightness change on the POS Mockup */
        if (process.env.NODE_ENV !== 'production') {
          this.store.fire('pos:brightness', {
            brightnessLevel: Screen.brightness.get(),
          })
        }
      },
      decreaseBrightness() {
        Screen.brightness.decrease()

        /** If developing, show the brightness change on the POS Mockup */
        if (process.env.NODE_ENV !== 'production') {
          this.store.fire('pos:brightness', {
            brightnessLevel: Screen.brightness.get(),
          })
        }
      },
    },
  }
</script>
