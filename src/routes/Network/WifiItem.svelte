<div class="wifi">
  <Icon symbol="wifi" size="large" level={wifi.strength} />
  <div class="name">{wifi.ssid}</div>
</div>

<script>
  export default {
    components: {
      Icon: '@mamba/icon',
    },
    computed: {
      wifi({ $wifis, match }){
        return $wifis.find(o => o.bssid === match.params.bssid)
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
    margin-left: 10px;
  }
</style>
