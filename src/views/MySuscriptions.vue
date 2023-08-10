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
        <div v-if="!isLoading" >
          <b-icon class="option-icon" v-if="data.item.status !== 'ACTIVE'" title="Active Suscription" icon="play-circle-fill" variant="success" aria-hidden="true" @click="changeStatus(data.item.id, 'ACTIVE')"></b-icon>
          <b-icon class="option-icon" v-if="data.item.status !== 'PAUSED'" title="Pause Suscription" icon="pause-circle-fill" variant="warning" aria-hidden="true" @click="changeStatus(data.item.id, 'PAUSED')"></b-icon>
          <b-icon class="option-icon" v-if="data.item.status !== 'CANCELLED'" title="Cancel Suscription" icon="stop-circle-fill" variant="danger" aria-hidden="true" @click="changeStatus(data.item.id, 'CANCELLED')"></b-icon>
          <b-icon class="option-icon" title="Unsubscribe" icon="trash-fill" variant="secondary" aria-hidden="true" @click="unsubscribe(data.item.id)"></b-icon>
        </div>
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
      isLoading: false,
      items: [],
      fields: ['id','name','price','status','start_date','end_date','options'],

      payload: { user_id: this.$session.get("id") },
      config: {
        headers: {
          Authorization: this.$session.get("token"),
        }
      },
      headers: {
          Authorization: this.$session.get("token"),
      },
    };
  },
  methods: {
    showRecords() {
      this.items = [];
      this.busy = true;

      _axios
        .get("suscriptions/me", {
              params: this.payload,
              headers: this.headers,
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
      this.isLoading = true;

      _axios
      .post(`suscriptions/${suscription_id}/unsubscribe`, this.payload, this.config)
      .then((response) => {
        this.isLoading = false;
        alert(response.data.message);

        this.showRecords();
      }).catch((error) => {
        this.isLoading = false;
        alert(error.response.data.message);
      });
    },
    changeStatus(suscription_id, status) {
      this.isLoading = true;

      _axios
      .post(`suscriptions/${suscription_id}/status/${status}`, this.payload, this.config)
      .then((response) => {
        this.isLoading = false;
        alert(response.data.message);

        this.showRecords();
      }).catch((error) => {
        this.isLoading = false;
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
.option-icon {
  margin-left: 5px;
  margin-right: 5px;
  cursor: pointer;
}
</style>
