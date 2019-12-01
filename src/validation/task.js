import {
  required,
  minLength
} from 'vuelidate/lib/validators'
import {checkDate} from '../helper/validation'

export const title = {
  required,
  minLength: minLength(1)
}

export const date = {
  required,
  minValue: checkDate
}
