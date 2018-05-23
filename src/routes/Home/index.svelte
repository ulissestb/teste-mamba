<Collection title="Rede">
  <Row label="1. Configurar" href="/network/configure"/>
</Collection>

<Collection title="Dispositivo">
  <Row label="2. Som do Teclado">
    <div slot="controller">
      <Switch bind:checked="isKeyboardSoundEnabled" on:change="toggleKeyboardSound()"/>
    </div>
  </Row>
  <Row label="3. Luz do Teclado">
    <div slot="controller">
      <Switch bind:checked="isKeyboardLightEnabled" on:change="toggleKeyboardLight()"/>
    </div>
  </Row>
  <Row label="4. Energia" href="/device/energy"/>
</Collection>

<Collection title="Senha">
  <Row label="5. Alterar senha" href="/password/change"/>
  <Row label="6. Esqueci minha senha" href="/password/forgot"/>
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
  import { Collection, Row } from '@mamba/collection'

  export default {
    components: {
      Switch: '@mamba/switch',
      Collection,
      Row,
    },
    data() {
      return {
        isKeyboardLightEnabled: System.KeyboardLight.isEnabled(),
        isKeyboardSoundEnabled: System.Sound.isEnabled(),
      }
    },
    methods: {
      toggleKeyboardLight() {
        const { isKeyboardLightEnabled } = this.get()

        if(isKeyboardLightEnabled) {
          System.KeyboardLight.enable()
        } else {
          System.KeyboardLight.disable()
        }
      },
      toggleKeyboardSound() {
        const { isKeyboardSoundEnabled } = this.get()

        if(isKeyboardSoundEnabled) {
          System.Sound.enable()
          System.beep()
        } else {
          System.Sound.disable()
        }
      },
    },
  }

</script>
