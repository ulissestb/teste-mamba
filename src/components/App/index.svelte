<App>
  <AppBar title="Mamba"/>
  <nav>
    <a href="/">Home</a>
    <a href="/about">About</a>
  </nav>

  <Route exact path="/">
    <Home/>
  </Route>

  <Route path="/about">
    <About/>
  </Route>

</App>
<script>
  export default {
    components: {
      App: '@mamba/app',
      AppBar: '@mamba/appbar',
      Route: 'svelte-routing/Route',
      About: '../../routes/About',
      Home: '../../routes/Home',
    },
  }

</script>
