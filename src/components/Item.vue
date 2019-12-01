<template>
  <div class="md-layout-item md-size-100">
    <md-card class="md-layout-item md-size-100 md-small-size-100" v-bind:key="index" v-for="(task, index) in tasks">
      <md-card-header>
        <div class="md-title">{{task.title}}</div>
      </md-card-header>

      <md-card-content>
        {{task.date.toLocaleDateString('en-US', options)}}
      </md-card-content>

      <md-card-actions>
        <md-button @click.native='task.showForm = !task.showForm'>Edit</md-button>
        <md-button class="md-primary" @click.native="deleteTask(index)">Done</md-button>
      </md-card-actions>
      <div v-if="task.showForm">
        <form novalidate class="md-layout" @submit.prevent="validateTask(index)" id="form">
          <md-card class="md-layout-item md-size-100">
            <md-card-content>
              <div class="md-layout md-gutter">
                <div class="md-layout-item md-small-size-100">
                  <md-field :class="getValidationClass('title', index)">
                    <label for="title">Task</label>
                    <md-input name="title" id="title" v-model="task.title" />
                    <span class="md-error" v-if="!$v.tasks.$each[index].title.required">The task is required</span>
                    <span class="md-error" v-else-if="!$v.tasks.$each[index].title.minlength">Invalid task... minimum of 3 characters.</span>
                  </md-field>
                </div>

                <div class="md-layout-item md-small-size-100">
                  <md-datepicker name="date" id="date" :class="getValidationClass('date', index)" v-model="task.date">
                    <label for="date">Date</label>
                    <span class="md-error" v-if="!$v.tasks.$each[index].date.required">The date is required</span>
                    <span class="md-error" v-else-if="!$v.tasks.$each[index].date.minValue">Invalid date... only future date.</span>
                  </md-datepicker>
                </div>
              </div>
            </md-card-content>

            <md-card-actions>
              <md-button type="submit" class="md-primary">Update</md-button>
            </md-card-actions>
          </md-card>
        </form>
      </div>
    </md-card>
  </div>
</template>

<script>
  import { validationMixin } from 'vuelidate'
  import {title, date} from '../validation/task'
  export default {
    name: 'RegularCards',
    props: ['initTasks'],
    mixins: [validationMixin],
    data() {
      return {
        tasks: this.initTasks,
        options: { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' }
      }
    },
    validations: {
      tasks: {
        $each: {
          title: title,
          date: date,
        }
      }
    },
    methods: {
      deleteTask (index) {
        this.$emit('delete', index)
      },
      editTask (index) {
        this.$emit('edit', index, this.tasks[index])
      },
      getValidationClass (fieldName, index) {
          const field = this.$v.tasks.$each[index][fieldName]
          if (field) {
            return {
              'md-invalid': field.$invalid && field.$dirty
            }
          }
      },
      validateTask (index) {
        this.$v.$touch()

        if (!this.$v.$invalid) {
          this.tasks[index].showForm = false
          this.editTask(index)
        }
      }
    }
  }
</script>
<style lang="scss" scoped>
  .md-card {
    display: inline-block;
    vertical-align: top;
    margin: 10px 0 0 0;
  }
</style>
