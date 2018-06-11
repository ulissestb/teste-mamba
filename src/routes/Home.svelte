<Collection title="Rede">
  <Row label="1. Configurar" href="/network" shortcut="1"/>
</Collection>

<Collection title="Dispositivo">
  <Row label="2. Som do Teclado" shortcut="2">
    <div slot="controller">
      <Switch bind:checked="isKeyboardSoundEnabled" on:change="toggleKeyboardSound()"/>
    </div>
  </Row>
  <Row label="3. Luz do Teclado" shortcut="3">
    <div slot="controller">
      <Switch bind:checked="isKeyboardLightEnabled" on:change="toggleKeyboardLight()"/>
    </div>
  </Row>
  <Row label="4. Energia" href="/energy" shortcut="4"/>
</Collection>

<Collection title="Senha">
  <Row label="5. Alterar senha" href="/password/change" shortcut="5"/>
  <Row label="6. Esqueci minha senha" href="/password/forgot" shortcut="6"/>
</Collection>

<Collection title="Lojista">
  <Row label="7. Recibos" href="/store/receipts"/>
  <Row label="8. ID do Pedido">
    <div slot="controller">
      <Switch checked disabled />
    </div>
  </Row>
  <Row label="9. Parcelado Emissor">
    <div slot="controller">
      <Switch checked />
    </div>
  </Row>
  <Row label="10. Restaurar dados" href="/store/restore"/>
</Collection>

<script>
  import System from '@mamba/native/system'
  import Keyboard from '@mamba/native/keyboard'
  import { Collection, Row } from '@mamba/collection'

  export default {
    components: {
      Switch: '@mamba/switch',
      Collection,
      Row,
    },
    data() {
      return {
        isKeyboardLightEnabled: Keyboard.Light.isEnabled(),
        isKeyboardSoundEnabled: Keyboard.Sound.isEnabled(),
      }
    },
    methods: {
      toggleKeyboardLight() {
        const { isKeyboardLightEnabled } = this.get()

        if(isKeyboardLightEnabled) {
          Keyboard.Light.enable()
        } else {
          Keyboard.Light.disable()
        }
      },
      toggleKeyboardSound() {
        const { isKeyboardSoundEnabled } = this.get()

        if(isKeyboardSoundEnabled) {
          Keyboard.Sound.enable()
          System.beep()
        } else {
          Keyboard.Sound.disable()
        }
      },
    },
  }

</script>
