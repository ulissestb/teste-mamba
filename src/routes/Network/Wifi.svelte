<div class="wifi">
  <Icon symbol="wifi" size="large" level={wifi.strength} />
  <div class="name">{wifi.ssid}</div>
</div>

<div class="action">
  {#if wifi.saved || wifi.connected }
    <Row label="1. Esquecer" on:click="forgetWifi(wifi)" shortcut="1">
      <div slot="controller">
        <Icon symbol="chevron-right"/>
      </div>
    </Row>
  {/if}

  {#if !wifi.connected}
    {#if currentState !== 'INSERT_PASSWORD'}
      <Row
        label="{wifi.saved ? '2' : '1'}. Conectar"
        on:click="connectWifi(wifi)"
        shortcut="{wifi.saved ? '2' : '1'}"
      >
        <div slot="controller">
          <Icon symbol="chevron-right"/>
        </div>
      </Row>
    {:else}
      <Input
        type="password"
        readable
        bind:value="passwordValue"
        label="Senha"
        alphanumeric
        autofocus
        on:submit="refs.connectButton.fire('click')"
      />

      <Button width="100%" bottom
        ref:connectButton
        on:click="connectWifi(wifi, passwordValue)"
        disabled={passwordValue !== '' && passwordValue.length < 4}
        shortcut="enter"
      >
        CONECTAR
      </Button>
    {/if}
  {/if}

  <!-- Forget wifi dialog -->
  <PromisedDialog promise={forgetting}>
    <RoundIcon symbol="check" size="giant"/>
    <div style="margin-top: 15px;">
      '{wifi.ssid}' esquecido com sucesso!
    </div>
  </PromisedDialog>

  <!-- Connect wifi dialog -->
  <PromisedDialog promise={connecting}>
    {#await connecting}
      <Sprite src="assets/images/loading-sprite.png" width="70px"/>
      <div>Conectando a '{wifi.ssid}'</div>
    {:then d}
      <RoundIcon symbol="check" size="giant"/>
      <div style="margin-top: 15px;">
        Conexão efetuada<br>com sucesso!
      </div>
    {:catch e}
      <img src="assets/images/error.png" alt="Erro"/>
      <div>Algo deu errado :(</div>
    {/await}
  </PromisedDialog>
</div>

<script>
  import Network from '@mamba/native/network'
  import { Row } from '@mamba/collection'
  import { Icon, RoundIcon } from '@mamba/icon'
  import { PromisedDialog } from '@mamba/dialog'

  export default {
    components: {
      Row,
      Icon,
      RoundIcon,
      PromisedDialog,
      Button: '@mamba/button',
      Input: '@mamba/input',
      Sprite: '@mamba/sprite',
    },
    data() {
      return {
        forgetting: null,
        connecting: null,
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
      connectWifi(wifi, password) {
        /** Trying to connect a wifi that's not saved? */
        if (!wifi.saved && typeof password === 'undefined') {
          this.set({ currentState: 'INSERT_PASSWORD' })
          return
        }

        wifi = !password ? wifi : { ...wifi, password: password }

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
