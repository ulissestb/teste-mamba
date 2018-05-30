<div class="wifi">
  <Icon symbol="wifi" size="large" level={wifi.strength} />
  <div class="name">{wifi.ssid}</div>
</div>

<div class="action">
  {#if wifi.saved}
    CONECTAR SALVO
  {:elseif wifi.connected}
    ESQUECER
  {:else}
    {#if currentState !== 'INSERT_PASSWORD'}
      <Row label="Conectar" on:click="changeState('INSERT_PASSWORD')">
        <div slot="controller">
          <Icon symbol="chevron-right"/>
        </div>
      </Row>
    {:else}
      <Input type="password" bind:value="passwordValue" label="Senha" alphanumeric autofocus/>
    {/if}

    <Button width="100%" bottom on:click="handleConnect()" disabled={passwordValue.length < 4}>
      CONECTAR
    </Button>

    <Dialog isOpen={connecting}>
      {#await connecting}
        Verificando<br>conexão
      {:then data}
        Conexão efetuada com sucesso
      {:catch e}
        Erro ao conectar ao WI-Fi
      {/await}
    </Dialog>
  {/if}
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
      handleConnect() {
        const { passwordValue, wifi } = this.get()
        wifi.password = passwordValue
        this.set({
          connecting: Network.connect(wifi)
            .then(() => {
              this.set({ connecting: null })
            })
            .catch(() => {
              this.set({ connecting: null })
            }),
        })
      },
      changeState(fieldState) {
        this.set({ currentState: fieldState })
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
