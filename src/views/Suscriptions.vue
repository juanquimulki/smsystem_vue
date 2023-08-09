<template>
  <div>
    <h4 class="title">Suscriptions List</h4><b-spinner v-if="busy" variant="primary" label="Spinning"></b-spinner>
    
    <b-table hover :items="items">
      <template #cell(price)="data">
        $ {{ data.item.price.toFixed(2) }}
      </template>
      <template #cell(duration)="data">
        {{ data.item.duration }} days
      </template>
    </b-table>
  </div>
</template>

<script>
import _axios from "../common/apiClient";

export default {
  name: "Suscriptions",
  data() {
    return {
      busy: false,
      items: [],
    };
  },
  mounted() {
    this.busy = true;
    _axios
      .get("suscriptions")
      .then((response) => {
        this.items = response.data;
        this.busy = false;
      }).catch((error) => {
        this.busy = false;
        alert(error.response.data.message);
      });
  },
};
</script>

<style scoped>
.title {
  /*float: left;*/
  margin-right: 20px;
  margin-bottom: 20px;
}
.table {
  width: 70%;
  margin: auto;
  border-radius: 10px;
}
</style>
