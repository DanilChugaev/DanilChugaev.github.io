<template>
  <v-data-table :headers="headers"
                :items="items"
                :rows-per-page-items="rowsPerPageItems"
                no-data-text="Данных не найдено"
                rows-per-page-text="Показывать по:"
                item-key="name"
                :loading="loading"
                class="elevation-1"
  >
    <v-progress-linear slot="progress"
                       color="blue"
                       indeterminate
    ></v-progress-linear>
    <template slot="items"
              slot-scope="props"
    >
      <td v-for="column in headers"
          :key="column.id"
          class="text-md-left text-lg-left text-xl-left text-xs-left"
      >
        <template>
          {{props.item[column.newValue] | unknownValue}}
        </template>
      </td>
    </template>
  </v-data-table>
</template>

<script src="./grid.js"></script>

<style scoped lang="scss">
</style>
