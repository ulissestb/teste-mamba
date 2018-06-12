<Collection title="Recibos">
  <Row label="1. Via Estabelecimento" shortcut="1">
    <div slot="controller">
      <Switch bind:checked="isMerchantReceiptEnabled" on:change="toggleMerchantReceipt()"/>
    </div>
  </Row>
  <Row label="2. Ocultar Endereço" shortcut="2">
    <div slot="controller">
      <Switch bind:checked="isHideMerchantAddressEnabled" on:change="toggleHideAddress()"/>
    </div>
  </Row>
  <Row label="3. Frase no Recibo" shortcut="3">
    <div slot="controller">
      <Switch bind:checked="isReceiptPhraseEnabled" on:change="toggleReceiptPhrase()"/>
    </div>
    <div slot="extra">
      {#if isReceiptPhraseEnabled}
        <Input
          label="Frase"
          alphanumeric
          autofocus
          bind:value="receiptPhrase"
          on:keydown="set({ changedPhrase: true })"
          on:submit="changePhrase()"/>
        {#if changedPhrase}
          <Button size="small" width="100%" on:click="changePhrase()">Alterar frase</Button>
        {/if}
      {/if}
    </div>
  </Row>
  <Row label="4. Recibo Econômico" shortcut="4">
    <div slot="controller">
      <Switch bind:checked="isEconomicReceipt" on:change="toggleEconomicReceipt()"/>
    </div>
  </Row>
</Collection>


<Dialog ref:changedDialog duration="2000" bgColor="#4ebf1a" textColor="#fff">
  <RoundIcon symbol="check" size="giant" color="#4ebf1a" bgColor="#fff"/>
  <div style="margin-top: 15px;">
    Frase alterada<br>com sucesso
  </div>
</Dialog>


<script>
  import Receipts from '@mamba/native/receipts'
  import { Collection, Row } from '@mamba/collection'
  import { RoundIcon } from '@mamba/icon'

  export default {
    components: {
      Button: '@mamba/button',
      Switch: '@mamba/switch',
      Input: '@mamba/input',
      Dialog: '@mamba/dialog',
      RoundIcon,
      Collection,
      Row,
    },
    data() {
      return {
        isMerchantReceiptEnabled: Receipts.isMerchantReceiptEnabled(),
        isHideMerchantAddressEnabled: Receipts.isHideMerchantAddressEnabled(),
        isReceiptPhraseEnabled: Receipts.isReceiptPhraseEnabled(),
        isEconomicReceipt: Receipts.isReceiptEconomic(),
        receiptPhrase: Receipts.getReceiptPhrase(),
      }
    },
    methods: {
      changePhrase() {
        const { receiptPhrase }= this.get()
        Receipts.setReceiptPhrase(receiptPhrase);
        this.refs.changedDialog.open()
        this.set({ changedPhrase: false })
      },
      toggleReceiptPhrase() {
        const { isReceiptPhraseEnabled } = this.get()

        if (isReceiptPhraseEnabled) {
          Receipts.enableReceiptPhrase()
          this.set({ changedPhrase: false })
        } else {
          Receipts.disableReceiptPhrase()
        }
      },
      toggleMerchantReceipt() {
        const { isMerchantReceiptEnabled } = this.get()

        if (isMerchantReceiptEnabled) {
          Receipts.enableMerchantReceipt()
        } else {
          Receipts.disableMerchantReceipt()
        }
      },
      toggleHideAddress() {
        const { isHideMerchantAddressEnabled } = this.get()

        if (isHideMerchantAddressEnabled) {
          Receipts.enableHideMerchantAddress()
        } else {
          Receipts.disableHideMerchantAddress()
        }
      },
      toggleEconomicReceipt() {
        const { isEconomicReceipt } = this.get()
        Receipts.setReceiptEconomic(isEconomicReceipt)
      },
    },
  }
</script>
