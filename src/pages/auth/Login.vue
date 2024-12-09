<script setup>
import CustomButton from '@/components/forms/CustomButton.vue'
import { Form } from 'vee-validate'
import CustomInput from '@/components/forms/CustomInput.vue'
import { ref } from 'vue'
import * as yup from 'yup'
import { login } from '@/services/requests/auth.js'
import { toast } from 'vue3-toastify'
import store from 'store'

const loading = ref(false)
const form = ref(null)
const formData = ref({
  email: '',
  password: '',
})
const schema = yup.object({
  email: yup.string().email('Invalid email').required('Email is required'),
  password: yup.string().required('Password is required'),
})

const submit = async (values) => {
  try {
    loading.value = true
    const response = await login({
      email: values.email,
      password: values.password,
    })
    store.set('accessToken', response.data.accessToken)
    toast.success('Logged in successfully')
    setTimeout(() => {
      window.location.href = '/'
    }, 2000)
  } catch (error) {
    const { message } = error.response.data
    toast.error(message)
  } finally {
    loading.value = false
  }
}
</script>

<template>
  <div class="flex flex-1 flex-col justify-center px-6 py-12 lg:px-8 h-screen">
    <div class="sm:mx-auto sm:w-full sm:max-w-sm">
      <img
        class="mx-auto h-10 w-auto"
        src="https://tailwindui.com/plus/img/logos/mark.svg?color=indigo&shade=500"
        alt="Your Company"
      />
      <h2 class="mt-10 text-center text-2xl/9 font-bold tracking-tight text-indigo-700">
        Sign in to your account
      </h2>
    </div>

    <div class="mt-10 sm:mx-auto sm:w-full sm:max-w-sm">
      <Form
        ref="form"
        class="space-y-6"
        :validation-schema="schema"
        :initial-values="formData"
        @submit="submit"
      >
        <CustomInput name="email" label="Email address" type="email" />
        <CustomInput name="password" label="Password" type="password" />
        <div>
          <CustomButton text="Sign In" :loading="loading" />
        </div>
      </Form>
    </div>
  </div>
</template>

<style scoped></style>
