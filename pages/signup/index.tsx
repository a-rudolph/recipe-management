import Link from 'next/link';
import { useState } from 'react';
import { signupService } from '../../src/services/auth';

export default function Signup() {
  const [username, setUsername] = useState();
  const [password, setPassword] = useState();

  const handleUsername = (e) => {
    setUsername(e.target.value);
  };

  const handlePassword = (e) => {
    setPassword(e.target.value);
  };

  const handleSignup = async () => {
    const response = await signupService({
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
      <button onClick={handleSignup}>Signup</button>
      <Link href='/login'>
        <button>to log in page!</button>
      </Link>
    </div>
  );
}
