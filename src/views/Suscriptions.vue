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
      <template #cell(subscribe)="data" v-if="$session.exists()">
        <b-icon v-if="!isSubscribing" class="subscribe-icon" title="Subscribe" icon="person-check-fill" variant="success" aria-hidden="true" @click="subscribe(data.item.id)"></b-icon>
        <b-spinner v-else small variant="success" label="Spinning"></b-spinner>
      </template>
    </b-table>

    <div class="spinner-div">
      <b-spinner v-if="busy" variant="primary" label="Spinning"></b-spinner>
    </div>
  </div>
</template>

<script>
import _axios from "../common/apiClient";
import msgBoxConfirm from "@/common/confirm";
import msgBoxModal from "@/common/modal";

export default {
  name: "Suscriptions",
  data() {
    return {
      busy: false,
      isSubscribing: false,
      items: [],
      fields: ['id','name','description','price','duration'],

      payload: { user_id: this.$session.get("id") },
      config: {
        headers: {
          Authorization: this.$session.get("token"),
        }
      },
    };
  },
  methods: {
    async subscribe(suscription_id) {
      let option = await msgBoxConfirm("Suscription","Do you confirm your subscription?");
      if (option) {
        this.isSubscribing = true;

        _axios
          .post(`suscriptions/${suscription_id}/subscribe`, this.payload, this.config)
          .then((response) => {
            this.isSubscribing = false;
            msgBoxModal("Done!", response.data.message, "success");
          }).catch((error) => {
            this.isSubscribing = false;
            msgBoxModal("Error", error.response.data.message, "danger");
          });
      }
    },
  },
  mounted() {
    this.busy = true;
    if (this.$session.exists()) {
      this.fields.push('subscribe');
    }

    _axios
      .get("suscriptions")
      .then((response) => {
        this.items = response.data;
        this.busy = false;
      }).catch((error) => {
        this.busy = false;
        msgBoxModal("Error", error.response.data.message, "danger");
      });
  },
};
</script>

<style scoped>
.title {
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
.subscribe-icon {
  cursor: pointer;
}
</style>
