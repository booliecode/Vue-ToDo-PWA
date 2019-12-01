<template>
  <div id="app">
    <div class="page-container">
  <md-app md-waterfall md-mode="fixed">
    <md-app-toolbar class="md-primary">
      <span class="md-title">ToDo PWA with Vue.js</span>
    </md-app-toolbar>

    <md-app-drawer md-permanent="full">
      <md-list>
        <md-list-item>
          <md-icon>account_circle</md-icon>
          <span class="md-list-item-text"><b>Marc Borkowski</b></span>
        </md-list-item>

        <md-list-item>
          <md-icon>bookmark</md-icon>
          <span class="md-list-item-text"><a href="https://boolie.org/">www.boolie.org</a></span>
        </md-list-item>
        <md-list-item>
          <md-icon>get_app</md-icon>
          <span class="md-list-item-text"><a href="https://github.com/Snowflame/Vue-ToDo-PWA">Code</a></span>
        </md-list-item>
        <md-list-item>
          <md-icon>favorite</md-icon>
          <span class="md-list-item-text">made with love</span>
        </md-list-item>

      </md-list>
    </md-app-drawer>

    <md-app-content>
          <Create @created="handleCreate"/>
          <Item v-bind:tasks="tasks"/>
    </md-app-content>
  </md-app>
</div>
  </div>
</template>

<script>
import 'vue-material/dist/vue-material.css'
import 'vue-material/dist/theme/default.css'
import 'vue-material/dist/vue-material.js'
import Item from './components/Item.vue'
import Create from './components/create.vue'

export default {
  name: 'app',
  components: {
    Item,
    Create
  },
  data: () => ({
    tasks: []
  }),
  methods: {
    handleCreate(value) {
      this.tasks.push(value);
    }
  }
}
</script>
