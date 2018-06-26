<AppBarTitle label="Restaurar dados" />

<div class="instructions">
  <p>Essa ação apagará todos os dados dessa máquina, incluindo</p>

  <ul>
    <li>histório de transações</li>
    <li>redes armazenadas</li>
    <li>dados do usuário</li>
  </ul>

  <p>Após essa ação, será necessária a reativação dessa máquina.</p>
</div>

<Input
  label="Digite {randomCode} para confirmar"
  validate={validateNumber}
  on:valid="refs.resetDialog.open()"
  value={randomCode}
  autofocus
/>

<ConfirmationDialog
  ref:resetDialog
  title="RESTAURAÇÃO"
  on:positive="resetPOS()"
  on:negative="goHome()"
>
  Tem certeza que deseja restaurar a máquina?
</ConfirmationDialog>


<script>
  import General from '@mamba/native/general'
  import { ConfirmationDialog } from '@mamba/dialog'
  import { AppBarTitle } from '@mamba/appbar'

  const CODE_LENGTH = 6
  const generateRandomCode = length => {
    let code = ''
    for (let index = 0; index < length; index++) {
      code += '' + Math.floor(Math.random() * 10)
    }
    return code
  }

  export default {
    components: {
      Input: '@mamba/input',
      ConfirmationDialog,
      AppBarTitle,
    },
    data() {
      return {
        randomCode: generateRandomCode(CODE_LENGTH),
      }
    },
    computed: {
      validateNumber({ randomCode }) {
        return value => {
          return {
            valid: value === randomCode,
            msg: 'Número inválido',
          }
        }
      },
    },
    methods: {
      async goHome() {
        const { getHistory } = await import('svelte-routing')
        getHistory().push('/')
      },
      resetPOS() {
        General.factoryReset()
      },
    },
  }
</script>

<style>
  .instructions {
    padding: 10px 15px 5px;
  }

  p,
  ul {
    font-size: 14px;
    margin-bottom: 15px;
  }

  p:last-child {
    margin-bottom: 0;
  }

  ul {
    margin-left: 1.2em;
  }
</style>
