<template>
  <div>
    <v-row justify="center" align="center">
      <v-col cols="12" sm="8" md="6">

        <div class="text-center">
          <h2>Bem vindo à Candy Shop!</h2>
        </div>

        <!-- Carregando -->
        <div class="text-center" v-if="$fetchState.pending">
          <v-progress-circular
            indeterminate
            color="primary"
          ></v-progress-circular>
          <p>Carregando nossos produtos...</p>
        </div>

        <!-- Se erro -->
        <p v-else-if="$fetchState.error">Ops! Algo deu errado!</p>
        
      </v-col>
    </v-row>
    <v-row>
      <v-col cols='12'>
        <!-- Quando carregado -->
        <p class="text-center">Escolha seus items</p>
      </v-col>
      <v-col
        v-for="item in items" 
        :key="item.id"
        cols='12'
        sm='6'
        md='4'
        lg='2'
      >
          <v-card>
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>

            <v-img
              height="250"
              :src='item.imageUrl'
            ></v-img>

            <v-card-title>{{ item.name }}</v-card-title>

            <v-card-text>
              <div class="my-4 subtitle-1">
                De <s>R$ {{ formata_preco(item.price) }}</s>
              </div>
              <div class="my-4 subtitle-1">
                Por R$ {{ formata_preco(item.sellingPrice) }}
              </div>

            </v-card-text>

            <v-card-actions>
              <v-btn
                color="deep-purple lighten-2"
                text
                @click="$store.commit('add', item)"
                v-if="$store.getters.itemQuantity(item) == 0"
              >
                Comprar
              </v-btn>

              <div class='d-flex' v-else>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  @click="$store.commit('remove', item)"
                >
                  <v-icon dark>
                    mdi-minus
                  </v-icon>
                </v-btn>
                <p>{{ $store.getters.itemQuantity(item) }}</p>
                <v-btn
                  class="mx-2"
                  fab
                  dark
                  small
                  color="primary"
                  @click="$store.commit('add', item)"
                >
                  <v-icon dark>
                    mdi-plus
                  </v-icon>
                </v-btn>
              </div>
            </v-card-actions>
          </v-card>
      </v-col>
    </v-row>
  </div>
</template>

<script>

export default {
  data() {
    return {
      items: [],
    }
  },
  async fetch() {
    const items = await this.$axios.$get('https://api.npoint.io/6dc6ce358a3985c9555e')
    this.items = items['items']
  },
  methods:{
    formata_preco(valor){
      return (valor/100).toString().replace('.', ',')
    }
  },
}
</script>
