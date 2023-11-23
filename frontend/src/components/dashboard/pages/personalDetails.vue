<template>
    <div class="personal-details-page">
        <div class="personal-details-card p-3">
            <p class="head-title">Edit your details</p>
           <div class="store-name position-relative my-4">
            <input type="text" class="w-100">
            <p class="small position-absolute">Store Name</p>
           </div>
           <div class="name position-relative my-4">
            <input type="text" class="w-100">
            <p class="small position-absolute">Name</p>
           </div>
           <div class="email position-relative my-4">
            <input type="text" class="w-100" disabled>
            <p class="small position-absolute">E-mail</p>
           </div>
           <div class="button-wrapper">
            <button class="w-100">Save your details</button>
           </div>
        </div>
    </div>
  </template>
  <style lang="scss" scoped>
  @import "../../../styles/components/dashboard/_user-profile.scss";
  </style>