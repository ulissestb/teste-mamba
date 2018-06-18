<Title label="Esqueci minha senha" />

<div class="instructions">
  Ligue para <strong>3004-9680</strong> e informe o número:
  <br>
  <br>
  <div class="number">
    <strong>{generatedRecoverNumber}</strong>
  </div>
</div>

<a href="/password/forgot/{generatedRecoverNumber}" shortcut="enter">
  <Button width="100%" bottom>
    Pŕoximo
  </Button>
</a>


<script>
  import { Title } from '@mamba/appbar'
  import Password from '@mamba/native/password'

  export default {
    components: {
      Button: '@mamba/button',
      Title,
    },
    data() {
      return {
        generatedRecoverNumber: Password.generateRecoverPasswordCode(),
      }
    },
  }
</script>

<style>
  .instructions {
    padding: 15px;
    background-color: #fff;
    font-size: 16px;
  }

  .number {
    font-size: 20px;
    text-align: center;
  }
</style>
