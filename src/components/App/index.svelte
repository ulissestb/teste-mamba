{#if wrapWithPOS === true}
  <POS>
    <svelte:self />
  </POS>
{:else}
  <nav>
    <NavLink exact to="/">Home</NavLink>
    <NavLink to="/about">About</NavLink>
  </nav>

  <Route exact path="/">
    <Home/>
  </Route>

  <Route path="/about">
    <About/>
  </Route>
{/if}

<script>
  export default {
    components: {
      POS: '@mamba/pos',
      NavLink: 'svelte-routing/NavLink',
      Route: 'svelte-routing/Route',
      About: '../../routes/About',
      Home: '../../routes/Home',
    },
  }

</script>
