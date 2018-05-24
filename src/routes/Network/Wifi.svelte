<Collection>
  <Row label="Wi-Fi ativado">
    <div slot="controller">
      <Switch bind:checked="isWifiEnabled" on:change="toggleWifi()"/>
    </div>
  </Row>
  {#if wifiList}
    {#await wifiList}
      <Row label="Procurando redes Wi-Fi..." />
    {:then wifis}
      {#each wifis as wifi}
        <Row label={wifi.ssid}>
          <div slot="controller">
            <Icon symbol="wifi" level={wifi.strength}/>
          </div>
          <p slot="description">{
            wifi.connected
              ? 'Conectado'
              : wifi.saved
                ? 'Salvo'
                : ''
          }</p>
        </Row>
      {/each}
    {:catch error}
      <Row label="Erros ao procurar Wi-Fi..." />
    {/await}
  {/if}
</Collection>

<script>
  import Network from '@mamba/native/network'
  import { Collection, Row } from '@mamba/collection'

  export default {
    components: {
      Collection,
      Row,
      Switch: '@mamba/switch',
      Icon: '@mamba/icon',
    },
    data() {
      return {
        isWifiEnabled: Network.isWifiEnabled(),
        wifis: [],
      }
    },
    computed: {
      wifiList({ isWifiEnabled }) {
        console.log(isWifiEnabled) // eslint-disable-line
        if(!isWifiEnabled) {
          return []
        }

        return new Promise((resolve, reject) => {
          Network.getWifiList((err, data) => {
            if(err) {
              console.error(err)
              return
            }
            data.sort((a, b) => {
              if (a.connected || a.strength > b.strength) return -1;
              if (b.connected || a.strength < b.strength) return 1;

              return 0;
            });
            resolve(data)
          })
        })
      },
    },
    methods: {
      toggleWifi() {
        const { isWifiEnabled } = this.get()

        if(isWifiEnabled) {
          Network.enableWifi()
        } else {
          Network.disableWifi()
        }
      },
    },
  }

</script>
