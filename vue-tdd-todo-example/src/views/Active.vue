<template>
  <div class="home pa-3">
    <div class="ss-flex">
      <v-text-field name="new-task"
                    v-model="task"
                    label="Введите новую задачу"
                    @keyup.enter="add"
      ></v-text-field>
      <v-btn color="info"
             @click="add">Добавить</v-btn>
    </div>
    
    <ToDoList :newTask="sendTask"
              @add="add"
              @clearField="clearField"
    />
  </div>
</template>

<script>
// @ is an alias to /src
import ToDoList from '@/components/ToDoList.vue'

export default {
  name: 'active',
  components: {
    ToDoList,
  },
  data () {
    return {
      task: '',
      sendTask: '',
    }
  },
  methods: {
    add () {
      const _this = this
      
      _this.sendTask = _this.task
    },
    clearField () {
      const _this = this
      
      _this.sendTask = ''
      _this.task = ''
    },
  },
}
</script>
