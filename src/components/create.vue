<template>
  <div>
    <form novalidate class="md-layout" @submit.prevent="validateTask">
      <md-card class="md-layout-item md-size-100">
        <md-card-header>
          <div class="md-title">Create Task</div>
        </md-card-header>

        <md-card-content>
          <div class="md-layout md-gutter">
            <div class="md-layout-item md-small-size-100">
              <md-field :class="getValidationClass('title')">
                <label for="title">Task</label>
                <md-input name="title" id="title" v-model="form.title" />
                <span class="md-error" v-if="!$v.form.title.required">The task is required</span>
                <span class="md-error" v-else-if="!$v.form.title.minlength">Invalid task... minimum of 3 characters.</span>
              </md-field>
            </div>

            <div class="md-layout-item md-small-size-100">
              <md-datepicker name="date" id="date" :class="getValidationClass('date')" v-model="form.date">
                <label for="date">Date</label>
                <span class="md-error" v-if="!$v.form.date.required">The date is required</span>
                <span class="md-error" v-else-if="!$v.form.date.minValue">Invalid date... only future date.</span>
              </md-datepicker>
            </div>
          </div>
        </md-card-content>

        <md-card-actions>
          <md-button type="submit" class="md-primary">Create</md-button>
        </md-card-actions>
      </md-card>
    </form>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {
    required,
    minLength
  } from 'vuelidate/lib/validators'

  export default {
    name: 'FormValidation',
    mixins: [validationMixin],
    data: () => ({
      form: {
        task: null,
        date: null,
      }
    }),
    validations: {
      form: {
        title: {
          required,
          minLength: minLength(3)
        },
        date: {
          required,
          minValue:
            value =>
              new Date(value).toISOString() >= new Date(Date.now() - 24*60*60*1000).toISOString()
              // 24h * 60min * 60s * 1000ms (yesterday same Time)
        }
      }
    },
    methods: {
      getValidationClass (fieldName) {
        const field = this.$v.form[fieldName]

        if (field) {
          return {
            'md-invalid': field.$invalid && field.$dirty
          }
        }
      },
      clearForm () {
        this.$v.$reset()
        this.form.title = null
        this.form.date = null
      },
      saveTask () {
        this.$emit('created', {
          title: this.form.title,
          date: this.form.date
        })
        this.clearForm()
      },
      validateTask () {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.saveTask()
        }
      }
    }
  }
</script>
