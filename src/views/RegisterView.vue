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
    <div class="input-field">
     <input
          id="name"
          type="text"
          v-model.trim="v$.form.name.$model"
          :class="{invalid: (v$.form.name.$dirty && v$.form.name.required.$invalid)}"
      >
      <label for="email">Имя</label>
      <small class="helper-text invalid"
      v-if="v$.form.name.$dirty && v$.form.name.required.$invalid"
      >Name field must not be empty</small>
    </div>
    <p>
      <label>
        <input type="checkbox"
        v-model.trim="v$.form.agree.$model"
         />
        <span>С правилами согласен</span>
      </label>
    </p>
  </div>
  <div class="card-action">
    <div>
      <button
          class="btn waves-effect waves-light auth-submit"
          type="submit"
      >
        Зарегистрироваться
        <i class="material-icons right">send</i>
      </button>
    </div>

    <p class="center">
      Уже есть аккаунт?
      <router-link to="/login">Войти!</router-link>
    </p>
  </div>
</form>
</template>
<script>
import useVuelidate from '@vuelidate/core'
import { email, required, minLength } from '@vuelidate/validators'

export default {
  name: 'register-view',
  setup () {
    return { v$: useVuelidate() }
  },
  data () {
    return {
      form: {
        email: '',
        password: '',
        name: '',
        agree: false
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
        },
        name: {
          required
        },
        agree: {
          checked: function (value) { return !!value }
        }
      }
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
        name: this.form.name,
        password: this.form.password
      }
      try {
        await this.$store.dispatch('register', formData)
        this.$router.push('/')
      } catch (e) {}
    }
  }
}
</script>
