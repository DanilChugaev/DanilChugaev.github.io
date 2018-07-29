<template>
  <div id="app">
    <v-app>
      <h1>Xsolla Summer School 2018</h1>
      <h2>Тестовое задание Frontend-потока</h2>
      
      <grid :gridData="transactions"
            @getListAllProjects="getListAllProjects"
            @getRatingPopularityPaymentSystems="getRatingPopularityPaymentSystems"
            @getChartPopularityPaymentSystems="getChartPopularityPaymentSystems"
      ></grid>
     
      <!---->
      <v-dialog v-model="dialogs.projects.state"
                scrollable
                width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2"
                        primary-title
          >
            Список всех проектов
          </v-card-title>
      
          <v-card-text>
            <v-list>
              <template v-for="(item, index) in projects">
                <v-list-tile :key="item.id">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item }}</v-list-tile-title>
                  </v-list-tile-content>
                </v-list-tile>
                <v-divider v-if="index + 1 < projects.length"
                           :key="index"
                ></v-divider>
              </template>
            </v-list>
          </v-card-text>
      
          <v-divider></v-divider>
      
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"
                   flat
                   @click="dialogs.projects.state = false"
            >
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <!---->
      <v-dialog v-model="dialogs.chart.state"
                scrollable
                width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2"
                        primary-title
          >
            График популярности платежных систем
          </v-card-title>
      
          <v-card-text>
            <pie-chart class="chart"
                        :info="chart"
            ></pie-chart>
          </v-card-text>
      
          <v-divider></v-divider>
      
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"
                   flat
                   @click="dialogs.chart.state = false"
            >
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
      
      <!---->
      <v-dialog v-model="dialogs.rating.state"
                scrollable
                width="500"
      >
        <v-card>
          <v-card-title class="headline grey lighten-2"
                        primary-title
          >
            Рейтинг популярности платежных систем
          </v-card-title>
       
          <v-card-text>
            <v-list>
              <template v-for="(item, index) in rating">
                <v-list-tile :key="item.id">
                  <v-list-tile-content>
                    <v-list-tile-title>{{ item.name }}</v-list-tile-title>
                  </v-list-tile-content>
                  
                  <v-list-tile-action>
                    <v-list-tile-action-text>{{ item.value }} / {{ transactionsLength }}</v-list-tile-action-text>
                  </v-list-tile-action>
                </v-list-tile>
                <v-divider v-if="index + 1 < rating.length"
                           :key="index"
                ></v-divider>
              </template>
            </v-list>
          </v-card-text>
      
          <v-divider></v-divider>
      
          <v-card-actions>
            <v-spacer></v-spacer>
            <v-btn color="primary"
                   flat
                   @click="dialogs.rating.state = false"
            >
              close
            </v-btn>
          </v-card-actions>
        </v-card>
      </v-dialog>
    </v-app>
  </div>
</template>

<script src="./App.js"></script>

<style lang="scss">
#app {
  font-family: 'Avenir', Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
}
h3 {
  margin: 40px 0 0;
}
ul {
  list-style-type: none;
  padding: 0;
}
li {
  display: inline-block;
  margin: 0 10px;
}
a {
  color: #42b983;
}
.material-design-icon {
  width: 24px;
  height: 24px;
  
  &__svg {
    pointer-events: none!important;
  }
}
.chart {
  canvas {
    margin: 0 auto;
  }
}
</style>
