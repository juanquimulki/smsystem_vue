import { BToast } from "bootstrap-vue";

export default function msgBoxModal(title, body, variant) {
  return new Promise(function (resolve) {
    let bootStrapToaster = new BToast();
    bootStrapToaster.$bvModal
    .msgBoxOk(body, {
      title: title,
      size: 'sm',
      buttonSize: 'sm',
      okVariant: variant,
      headerClass: 'p-2 border-bottom-0',
      footerClass: 'p-2 border-top-0',
      centered: true
    })
    .then(value => {
      resolve(value);
    })
    .catch(err => {
      // An error occurred
      console.log(err);
    })
  });
}
