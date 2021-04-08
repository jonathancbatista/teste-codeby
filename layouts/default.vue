<template>
  <v-app>
    <v-app-bar
      fixed
      app
    >
      <v-img
        class="mx-auto"
        src="./Logo.png"
        max-height="130"
        max-width="130"
        contain
      ></v-img>

      <v-badge
        :content="$store.getters.countItens"
        :value="$store.getters.countItens > 0"
        color="green"
        overlap
        bottom
        left
        :show="$store.getters.totalItems"
        offsetY="20"
        offsetX="15"
      >
        <v-btn
          icon
          @click.stop="rightDrawer = !rightDrawer"
        >
          <v-icon>mdi-cart</v-icon>
        </v-btn>
      </v-badge>

    </v-app-bar>
    <v-main>
      <v-container>
        <nuxt />
      </v-container>
    </v-main>
    <v-navigation-drawer
      v-model="rightDrawer"
      :right="right"
      fixed
      width="400"
    >
      <v-img
        class="mx-auto"
        src="./Logo.png"
        max-height="130"
        max-width="130"
        contain
      ></v-img>

     <v-btn
      class="ma-2"
      outlined
      color="indigo"
      @click.stop="rightDrawer = !rightDrawer"
    >
        Recolher carrinho
    </v-btn> 

    <v-alert
      border="top"
      colored-border
      type="info"
      elevation="2"
      v-if="$store.getters.totalItens == 0"
    >
      Carrinho vazio!
    </v-alert>


    <v-container v-else>
      <v-row>
        <v-col v-for="item in $store.state.cart" :key="item.id" cols='12'>
          <v-card
            class="mx-auto"
            max-width="344"
          >
            <v-list-item three-line>
              <v-list-item-avatar
                tile
                size="80"
              >
                <v-img :src="item.imageUrl"></v-img>
              </v-list-item-avatar>

              <v-list-item-content>
                <v-list-item-title class="mb-1">
                  {{item.name}}
                </v-list-item-title>
                <v-list-item-subtitle>De: <s>{{ formata_preco(item.price) }}</s></v-list-item-subtitle>
                <v-list-item-subtitle>Por: {{ formata_preco(item.sellingPrice) }}</v-list-item-subtitle>
                <p>Qtd: {{ $store.getters.itemQuantity(item) }}</p>
                <p>Total do item: R$ {{ formata_preco($store.getters.itemTotalPrice(item)) }}</p>
              </v-list-item-content>

            </v-list-item>
          </v-card>
        </v-col>

        <v-col cols="12" class="text-center">
          <hr>
          <p class="my-3"><b>Total:</b>  R$ {{ formata_preco($store.getters.totalPrice) }}</p>
          <hr>

          <v-alert
            dense
            type="success"
            elevation="2"
            v-if="$store.getters.totalPrice > 1000"
            class="mt-6"
          >
            Parabéns, sua compra tem frete grátis !
          </v-alert>

          <v-btn large class="mt-3 primary">Finalizar compra</v-btn>
        </v-col>        
      </v-row>
    </v-container>

    </v-navigation-drawer>
    <v-footer
      :absolute="!fixed"
      app
    >
      <span>&copy; {{ new Date().getFullYear() }}</span>
    </v-footer>
  </v-app>
</template>

<script>
export default {
  data () {
    return {
      fixed: false,
      right: true,
      rightDrawer: false,
    }
  },
  methods:{
    formata_preco(valor){
      return (valor/100).toString().replace('.', ',')
    }
  },
}
</script>
