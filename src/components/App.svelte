<App>
  <AppBar title="Ajustes"/>
  <Route exact path="/" component={Home}/>

  <Route exact path="/network" component={NetworkConfigure}/>
  <Route exact path="/network/wifi" component={Wifis}/>
  <Route path="/network/wifi/:bssid" component={Wifi}/>

  <Route exact path="/energy" component={EnergyConfigure}/>
  <Route exact path="/energy/brightness" component={EnergyBrightness}/>
  <Route exact path="/energy/screenlock" component={EnergyScreenlock}/>

  <Route exact path="/password/change" component={ChangePassword}/>
  <Route exact path="/password/forgot" component={ForgotPassword}/>
  <Route path="/password/forgot/:recoveryNumber" component={ConfirmForgotPassword}/>

  <Route exact path="/store/receipts" component={Receipts}/>
  <Route exact path="/store/restore" component={Restore}/>
</App>

<script>
  import NetworkConfigure from '../routes/Network/Configure.svelte'
  import Wifis from '../routes/Network/Wifis.svelte'
  import Wifi from '../routes/Network/Wifi.svelte'
  import Home from '../routes/Home.svelte'
  import EnergyConfigure from '../routes/Energy/Configure.svelte'
  import EnergyBrightness from '../routes/Energy/Brightness.svelte'
  import EnergyScreenlock from '../routes/Energy/Screenlock.svelte'
  import ChangePassword from '../routes/Password/Change.svelte'
  import ForgotPassword from '../routes/Password/Forgot.svelte'
  import ConfirmForgotPassword from '../routes/Password/ConfirmForgot.svelte'
  import Receipts from '../routes/Store/Receipts.svelte'
  import Restore from '../routes/Store/Restore.svelte'

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
        ChangePassword,
        ForgotPassword,
        ConfirmForgotPassword,
        Receipts,
        Restore,
      }
    },
  }

</script>
