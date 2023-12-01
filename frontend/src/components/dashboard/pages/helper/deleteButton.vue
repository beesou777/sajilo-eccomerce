<template>
      <div class="delete-section" v-if="props.isDeleteShown">
            <p class="h4">Are you sure you want to delete this {{props.msg}}?</p>
            <p class="small pt-3">Once you delete this it cannot be undone</p>
            <div class="button-wrapper d-flex gap-2 py-3 w-100">
                <button class="w-100 btn-del" @click="props.delete">Delete</button>
                <button class="w-100 btn-200 text-dark " @click="props.removerId">Cancel</button>
            </div>
        </div>
</template>
<script setup>
const props = defineProps({
  isDeleteShown:Boolean,
  removerId:Function,
  delete:Function,
  msg:String
})
</script>