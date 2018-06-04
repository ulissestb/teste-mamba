<App>
  <AppBar title="Ajustes"/>
  <Route exact path="/" component={Home}/>
  <Route exact path="/network" component={NetworkConfigure}/>
  <Route exact path="/network/wifi" component={Wifis}/>
  <Route path="/network/wifi/:bssid" component={Wifi}/>
</App>

<script>
  import Home from '../../routes/Home'
  import NetworkConfigure from '../../routes/Network/Configure'
  import Wifis from '../../routes/Network/Wifis'
  import Wifi from '../../routes/Network/Wifi'

  export default {
    components: {
      App: '@mamba/app',
      AppBar: '@mamba/appbar',
      Route: 'svelte-routing/Route',
    },
    data() {
      return {
        Home,
        NetworkConfigure,
        Wifis,
        Wifi,
      }
    },
  }

</script>
