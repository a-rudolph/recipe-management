import Link from 'next/link';
import { useState } from 'react';
import { loginService } from '../../src/services/auth';

export default function Login() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleLogin = async () => {
    const response = await loginService({
      username,
      password,
    });

    console.log(response);
  };

  return (
    <div>
      <input
        onChange={handleUsername}
        placeholder={'username'}
        value={username}
      />
      <input
        onChange={handlePassword}
        placeholder={'password'}
        value={password}
      />
      <button onClick={handleLogin}>Login</button>
      <Link href='/signup'>
        <button>to sign up page!</button>
      </Link>
    </div>
  );
}
