<App>
  <AppBar title="Ajustes"/>
  <Route exact path="/">
    <Home/>
  </Route>
  <Route exact path="/network/configure">
    <NetworkConfigure/>
  </Route>
  <Route exact path="/network/configure/wifi">
    <ConfigureWifi/>
  </Route>
</App>

<script>
  export default {
    components: {
      App: '@mamba/app',
      AppBar: '@mamba/appbar',
      Route: 'svelte-routing/Route',
      Home: '../../routes/Home',
      NetworkConfigure: '../../routes/Network/Configure',
      ConfigureWifi: '../../routes/Network/Wifi',
    },
  }

</script>
