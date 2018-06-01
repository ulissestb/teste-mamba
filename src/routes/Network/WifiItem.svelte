<div class="wifi">
  <Icon symbol="wifi" size="large" level={wifi.strength} />
  <div class="name">{wifi.ssid}</div>
</div>

<div class="action">
  {#if wifi.saved || wifi.connected }
    <Row label="Esquecer" on:click="forgetWifi(wifi)">
      <div slot="controller">
        <Icon symbol="chevron-right"/>
      </div>
    </Row>
  {/if}

  {#if !wifi.connected}
    {#if currentState !== 'INSERT_PASSWORD'}
      <Row label="Conectar" on:click="connectWifi(wifi)">
        <div slot="controller">
          <Icon symbol="chevron-right"/>
        </div>
      </Row>
    {:else}
      <Input type="password" bind:value="passwordValue" label="Senha" alphanumeric autofocus/>

      <Button width="100%" bottom
        on:click="connectWifi(wifi, passwordValue)"
        disabled={passwordValue !== '' && passwordValue.length < 4}
      >
        CONECTAR
      </Button>
    {/if}
  {/if}

  <!-- Forget wifi dialog -->
  <Dialog isOpen={forgetting}>
    <img src="assets/images/success.png" alt="Sucesso"/>
    <div>Wi-Fi esquecido com sucesso!</div>
  </Dialog>

  <!-- Connect wifi dialog -->
  <Dialog isOpen={connecting}>
    {#await connecting}
      <Sprite src="assets/images/loading-sprite.png" width="70px"/>
      <div>Carregando...</div>
    {:then d}
      <img src="assets/images/success.png" alt="Sucesso"/>
      <div>Conexão efetuada com sucesso!</div>
    {:catch e}
      <img src="assets/images/error.png" alt="Erro"/>
      <div>Algo deu errado :(</div>
    {/await}
  </Dialog>
</div>

<script>
  import Network from '@mamba/native/network'
  import { Row } from '@mamba/collection'
  import { Dialog } from '@mamba/dialog'

  export default {
    components: {
      Dialog,
      Row,
      Button: '@mamba/button',
      Icon: '@mamba/icon',
      Input: '@mamba/input',
      Sprite: '@mamba/sprite',
    },
    data() {
      return {
        forgetting: false,
        connecting: false,
        currentState: null,
        passwordValue: '',
      }
    },
    computed: {
      wifi({ $wifis, match }) {
        return $wifis.find(o => o.bssid === match.params.bssid)
      },
    },
    methods: {
      forgetWifi(wifi) {
        this.set({
          forgetting: Network.forgetWifi(wifi).then(() => {
            let { wifis } = this.store.get()
            wifis = wifis.map(item => {
              if (item.bssid === wifi.bssid) {
                return {
                  ...wifi,
                  connected: false,
                  saved: false,
                  password: undefined,
                }
              }

              return { ...item }
            })
            this.store.set({ wifis })
          }),
        })
      },
      connectWifi(wifi, passwordValue) {
        /** Trying to connect a wifi that's not saved? */
        if (!wifi.saved && !passwordValue) {
          this.set({ currentState: 'INSERT_PASSWORD' })
          return
        }

        wifi = !passwordValue ? wifi : { ...wifi, password: passwordValue }

        this.set({
          connecting: Network.connect(wifi).then(() => {
            let { wifis } = this.store.get()
            wifis = wifis.map(item => {
              if (item.bssid === wifi.bssid) {
                return {
                  ...wifi,
                  connected: true,
                }
              }

              return {
                ...item,
                connected: false,
              }
            })
            this.store.set({ wifis })
          }),
        })
      },
    },
  }
</script>

<style>
  .wifi {
    display: block;
    padding: 10px 20px;
    margin: 0;
    line-height: 1.5rem;
    background-color: #fff;
    display: flex;
    align-items: center;
  }

  .name {
    font-weight: bold;
    margin-left: 10px;
    color: #4a4a4a;
  }

  .action {
    margin-top: 15px;
  }
</style>
