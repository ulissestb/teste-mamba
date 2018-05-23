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
  import { Collection, Row } from '@mamba/collection'

  export default {
    components: {
      Switch: '@mamba/switch',
      Collection,
      Row,
    },
  }

</script>
