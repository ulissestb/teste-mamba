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

  export default {
    components: {
      Switch: '@mamba/switch',
      Collection,
      CollectionRow,
    },
  }

</script>
