<template>
  <form class="card auth-card" @submit.prevent="submitHandler">
    <div class="card-content">
      <span class="card-title">Домашняя бухгалтерия</span>
      <div class="input-field">
        <input
            id="email"
            type="text"
            v-model.trim="v$.form.email.$model"
            :class="{invalid: (v$.form.email.$dirty && v$.form.email.required.$invalid) || (v$.form.email.$dirty && v$.form.email.email.$invalid)}"
        >
        <label for="email">Email</label>
        <small class="helper-text invalid"
        v-if="v$.form.email.$dirty && v$.form.email.required.$invalid"
        >Email field must not be empty</small>
        <small class="helper-text invalid"
        v-else-if="v$.form.email.$dirty && v$.form.email.email.$invalid"
        >Email field must be email</small>
      </div>
      <div class="input-field">
        <input
            id="password"
            type="password"
            v-model.trim="v$.form.password.$model"
            :class="{invalid: (v$.form.password.$dirty && v$.form.password.required.$invalid) || (v$.form.password.$dirty && v$.form.password.min.$invalid)}"
        >
        <label for="password">Пароль</label>
        <small class="helper-text invalid"
        v-if="v$.form.password.$dirty && v$.form.password.required.$invalid"
        >Password field must not be empty</small>
        <small class="helper-text invalid"
        v-else-if="v$.form.password.$dirty && v$.form.password.min.$invalid"
        >The password field must be greater than {{this.v$.form.password.min.$params.min}} characters</small>
      </div>
    </div>
    <div class="card-action">
      <div>
        <button
            class="btn waves-effect waves-light auth-submit"
            type="submit"
        >
          Войти
          <i class="material-icons right">send</i>
        </button>
      </div>

      <p class="center">
        Нет аккаунта?
        <router-link to="/register">Зарегистрироваться</router-link>
      </p>
    </div>
  </form>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'
import messages from '@/utils/messages'

export default {
  name: 'login-view',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      form: {
        email: '',
        password: ''
      }
    }
  },
  validations () {
    return {
      form: {
        email: {
          required, email
        },
        password: {
          required,
          min: minLength(4)
        }
      }
    }
  },
  mounted () {
    if (messages[this.$route.query.message]) {
      this.$message(messages[this.$route.query.message])
    }
  },
  methods: {
    async submitHandler () {
      if (this.v$.$invalid) {
        this.v$.$touch()
        return
      }
      const formData = {
        email: this.form.email,
        password: this.form.password
      }
      try {
        await this.$store.dispatch('login', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
