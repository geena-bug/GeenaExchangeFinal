<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue3-toastify'
import CustomInput from '@/components/forms/CustomInput.vue'
import CustomButton from '@/components/forms/CustomButton.vue'
import { updatePassword } from '@/services/requests/public.js'
import { useRouter } from 'vue-router'
import { usePageTitle } from '@/stores/index.js'
import { setPageTitle } from '@/helper/index.js'

const loading = ref(false)
const form = ref(null)

const formData = ref({
  current_password: '',
  new_password: '',
  confirm_password: '',
})

const schema = yup.object({
  current_password: yup.string().required('Current password is required'),
  new_password: yup.string().required('Password is required'),
  confirm_password: yup
    .string()
    .required('Confirm password is required')
    .oneOf([yup.ref('new_password'), null], 'Passwords must match'),
})

const submit = async (values) => {
  try {
    loading.value = true
    await updatePassword({
      current_password: values.current_password,
      new_password: values.new_password,
      confirm_password: values.confirm_password,
    })
    toast.success('Password updated successfully')
  } catch (error) {
    const { message } = error.response.data
    toast.error(message)
  } finally {
    loading.value = false
  }
}

onMounted(() => {
  setPageTitle()
})
</script>

<template>
  <div class="w-full">
    <div class="w-full mt-5">
      <div>
        <div class="mt-8 flow-root">
          <div class="-mx-4 -my-2 overflow-x-auto sm:-mx-6 lg:-mx-8">
            <div class="inline-block min-w-full py-2 align-middle sm:px-6 lg:px-8">
              <div class="overflow-hidden w-1/2">
                <Form
                  ref="form"
                  class="space-y-6"
                  :validation-schema="schema"
                  :initial-values="formData"
                  @submit="submit"
                >
                  <CustomInput name="current_password" label="Current Password" type="password" />
                  <CustomInput name="new_password" label="New Password" type="password" />
                  <CustomInput name="confirm_password" label="Confirm Password" type="password" />
                  <div>
                    <CustomButton text="Update Password" :loading="loading" />
                  </div>
                </Form>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
