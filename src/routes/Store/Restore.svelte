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
/>

<Dialog
  ref:resetDialog
  actions={[{
    label: 'Cancelar',
    event: 'cancel',
    props: {
      bgColor: 'white',
      textColor: 'black',
      borderColor: '#4ebf1a'
    }
  },
  {
    label: 'Ok',
    event: 'ok'
  }]}
  on:ok="resetPOS()"
>
  <div style="margin-top: 15px;">
    Tem certeza que deseja restaurar a máquina?
  </div>
</Dialog>

<script>
  import General from '@mamba/native/general'

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
      Dialog: '@mamba/dialog',
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
      resetPOS(){
        General.factoryReset();
      },
    },
  }
</script>

<style>
  .instructions {
    padding: 15px;
  }

  p,
  ul {
    font-size: 14px;
    margin-bottom: 15px;
  }

  ul {
    margin-left: 1.2em;
  }

  .number {
    font-size: 20px;
    text-align: center;
  }
</style>
