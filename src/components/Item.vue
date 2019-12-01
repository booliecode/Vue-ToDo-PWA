<template>
  <div class="md-layout-item md-size-100">
    <md-card class="md-layout-item md-size-100 md-small-size-100" v-bind:key="task.title" v-for="task in tasks">
      <md-card-header>
        <div class="md-title">{{task.title}}</div>
      </md-card-header>

      <md-card-content>
        {{task.date}}
      </md-card-content>

      <md-card-actions>
        <md-button>Edit</md-button>
        <md-button class="md-primary">Done</md-button>
      </md-card-actions>
    </md-card>
  </div>
</template>

<script>
export default {
  name: 'RegularCards',
  props: ['tasks']
}
</script>
<style lang="scss" scoped>
  .md-card {
    display: inline-block;
    vertical-align: top;
    margin: 10px 0 0 0;
  }
</style>
