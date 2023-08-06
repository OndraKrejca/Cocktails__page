import React from 'react'
import { Form, redirect, useNavigation } from 'react-router-dom'
import axios from 'axios'
import { toast } from 'react-toastify'

const newsUrl = 'https://www.course-api.com/cocktails-newsletter'

export const action = async ({ request }) => {
  const formData = await request.formData()
  const data = Object.fromEntries(formData)

  try {
    const response = await axios.post(newsUrl, data)
    toast.success(response.data.msg)
    return redirect('/')
  } catch (error) {
    toast.error(error?.response?.data?.msg)
    return error
  }
}

const Newsletter = () => {
  const { state } = useNavigation()

  return (
    <Form className='form' method='post'>
      <h4 style={{ textAlign: 'center', marginBottom: '2rem' }}>
        our newsletter
      </h4>
      <div className='form-row'>
        <label htmlFor='name' className='form-label'>
          Name
        </label>
        <input
          type='text'
          className='form-input'
          name='name'
          required
          id='name'
        />
      </div>

      <div className='form-row'>
        <label htmlFor='lastName' className='form-label'>
          last name
        </label>
        <input
          type='text'
          className='form-input'
          required
          name='lastName'
          id='lastName'
        />
      </div>

      <div className='form-row'>
        <label htmlFor='email' className='form-label'>
          email
        </label>
        <input
          type='email'
          className='form-input'
          defaultValue='test@test.com'
          name='email'
          id='email'
          disabled={state === 'submitting'}
        />
      </div>
      <button
        type='submit'
        className='btn btn-block'
        style={{ marginTop: '0.5rem' }}
      >
        {state === 'submitting' ? 'loading' : 'send'}
      </button>
    </Form>
  )
}

export default Newsletter
