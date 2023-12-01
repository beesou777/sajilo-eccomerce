<template>
  <nav class="mb-3">
    <svg width="13" height="11" viewBox="0 0 13 11" fill="none" xmlns="http://www.w3.org/2000/svg">
      <path
        d="M4.625 4.40625H12.125C12.1938 4.40625 12.25 4.35 12.25 4.28125V3.40625C12.25 3.3375 12.1938 3.28125 12.125 3.28125H4.625C4.55625 3.28125 4.5 3.3375 4.5 3.40625V4.28125C4.5 4.35 4.55625 4.40625 4.625 4.40625ZM4.5 7.59375C4.5 7.6625 4.55625 7.71875 4.625 7.71875H12.125C12.1938 7.71875 12.25 7.6625 12.25 7.59375V6.71875C12.25 6.65 12.1938 6.59375 12.125 6.59375H4.625C4.55625 6.59375 4.5 6.65 4.5 6.71875V7.59375ZM12.375 0H0.125C0.05625 0 0 0.05625 0 0.125V1C0 1.06875 0.05625 1.125 0.125 1.125H12.375C12.4438 1.125 12.5 1.06875 12.5 1V0.125C12.5 0.05625 12.4438 0 12.375 0ZM12.375 9.875H0.125C0.05625 9.875 0 9.93125 0 10V10.875C0 10.9438 0.05625 11 0.125 11H12.375C12.4438 11 12.5 10.9438 12.5 10.875V10C12.5 9.93125 12.4438 9.875 12.375 9.875ZM0.053125 5.60781L2.49531 7.53125C2.58594 7.60312 2.72031 7.53906 2.72031 7.42344V3.57656C2.72031 3.46094 2.5875 3.39688 2.49531 3.46875L0.053125 5.39219C0.0367035 5.40495 0.0234154 5.4213 0.0142747 5.43999C0.00513407 5.45867 0.000382423 5.4792 0.000382423 5.5C0.000382423 5.5208 0.00513407 5.54133 0.0142747 5.56001C0.0234154 5.5787 0.0367035 5.59505 0.053125 5.60781Z"
        fill="#00818A" />
    </svg>

    <div class="profile  position-relative py-2" @click="isProfileClicked = !isProfileClicked">
     <div class="d-flex align-items-center">
      <img :src="getUserData?.profile_picture" alt="" />
      <p class="body-1 text-pri mb-0 fw-medium">{{ getUserData?.first_name }}</p>
     </div>
      <div class="position-absolute logout" v-if="isProfileClicked" @click="Logout">
        <span>
          <svg viewBox="64 64 896 896" focusable="false" data-icon="logout" width="1em" height="1em" fill="currentColor"
            aria-hidden="true">
            <path
              d="M868 732h-70.3c-4.8 0-9.3 2.1-12.3 5.8-7 8.5-14.5 16.7-22.4 24.5a353.84 353.84 0 01-112.7 75.9A352.8 352.8 0 01512.4 866c-47.9 0-94.3-9.4-137.9-27.8a353.84 353.84 0 01-112.7-75.9 353.28 353.28 0 01-76-112.5C167.3 606.2 158 559.9 158 512s9.4-94.2 27.8-137.8c17.8-42.1 43.4-80 76-112.5s70.5-58.1 112.7-75.9c43.6-18.4 90-27.8 137.9-27.8 47.9 0 94.3 9.3 137.9 27.8 42.2 17.8 80.1 43.4 112.7 75.9 7.9 7.9 15.3 16.1 22.4 24.5 3 3.7 7.6 5.8 12.3 5.8H868c6.3 0 10.2-7 6.7-12.3C798 160.5 663.8 81.6 511.3 82 271.7 82.6 79.6 277.1 82 516.4 84.4 751.9 276.2 942 512.4 942c152.1 0 285.7-78.8 362.3-197.7 3.4-5.3-.4-12.3-6.7-12.3zm88.9-226.3L815 393.7c-5.3-4.2-13-.4-13 6.3v76H488c-4.4 0-8 3.6-8 8v56c0 4.4 3.6 8 8 8h314v76c0 6.7 7.8 10.5 13 6.3l141.9-112a8 8 0 000-12.6z">
            </path>
          </svg>
        </span>
        <span class="text-pri">Logout</span>
      </div>
    </div>
  </nav>
</template>

<script setup>
import { computed, ref } from "vue";
import { useAuthStore } from "../../../store/authentication";
const authStore = useAuthStore();
const isProfileClicked = ref(false);
const getUserData = computed(() => {
  return authStore?.user_details;
});



const Logout = () => {
  authStore.logout()
};
</script>

<style lang="scss" scoped>
@import "@style/base/variable.scss";
@import "@utility_style";

svg{
  path{
    fill:$primary-color;
  }
}

nav {
  display: flex;
  justify-content: space-between;
  background: $white;
  align-items: center;
  padding: 0 20px;

  .profile {
    max-height: 50px;
    min-height: 50px;
    height: 100%;

    img {
      max-height: 35px;
      min-height: 35px;
      height: 100%;
    }
  }
  .text-pri{
    color:$primary-color;
  }

  .logout {
    background: $white;
    top: 55px;
    left: 0px;
    padding: 0.6rem;
    border-radius: 4px;
    box-shadow: 1px 1px 6px $text-300;
    cursor: pointer;

    span:last-child {
      font-size: 14px;
      height: 40px;
      width: 100%;
      font-family: $font-primary;
      margin-left: 10px;
    }
  }
}
</style>