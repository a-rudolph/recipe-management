/** @jsx jsx */
import { jsx, Button } from 'theme-ui'
import Link from 'next/link'
import useForm from '../../src/hooks/useForm'
import { loginService } from '../../src/services/auth'

export default function Login() {
  const form = useForm()

  const { getFieldValues, setFieldsValue } = form

  const handleUsername = (e) => {
    setFieldsValue({ username: e.target.value })
  }

  const handlePassword = (e) => {
    setFieldsValue({ password: e.target.value })
  }

  const handleLogin = async () => {
    const { username, password } = getFieldValues()

    console.log(form.getFormData())

    // const response = await loginService({
    //   username,
    //   password,
    // })

    // console.log(response)
  }

  return (
    <div>
      <input
        onChange={handleUsername}
        placeholder='username'
        value={getFieldValues('username')}
      />
      <input
        onChange={handlePassword}
        placeholder='password'
        type='password'
        value={getFieldValues('password')}
      />
      <Button onClick={handleLogin}>Login</Button>
      <Link href='/signup'>
        <button>to sign up page!</button>
      </Link>
    </div>
  )
}
