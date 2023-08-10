<template>
  <div>
    <h4 class="title">My Suscriptions</h4>
    
    <b-table hover :items="items" :fields="fields">
      <template #cell(price)="data">
        $ {{ data.item.price.toFixed(2) }}
      </template>
      <template #cell(start_date)="data">
        {{ data.item.start_date.date.substring(0,10) }}
      </template>
      <template #cell(end_date)="data">
        {{ data.item.end_date.date.substring(0,10) }}
      </template>
      <template #cell(options)="data">
        <b-icon class="subscribe-icon" title="Active Suscription" icon="play-circle-fill" variant="success" aria-hidden="true"></b-icon>
        <b-icon class="subscribe-icon" title="Pause Suscription" icon="pause-circle-fill" variant="warning" aria-hidden="true"></b-icon>
        <b-icon class="subscribe-icon" title="Cancel Suscription" icon="stop-circle-fill" variant="danger" aria-hidden="true"></b-icon>
        <b-icon v-if="!isUnsubscribing" class="subscribe-icon" title="Unsubscribe" icon="trash-fill" variant="secondary" aria-hidden="true" @click="unsubscribe(data.item.id)"></b-icon>
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

export default {
  name: "MySuscriptions",
  data() {
    return {
      busy: false,
      isUnsubscribing: false,
      items: [],
      fields: ['id','name','price','status','start_date','end_date','options'],
    };
  },
  methods: {
    showRecords() {
      this.items = [];
      this.busy = true;

      const payload = { user_id: this.$session.get("id") };
      const headers = {
          Authorization: this.$session.get("token"),
      };

      _axios
        .get("suscriptions/me", {
              params: payload,
              headers: headers,
            })
        .then((response) => {
          this.items = response.data;
          this.busy = false;
        }).catch((error) => {
          this.busy = false;
          alert(error.response.data.message);
        });
    },
    unsubscribe(suscription_id) {
      this.isUnsubscribing = true;

      const payload = { user_id: this.$session.get("id") };
      const config = {
        headers: {
          Authorization: this.$session.get("token"),
        }
      };

      _axios
      .post(`suscriptions/${suscription_id}/unsubscribe`, payload, config)
      .then((response) => {
        alert(response.data.message);
        this.isUnsubscribing = false;

        this.showRecords();
      }).catch((error) => {
        this.isUnsubscribing = false;
        alert(error.response.data.message);
      });
    },
  },
  mounted() {
    this.showRecords();
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
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
</style>
