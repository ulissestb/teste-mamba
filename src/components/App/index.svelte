<div use:links>
  <nav>
    <a href="/">Home</a>
    <a href="/about"><Icon symbol="account"/></a>
  </nav>
</div>

<Route exact path="/">
  <Home/>
</Route>

<Route path="/about">
  <About/>
</Route>

<script>
  import links from "svelte-routing/links";

  export default {
    components: {
      Icon: '@mamba/icon',
      Route: 'svelte-routing/Route',
      About: '../../routes/About',
      Home: '../../routes/Home',
    },
    actions: {
      links,
    },
  }

</script>
