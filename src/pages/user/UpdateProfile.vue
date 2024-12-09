<script setup>
import { onMounted, ref } from 'vue'
import { Form } from 'vee-validate'
import * as yup from 'yup'
import { toast } from 'vue3-toastify'
import CustomInput from '@/components/forms/CustomInput.vue'
import CustomSelect from '@/components/forms/CustomSelect.vue'
import CustomButton from '@/components/forms/CustomButton.vue'
import { getLoggedInUser, updateProfile } from '@/services/requests/public.js'
import { setPageTitle } from '@/helper/index.js'
import { useAppUser } from '@/stores/index.js'
import store from 'store'

const options = ref([
  {
    value: 'admin',
    label: 'Admin',
  },
  {
    value: 'user',
    label: 'User',
  },
])
const user = useAppUser()
const loading = ref(false)
const form = ref(null)

const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  user_type: '',
})

const schema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  user_type: yup.string().required('User type is required'),
})

const submit = async (values) => {
  try {
    loading.value = true
    await updateProfile({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      user_type: values.user_type,
    })
    user.setAppUser({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      user_type: values.user_type
    })
    store.set('userType', values.user_type)
    toast.success('Profile created successfully')
  } catch (error) {
    const { message } = error.response.data
    toast.error(message)
  } finally {
    loading.value = false
  }
}
const getMe = async () => {
  const response = await getLoggedInUser()
  form.value.resetForm({
    values: {
      first_name: response.data.user.first_name,
      last_name: response.data.user.last_name,
      email: response.data.user.email,
      user_type: response.data.user.user_type,
    },
  })
}

onMounted(() => {
  getMe()
  setPageTitle()
})
</script>

<template>
  <div class="w-full">
    <div class="w-full mt-5">
      <div class="flex justify-between items-center w-full">
        <h1 class="text-sm my-5 font-bold">Update Profile</h1>
      </div>
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
                  <CustomInput name="first_name" label="First name" />
                  <CustomInput name="last_name" label="Last name" />
                  <CustomInput name="email" label="Email address" type="email" />
                  <CustomSelect :options="options" name="user_type" label="User type" />

                  <div>
                    <CustomButton text="Update Profile" :loading="loading" />
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
