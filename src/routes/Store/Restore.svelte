{#if !resetting}
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
{:else}
  <div class="restoring">
    Restaurando a máquina...
  </div>
{/if}

<script>
  import General from '@mamba/native/general'
  import { ConfirmationDialog } from '@mamba/dialog'

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
        this.set({ resetting: true })
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

  .number {
    font-size: 20px;
    text-align: center;
  }

  .restoring {
    width: 90%;
    position: absolute;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    font-size: 22px;
    text-align: center;
  }
</style>
