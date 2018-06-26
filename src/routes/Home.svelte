<AppBarTitle label="Ajustes"/>

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
  <Row label="7. Recibos" href="/store/receipts" shortcut="7"/>
  <Row label="8. ID do Pedido" shortcut="8">
    <div slot="controller">
      <Switch bind:checked="isOrderIDEnabled" on:change="toggleOrderID()"/>
    </div>
  </Row>
  <Row label="9. Parcelado Emissor" shortcut="9">
    <div slot="controller">
      <Switch bind:checked="isIssuerInstallment" on:change="toggleIssuerInstallment()"/>
    </div>
  </Row>
  <Row label="10. Restaurar dados" href="/store/restore"/>
</Collection>

<script>
  import System from '@mamba/native/system'
  import Keyboard from '@mamba/native/keyboard'
  import Transactions from '@mamba/native/transactions'
  import { Collection, Row } from '@mamba/collection'
  import { AppBarTitle } from '@mamba/appbar'

  export default {
    components: {
      Switch: '@mamba/switch',
      Collection,
      Row,
      AppBarTitle,
    },
    data() {
      return {
        isKeyboardLightEnabled: Keyboard.Light.isEnabled(),
        isKeyboardSoundEnabled: Keyboard.Sound.isEnabled(),
        isOrderIDEnabled: Transactions.isOrderIdEnabled(),
        isIssuerInstallment: Transactions.isIssuerInstallmentsEnabled(),
      }
    },
    methods: {
      toggleIssuerInstallment() {
        const { isIssuerInstallment } = this.get()

        if (isIssuerInstallment) {
          Transactions.enableIssuerInstallments()
        } else {
          Transactions.disableIssuerInstallments()
        }
      },
      toggleOrderID() {
        const { isOrderIDEnabled } = this.get()

        if (isOrderIDEnabled) {
          Transactions.enableOrderId()
        } else {
          Transactions.disableOrderId()
        }
      },
      toggleKeyboardLight() {
        const { isKeyboardLightEnabled } = this.get()

        if (isKeyboardLightEnabled) {
          Keyboard.Light.enable()
        } else {
          Keyboard.Light.disable()
        }
      },
      toggleKeyboardSound() {
        const { isKeyboardSoundEnabled } = this.get()

        if (isKeyboardSoundEnabled) {
          Keyboard.Sound.enable()
          System.beep()
        } else {
          Keyboard.Sound.disable()
        }
      },
    },
  }
</script>
