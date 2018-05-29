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
      <Input type="password" label="Senha" autofocus bind:value="passwordValue"/>
    {/if}
    <Button width="100%" bottom on:click="handleConnect()" disabled={passwordValue.length < 8}>CONECTAR</Button>
  {/if}
</div>

<script>
  import { Row } from '@mamba/collection'

  export default {
    components: {
      Row,
      Button: '@mamba/button',
      Icon: '@mamba/icon',
      Input: '@mamba/input',
    },
    data() {
      return {
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
        console.log(wifi)
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
