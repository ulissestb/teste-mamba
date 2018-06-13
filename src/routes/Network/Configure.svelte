<Collection>
  <Row label="1. Configurar Wi-Fi" href="/network/wifi" shortcut="1"/>
  <Row label="2. Trocar para {otherAdapterName}" on:click="switchNetworkAdapter()" shortcut="2"/>
</Collection>

<Dialog ref:changedDialog>
  Rede alterada<br>para '<strong>{adapterName}</strong>'
</Dialog>

<script>
  import Dialog from '@mamba/dialog'
  import Network from '@mamba/native/network'
  import { Collection, Row } from '@mamba/collection'

  export default {
    components: {
      Dialog,
      Collection,
      Row,
    },
    data() {
      return {
        networkAdapter: Network.getCurrentNetworkAdapter(),
      }
    },
    computed: {
      adapterName: ({ networkAdapter }) =>
        networkAdapter === 'wifi' ? 'Wi-Fi' : '3G',
      otherAdapterName: ({ networkAdapter }) =>
        networkAdapter !== 'wifi' ? 'Wi-Fi' : '3G',
    },
    methods: {
      switchNetworkAdapter() {
        Network.toggleNetworkAdapter()
        this.set({
          networkAdapter: Network.getCurrentNetworkAdapter(),
        })
        this.refs.changedDialog.open(1000)
      },
    },
  }
</script>
