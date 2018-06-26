<AppBarTitle label="Wi-fis"/>

<Collection>
  <Row label="1. Ativar Wi-Fi" shortcut="1">
    <div slot="controller">
      <Switch bind:checked="isWifiEnabled" on:change="toggleWifi()"/>
    </div>
  </Row>
  {#await gettingWifisPromise}
    <ProgressBar />
    <Row label="Procurando redes Wi-Fi..." />
  {:then wifiList}
    {#if isWifiEnabled && wifiList}
      {#each wifiList as wifi}
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
  import Network from '@mamba/native/network'
  import { Collection, Row } from '@mamba/collection'
  import { AppBarTitle } from '@mamba/appbar'

  export default {
    components: {
      Collection,
      Row,
      AppBarTitle,
      Switch: '@mamba/switch',
      Icon: '@mamba/icon',
      ProgressBar: '@mamba/progress',
    },
    data() {
      return {
        /** Wifi enabled flag */
        isWifiEnabled: Network.isWifiEnabled(),
        /** Promise that loads the wifi list onto the store */
        gettingWifisPromise: null,
      }
    },
    oncreate() {
      const { isWifiEnabled } = this.get()
      if (isWifiEnabled) {
        const { wifis } = this.store.get()
        const useSaved = wifis && wifis.length > 0
        this.getWifiList(useSaved)
      }
    },
    methods: {
      getWifiList(useSaved = false) {
        const gettingWifisPromise = useSaved
          ? Promise.resolve(this.store.get().wifis)
          : Network.getWifiList().then(wifis => {
            /** Update the store wifi list */
            this.store.set({ wifis })
            return wifis
          })
        this.set({ gettingWifisPromise })
      },
      toggleWifi() {
        const { isWifiEnabled } = this.get()

        if (isWifiEnabled) {
          Network.enableWifi()
          this.getWifiList()
        } else {
          /** Invalidate the wifi list promise */
          Network.disableWifi()
          this.set({ gettingWifisPromise: null })
        }
      },
    },
  }
</script>
