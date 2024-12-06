<template>
  <Page>
    <ActionBar title="STARBREW CREW" />
    <ScrollView>
      <StackLayout>
        <Label 
          class="title" 
          text="Find Local Craft Coffee" 
          textWrap="true"
        />
        <SearchBar
          v-model="searchTerm"
          hint="Search a city!"
          @submit="handleSearch"
        />
        <ListView
          v-if="shops.length"
          for="shop in shops"
          @itemTap="onShopTap"
        >
          <v-template>
            <StackLayout class="shop-item">
              <Image :src="shop.photos[0]" stretch="aspectFill" height="200" />
              <StackLayout class="shop-details" padding="10">
                <Label :text="shop.name" class="shop-name" />
                <Label :text="shop.address" class="shop-address" />
                <Label :text="shop.description" textWrap="true" />
              </StackLayout>
            </StackLayout>
          </v-template>
        </ListView>
        <ActivityIndicator
          v-if="isLoading"
          :busy="true"
        />
      </StackLayout>
    </ScrollView>
  </Page>
</template>

<script lang="ts">
import { ref } from 'vue';
import { searchShops } from '../services/api';
import type { Shop } from '../types/shop';

export default {
  setup() {
    const searchTerm = ref('');
    const shops = ref<Shop[]>([]);
    const isLoading = ref(false);

    const handleSearch = async () => {
      if (!searchTerm.value) return;
      
      isLoading.value = true;
      try {
        const response = await searchShops(searchTerm.value);
        shops.value = response.data;
      } catch (error) {
        console.error('Search failed:', error);
      } finally {
        isLoading.value = false;
      }
    };

    const onShopTap = (event: any) => {
      const shop = shops.value[event.index];
      // Navigate to shop details
      // TODO: Implement shop details view
    };

    return {
      searchTerm,
      shops,
      isLoading,
      handleSearch,
      onShopTap
    };
  }
};
</script>

<style scoped>
.title {
  font-size: 24;
  font-weight: bold;
  text-align: center;
  margin: 20;
}

.shop-item {
  margin: 10;
  background-color: white;
  border-radius: 10;
}

.shop-name {
  font-size: 18;
  font-weight: bold;
  margin-bottom: 5;
}

.shop-address {
  color: #666;
  margin-bottom: 5;
}
</style>