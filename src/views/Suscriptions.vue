<template>
  <div>
    <h4 class="title">Suscriptions List</h4>
    
    <b-table hover :items="items" :fields="fields">
      <template #cell(price)="data">
        $ {{ data.item.price.toFixed(2) }}
      </template>
      <template #cell(duration)="data">
        {{ data.item.duration }} days
      </template>
      <template #cell(options) v-if="$session.exists()">
        o p t i o n s
      </template>
    </b-table>

    <div class="spinner-div">
      <b-spinner v-if="busy" variant="primary" label="Spinning"></b-spinner>
    </div>
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
      fields: ['id','name','description','price','duration'],
    };
  },
  mounted() {
    this.busy = true;
    if (this.$session.exists()) {
      this.fields.push('options');
    }

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
.spinner-div {
  margin-top: 10px;
  width: 100%;
  text-align: center;
}
</style>
