<Collection>
  <Row label="Wi-Fi ativado">
    <div slot="controller">
      <Switch bind:checked="isWifiEnabled" on:change="toggleWifi()"/>
    </div>
  </Row>
  {#await $wifis}
    <ProgressBar />
    <Row label="Procurando redes Wi-Fi..." />
  {:then wifis}
    {#if isWifiEnabled}
      {#each wifis as wifi}
        <Row
          label={wifi.ssid}
          description={wifi.connected ? 'Conectado' : wifi.saved ? 'Salvo' : undefined}
          href="/network/wifi/{wifi.bssid}"
        >
          <div slot="controller">
            <Icon symbol="wifi" level={wifi.strength}/>
          </div>
        </Row>
      {/each}
    {/if}
  {:catch error}
    <Row label="Erros ao procurar Wi-Fi..." />
  {/await}
</Collection>

<script>
  import Network from '../../native/network'
  import { Collection, Row } from '@mamba/collection'

  export default {
    components: {
      Collection,
      Row,
      Switch: '@mamba/switch',
      Icon: '@mamba/icon',
      ProgressBar: '@mamba/progress',
    },
    data() {
      return {
        isWifiEnabled: Network.isWifiEnabled(),
      }
    },
    oncreate() {
      const { wifis } = this.store.get()
      const { isWifiEnabled } = this.get()
      if (isWifiEnabled && wifis.length === 0) {
        this.getWifiList()
      }
    },
    methods: {
      getWifiList() {
        /** Set the wifis to a promise and, when its resolved, to the wifi list */
        this.store.setPromise(
          {
            wifis: Network.getWifiList(),
          },
          /** Transform the 'wifis' when promise fulfilled */
          {
            wifis: data => (this.get().isWifiEnabled ? data : []),
          },
        )
      },
      toggleWifi() {
        const { isWifiEnabled } = this.get()

        if (isWifiEnabled) {
          Network.enableWifi()
          this.getWifiList()
        } else {
          Network.disableWifi()
          this.store.set({ wifis: [] })
        }
      },
    },
  }
</script>
