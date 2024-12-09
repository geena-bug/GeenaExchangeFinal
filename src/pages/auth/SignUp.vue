<script setup>
import { Form } from 'vee-validate'
import { ref } from 'vue'
import * as yup from 'yup'
import { toast } from 'vue3-toastify';
import CustomInput from '@/components/forms/CustomInput.vue'
import CustomSelect from '@/components/forms/CustomSelect.vue'
import CustomButton from '@/components/forms/CustomButton.vue'
import { signUp } from '@/services/requests/auth.js'

const options = ref(['admin', 'user'])
const loading = ref(false)
const form = ref(null)
const formData = ref({
  first_name: '',
  last_name: '',
  email: '',
  password: '',
  user_type: '',
  confirm_password: ''
})
const schema = yup.object({
  first_name: yup.string().required('First name is required'),
  last_name: yup.string().required('Last name is required'),
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
  confirm_password: yup.string().required('Confirm password is required').oneOf([yup.ref('password'), null], 'Passwords must match'),
  user_type: yup.string().required('User type is required'),
})

const submit = async (values) => {
  try{
    loading.value = true
    await signUp({
      first_name: values.first_name,
      last_name: values.last_name,
      email: values.email,
      password: values.password,
      user_type: values.user_type,
      confirm_password: values.confirm_password
    })
    toast.success('Account created successfully')
    setTimeout(() => {
      window.location.href = '/auth/login'
    }, 2000)
  }catch (error){
    const {message} = error.response.data
    toast.error(message)
  }finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex min-h-full flex-1 h-screen">
    <div
      class="flex flex-1 flex-col justify-center px-4 py-12 sm:px-6 lg:flex-none lg:px-20 xl:px-24"
    >
      <div class="mx-auto w-full max-w-sm lg:w-96">
        <div>
          <img
            class="h-10 w-auto"
            src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=600"
            alt="Your Company"
          />
          <h2 class="mt-8 text-2xl/9 font-bold tracking-tight text-gray-900">Create an account</h2>
        </div>

        <div class="mt-10">
          <div>
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
              <CustomInput name="password" label="Password" type="password" />
              <CustomInput name="confirm_password" label="Confirm Password" type="password" />
              <CustomSelect :options="options" name="user_type" label="User type" />

              <div>
                <CustomButton text="Sign up" :loading="loading" />
              </div>
            </Form>
          </div>
        </div>
      </div>
    </div>
    <div class="relative hidden w-0 flex-1 lg:block">
      <img
        class="absolute inset-0 size-full object-cover"
        src="https://images.unsplash.com/photo-1496917756835-20cb06e75b4e?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1908&q=80"
        alt=""
      />
    </div>
  </div>
</template>

<style scoped></style>
