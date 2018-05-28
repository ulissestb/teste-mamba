<App>
  <AppBar title="Ajustes"/>
  <Route exact path="/" component={Home}/>
  <Route exact path="/network" component={NetworkConfigure}/>
  <Route exact path="/network/wifi" component={WifiMain}/>
  <Route path="/network/wifi/:bssid" component={WifiItem}/>
</App>

<script>
  import Home from '../../routes/Home'
  import NetworkConfigure from '../../routes/Network/Configure'
  import WifiMain from '../../routes/Network/Wifi'
  import WifiItem from '../../routes/Network/WifiItem'

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
        WifiMain,
        WifiItem,
      }
    },
  }

</script>
