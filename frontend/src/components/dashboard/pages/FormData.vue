<template>
 <div class="banner-container">
  <!-- <div class="overlay" @click="isOpened = fasle"></div> -->
  <!-- <div class="form-data p-3 px-5">
    <div class="text-end cross-button"
       @click="isOpened = false"><svg
        width="24"
        height="24"
        viewBox="0 0 24 24"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
      >
        <path
          d="M18 6L6 18M6 6L18 18"
          stroke="#121926"
          stroke-width="1.5"
          stroke-linecap="round"
          stroke-linejoin="round"
        />
      </svg>
    </div>
    <p class="head-3 mb-2">Lorem ipsum dolor sit amet.</p>
    <p class="text text-muted">
      Lorem ipsum, dolor sit amet consectetur adipisicing elit. Quas accusamus
      pariatur, possimus iure esse neque eaque ut quasi voluptatem ipsum.
    </p>
    <form>
      <div class="form_input">
        <label for="article">Article/Product Id:</label>
        <input
          type="text"
          class="w-100"
          v-model="article_id"
          id="article"
          name="article"
        />
      </div>
      <div class="d-flex gap-3">
        <div class="form_input w-100">
          <label for="email">Email <span class="text-danger">*</span></label>
          <input
            type="email"
            class="w-100"
            v-model="email"
            id="email"
            name="email"
          />
        </div>
        <div class="form_input w-100">
          <label for="phone">Phone <span class="text-danger">*</span></label>
          <input
            type="text"
            class="w-100"
            v-model="contact"
            id="phone"
            name="phone"
          />
        </div>
      </div>
      <div class="form_input">
        <label for="name">Name</label>
        <input type="text" class="w-100" v-model="name" id="name" name="name" />
      </div>
      <div class="form_input">
        <label for="message">message</label>
        <textarea
          name="message"
          class="w-100"
          v-model="name"
          id="message"
        ></textarea>
      </div>
      <div class="button-wrapper">
        <button class="w-100">Send Message</button>
      </div>
    </form>
  </div> -->
 </div>
</template>

<script>
export default {
  data() {
    return {
      article_id: '',
      email: '',
      contact: '',
      name: '',
      message: '',
      isOpened:false
    };
  },
  methods: {
    
  },
};
</script>
<style scoped src="../../../styles//components/dashboard/_appearance.scss">
</style>