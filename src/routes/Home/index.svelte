<h1>Home</h1>
<p>Welcome to my website</p>

<button on:click="openDialog('defaultDialog')">
  Open Default Dialog
</button>

<Dialog ref:defaultDialog on:close="console.log(event)">
  OLHA O COMPONENT FUNFANDO
</Dialog>

<script>
  export default {
    components: {
      Dialog: '@mamba/dialog',
    },
    methods: {
      openDialog(ref) {
        this.refs[ref].open()
      },
    },
  }

</script>
