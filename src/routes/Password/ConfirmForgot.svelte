<div class="container">

  <div class="row">
    <Input
      ref:inputMatchCode
      label="Número Fornecido"
      validate={validateRecoveryCode}
      on:valid="gotoNextStep('inputNew')"
      maxlength="8"
      autofocus
    />
  </div>

  {#if step > 0}
    <div class="row">
      <Input
        ref:inputNew
        type="password"
        bind:value="newPassword"
        label="Nova senha"
        validate={validatePassword}
        on:valid="gotoNextStep('inputConfirmation')"
        maxlength="4"
        autofocus
      />
    </div>

    {#if step > 1}
      <div class="row">
        <Input
          ref:inputConfirmation
          type="password"
          bind:value="confirmPassword"
          label="Confirme a nova senha"
          validate={validateConfirmPassword}
          on:valid="gotoNextStep()"
          maxlength="4"
          autofocus
        />
      </div>
    {/if}

    {#if step > 2}
      <div style="margin-top: 38px;">
        <Button width="100%" bottom shortcut="enter" on:click="changePassword()">
          Alterar senha
        </Button>
      </div>

      <Dialog ref:changedDialog duration="2000" on:close="goHome()">
        <RoundIcon symbol="check" size="giant"/>
        <div style="margin-top: 15px;">
          Senha alterada<br>com sucesso
        </div>
      </Dialog>
    {/if}
  {/if}
</div>

<script>
  import Password from '@mamba/native/password'
  import { RoundIcon } from '@mamba/icon'

  export default {
    components: {
      RoundIcon,
      Input: '@mamba/input',
      Button: '@mamba/button',
      Dialog: '@mamba/dialog',
    },
    data() {
      return {
        step: 0,
        validatePassword: value => Password.validatePassword(value),
      }
    },
    computed: {
      validateRecoveryCode({ match }) {
        const { recoveryNumber } = match.params
        return matchCodeValue => {
          return {
            valid: Password.verifyMatchCode(recoveryNumber, matchCodeValue),
            msg: 'Número incorreto',
          }
        }
      },
      /** This must be a computed property because it depends on the 'newPassword' */
      validateConfirmPassword({ validatePassword, newPassword }) {
        return value => {
          const ret = validatePassword(value)
          if (!ret.valid) return ret

          return {
            valid: value === newPassword,
            msg: 'Senhas não correspondem',
          }
        }
      },
    },
    methods: {
      gotoNextStep(focusRef) {
        this.set({ step: this.get().step + 1})
        if(focusRef) {
          this.refs[focusRef].focus()
        }
      },
      async goHome() {
        const { getHistory } = await import('svelte-routing')
        getHistory().push('/')
      },
      changePassword() {
        const { currentPassword, newPassword, confirmPassword } = this.get()
        const validInputs =
          this.refs.inputMatchCode.validate() &&
          this.refs.inputNew.validate() &&
          this.refs.inputConfirmation.validate()

        if (validInputs) {
          Password.changePassword(currentPassword, newPassword, confirmPassword)
          this.refs.changedDialog.open()
        }
      },
    },
  }
</script>

<style>
  .row + .row {
    border-top: 1px solid #dbdbdb;
  }
</style>

