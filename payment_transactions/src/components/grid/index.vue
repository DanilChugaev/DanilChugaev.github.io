<template>
  <div>
    <v-card style="min-height: 80px">
      <v-card-title style="min-height: 80px">
        <v-tooltip v-for="action in actions"
                   :key="action.id"
                   bottom
        >
          <v-btn style="min-width: 50px"
                 slot="activator"
                 @click="runMethod(action.method)"><i :is="action.btn"></i>
          </v-btn>
          <span>{{action.title}}</span>
        </v-tooltip>
      </v-card-title>
    </v-card>
  
    <v-data-table :headers="headers"
                  :items="items"
                  :rows-per-page-items="rowsPerPageItems"
                  no-data-text="Данных не найдено"
                  rows-per-page-text="Показывать по:"
                  :loading="loading"
                  class="elevation-1"
    >
      <v-progress-linear slot="progress"
                         color="blue"
                         :height="3"
                         indeterminate
      ></v-progress-linear>
      <template slot="items"
                slot-scope="props"
      >
        <td v-for="column in headers"
            :key="column.id"
            class="text-md-left text-lg-left text-xl-left text-xs-left"
        >
          <template v-if="column.isVisible">
            {{props.item[column.newValue] | unknownValue}}
          </template>
        </td>
      </template>
    </v-data-table>
  </div>
  
</template>

<script src="./grid.js"></script>

<style scoped lang="scss">
</style>
