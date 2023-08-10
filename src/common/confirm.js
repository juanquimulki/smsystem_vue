import { BToast } from "bootstrap-vue";

export default function msgBoxConfirm(title, body) {
  return new Promise(function (resolve) {
    let bootStrapToaster = new BToast();
    bootStrapToaster.$bvModal
      .msgBoxConfirm(body, {
        title: title,
        size: "md",
        buttonSize: "md",
        okVariant: "success",
        okTitle: "YES",
        cancelTitle: "NO",
        footerClass: "p-2",
        hideHeaderClose: true,
        centered: true,
      })
      .then((value) => {
        resolve(value);
      })
      .catch((err) => {
        // An error occurred
        console.log(err);
      });
  });
}
