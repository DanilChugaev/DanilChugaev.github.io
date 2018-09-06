<template>
  <div class="ss-flex ss-flex--column">
    <div v-if="progress > 0"
         class="ss-flex ss-flex--align-center"
    >
      <span class="mr-3">{{progress}}%</span>
      <v-progress-linear v-model="progress"></v-progress-linear>
    </div>
  
    <v-btn-toggle v-model="typeTask" mandatory>
      <v-btn flat value="active">
        Активные
      </v-btn>
      <v-btn flat value="closed">
        Завершенные
      </v-btn>
      <v-btn flat value="all">
        Все
      </v-btn>
    </v-btn-toggle>
    
    <v-list two-line subheader>
      <v-list-tile v-for="item in arrTask"
                   :key="item.id" href="javascript:;"
      >
        <v-list-tile-action @click="toggleTask(item)">
          <v-checkbox v-model="item.done"
                      readonly
          ></v-checkbox>
        </v-list-tile-action>
        
        <v-list-tile-content @click="toggleTask(item)">
          <v-list-tile-title>{{item.id}} - {{item.text}}</v-list-tile-title>
        </v-list-tile-content>
        
        <v-list-tile-action>
          <v-btn icon ripple @click="removeTask(item.id)">
            <delete-icon></delete-icon>
          </v-btn>
        </v-list-tile-action>
      </v-list-tile>
    </v-list>
  </div>
  
</template>

<script>
import {mapGetters} from 'vuex'
import {mapActions} from 'vuex'
import deleteIcon from 'vue-material-design-icons/delete.vue'

export default {
  name: 'ToDoList',
  props: {
    newTask: String,
  },
  components: {
    deleteIcon,
  },
  data () {
    return {
      arrTask: [],
      activeTask: [],
      closedTask: [],
      progress: 0,
      typeTask: 'active',
    }
  },
  computed: {
    ...mapGetters([
      'getActiveTask',
      'getClosedTask',
      'getProgress',
    ]),
    ...mapActions([
      'actionTaskToActive',
    ]),
  },
  mounted () {
    this.arrTask = this.getActiveTask
    this.progress = this.getProgress
  },
  watch: {
    newTask (val, oldVal) {
      const _this = this
      
      if (val !== '' && val !== oldVal) {
        _this.addTaskToActive(val)
        
        _this.clearField()
      }
    },
    typeTask (val) {
      this.refreshTaskList(val)
    },
  },
  methods: {
    toggleTask (item) {
      const _this = this
      
      if (item.done) {
        _this.restoreTask(item.id)
      } else {
        _this.addTaskToClosed(item.id)
      }

      item.done = !item.done
    },
    removeTask (taskId) {
      this.$store.dispatch('actionTaskRemove', taskId)
      this.progress = this.getProgress
      this.refreshTaskList(this.typeTask)
    },
    addTaskToActive (val) {
      this.$store.dispatch('actionTaskToActive', val)
      this.progress = this.getProgress
    },
    addTaskToClosed (taskId) {
      this.$store.dispatch('actionTaskToClosed', taskId)
      this.progress = this.getProgress
    },
    restoreTask (taskId) {
      this.$store.dispatch('actionTaskRestore', taskId)
      this.progress = this.getProgress
    },
    clearField () {
      this.$emit('clearField')
    },
    refreshTaskList (val) {
      const _this = this
      
      switch (val) {
        case 'active':
          _this.arrTask = _this.getActiveTask
          break
        case 'closed':
          _this.arrTask = _this.getClosedTask
          break
        case 'all':
          _this.arrTask = [..._this.getActiveTask, ..._this.getClosedTask]
          break
      }
    },
  },
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="scss">
</style>
