<AppBarTitle ref:teste label="Home"/>


<script>
  import { AppBarTitle } from '@mamba/appbar'

  export default {
    components: {
      AppBarTitle,
    },
    data() {
      return {}
    },
    methods: {},
  }
</script>

<style>
  .teste {
    p {
      color: 1;
    }
  }

  ref:teste {
    background: 'red';
  }
</style>
