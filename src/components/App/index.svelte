<App>
  <AppBar title="Ajustes"/>
  <Route exact path="/" component={Home}/>
  <Route exact path="/network" component={NetworkConfigure}/>
  <Route exact path="/network/wifi" component={Wifis}/>
  <Route path="/network/wifi/:bssid" component={Wifi}/>
  <Route exact path="/energy" component={EnergyConfigure}/>
  <Route exact path="/energy/brightness" component={EnergyBrightness}/>
  <Route exact path="/energy/screenlock" component={EnergyScreenlock}/>
</App>

<script>
  import NetworkConfigure from '../../routes/Network/Configure'
  import Wifis from '../../routes/Network/Wifis'
  import Wifi from '../../routes/Network/Wifi'
  import Home from '../../routes/Home'
  import EnergyConfigure from '../../routes/Energy/Configure'
  import EnergyBrightness from '../../routes/Energy/Brightness'
  import EnergyScreenlock from '../../routes/Energy/Screenlock'

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
        EnergyConfigure,
        EnergyBrightness,
        EnergyScreenlock,
      }
    },
  }

</script>
