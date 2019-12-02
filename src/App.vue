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
          <Create @create="handleCreate"/>
          <Item v-bind:initTasks="tasks" @delete="handleDelete" @edit="handleEdit"/>
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
import {sortDate} from './helper/sort'
import {notificationHandler} from './helper/notificationManager'
import {saveStorage, loadStorage} from './helper/storage'

export default {
  name: 'app',
  components: {
    Item,
    Create
  },
  created: function () {
    this.tasks.map(task => {
      const time = (new Date(task.date) - new Date());
      notificationHandler.sendNotifiction(task.title, time);
    });
  },
  data: () => ({
    tasks: loadStorage()
  }),
  methods: {
    handleCreate(task) {
      this.tasks.push(task);
      this.tasks.sort(sortDate);
      notificationHandler.sendNotifiction(task.title, new Date(task.date) - new Date());
      saveStorage(this.tasks);
    },
    handleDelete(index) {
      this.tasks.splice (index, 1);
      saveStorage(this.tasks);
    },
    handleEdit(index, task) {
      this.tasks[index] = task;
      this.tasks.sort(sortDate);
      notificationHandler.sendNotifiction(task.title, new Date(task.date) - new Date());
      saveStorage(this.tasks);
    }
  }
}
</script>
