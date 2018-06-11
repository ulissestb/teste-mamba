<div class="row">
  <Input
    ref:inputCurrent
    type="password"
    bind:value="currentPassword"
    label="Senha atual"
    validate={validateCurrentPassword}
    on:invalid="set({ step: 0 })"
    on:valid="set({ step: 1 })"
    disabled={step > 0}
    maxlength="4"
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
      on:invalid="set({ step: 1 })"
      on:valid="set({ step: 2 })"
      disabled={step > 1}
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
        on:invalid="set({ step: 2 })"
        on:valid="set({ step: 3 })"
        disabled={step > 2}
        maxlength="4"
        autofocus
      />
    </div>
  {/if}

  {#if step > 2}
    <Button width="100%" bottom shortcut="enter" on:click="changePassword()">
      Alterar senha
    </Button>
  {/if}
{/if}

<Dialog ref:changedDialog duration="2000">
  Senha alterada<br>com sucesso
</Dialog>

<style>
  .row + .row {
    border-top: 1px solid #dbdbdb;
  }
</style>


<script>
  import Password from '@mamba/native/password'

  export default {
    components: {
      Input: '@mamba/input',
      Button: '@mamba/button',
      Dialog: '@mamba/dialog',
    },
    data() {
      return {
        step: 0,
        validatePassword: value => Password.validatePassword(value),
        validateCurrentPassword(value) {
          return {
            valid: Password.matchesPassword(value),
            msg: 'Senha Incorreta',
          }
        },
      }
    },
    computed: {
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
      changePassword() {
        const { currentPassword, newPassword, confirmPassword } = this.get()
        if (
          this.refs.inputCurrent.validate() &&
          this.refs.inputNew.validate() &&
          this.refs.inputConfirmation.validate()
        ) {
          Password.changePassword(currentPassword, newPassword, confirmPassword)
          this.refs.changedDialog.open()
        }
      },
    },
  }
</script>
