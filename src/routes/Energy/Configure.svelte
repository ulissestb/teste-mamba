<AppBarTitle label="Energia"/>

<Collection>
  <Row label="1. Brilho da tela" href="/energy/brightness" shortcut="1"/>
  <Row label="2. Bloqueio da tela" href="/energy/screenlock" shortcut="2"/>
</Collection>

<script>
  import { Collection, Row } from '@mamba/collection'
  import { AppBarTitle } from '@mamba/appbar'

  export default {
    components: {
      Collection,
      Row,
      AppBarTitle,
    },
  }
</script>
