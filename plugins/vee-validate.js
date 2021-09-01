import Vue from 'vue'
import {
  ValidationObserver,
  ValidationProvider,
  extend,
  configure,
} from 'vee-validate'
import { required, email } from 'vee-validate/dist/rules'

extend('required', required)

extend('email', email)

extend('phone', {
  validate: (value) => {
    if (!value) return true
    const regex = /^((\\+234-?)|0)?[0-9]{11}$/g
    return Boolean(value.match(regex))
  },
  message:
    'The Phone field must contain only numbers and must be at least 11 characters.',
})

configure({
  classes: {
    invalid: 'error',
  },
})

Vue.component('ValidationObserver', ValidationObserver)
Vue.component('ValidationProvider', ValidationProvider)
