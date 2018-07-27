<template>
  <v-data-table :headers="headers"
                :items="items"
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
      <td class="text-xs-left">{{ props.item.name }}</td>
      <td class="text-xs-left">{{ props.item.calories }}</td>
      <td class="text-xs-left">{{ props.item.fat }}</td>
      <td class="text-xs-left">{{ props.item.carbs }}</td>
      <td class="text-xs-left">{{ props.item.protein }}</td>
      <td class="text-xs-left">{{ props.item.iron }}</td>
      <!--<td v-for="column in headers"-->
          <!--:key="column.id"-->
          <!--class="text-md-left text-lg-left text-xl-left text-xs-left"-->
      <!--&gt;-->
        <!--<template>-->
          <!--{{props.item[column.value] | unknownValue}}-->
        <!--</template>-->
      <!--</td>-->
    </template>
  </v-data-table>
</template>

<script src="./grid.js"></script>

<style scoped lang="scss">
</style>
