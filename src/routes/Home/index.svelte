<Collection title="Rede">
  <CollectionRow label="1. Configurar" href="/network/configure"/>
</Collection>

<Collection title="Dispositivo">
  <CollectionRow label="2. Som do Teclado">
    <div slot="controller">
      <Switch checked on:change="beep()"/>
    </div>
  </CollectionRow>
  <CollectionRow label="3. Luz do Teclado">
    <div slot="controller">
      <Switch />
    </div>
  </CollectionRow>
  <CollectionRow label="4. Energia" href="/device/energy"/>
</Collection>

<Collection title="Senha">
  <CollectionRow label="5. Alterar senha" href="/password/change"/>
  <CollectionRow label="6. Esqueci minha senha" href="/password/forgot"/>
</Collection>

<Collection title="Lojista">
  <CollectionRow label="7. Recibos" href="/store/receipts"/>
  <CollectionRow label="8. ID do Pedido">
    <div slot="controller">
      <Switch checked disabled />
    </div>
  </CollectionRow>
  <CollectionRow label="9. Parcelado Emissor">
    <div slot="controller">
      <Switch checked />
    </div>
  </CollectionRow>
  <CollectionRow label="10. Restaurar dados" href="/store/restore"/>
</Collection>

<script>
  import { Collection, CollectionRow } from '@mamba/collection'
  import System from '@mamba/native/system'

  export default {
    components: {
      Switch: '@mamba/switch',
      Collection,
      CollectionRow,
    },
    methods: {
      beep() {
        console.log('BEEP') // eslint-disable-line
        System.beep()
      },
    },
  }

</script>
