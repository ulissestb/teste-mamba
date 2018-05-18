<div use:links>
  <AppBar title="Ajustes"/>
  <Route exact path="/">
    <Home/>
  </Route>
  <Route exact path="/network/configure">
    <NetworkConfigure/>
  </Route>
</div>

<script>
  import links from "svelte-routing/links";

  export default {
    components: {
      AppBar: '@mamba/appbar',
      Route: 'svelte-routing/Route',
      Home: '../../routes/Home',
      NetworkConfigure: '../../routes/Network/Configure',
    },
    actions: {
      links,
    },
  }

</script>
