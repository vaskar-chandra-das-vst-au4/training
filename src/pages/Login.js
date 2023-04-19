import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks';
import HttpClient from '../utils/HttpClient';
import { useState } from 'react';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Login = () => {
  const [isLoading, setIsLoading] = useState(false);
  const {
    input: email,
    hasError: emailError,
    handler: emailHandler,
  } = useInput(email => !email.includes('@'));

  const {
    input: password,
    hasError: passwordError,
    handler: passwordHandler,
  } = useInput(password => password.trim().length < 5);

  const [listRef] = useAutoAnimate();
  const navigate = useNavigate();

  const submitHandler = async e => {
    setIsLoading(true);
    console.log(email, password);
    e.preventDefault();
    if (!emailError && !passwordError) {
      let data = {
        email,
        password,
      };
      let response = await HttpClient.requestData('login', 'POST', data);
      if (response && response.status) {
        console.log(response);
        localStorage.setItem('login', true);
        localStorage.setItem('id', response.data.id);
        localStorage.setItem('token', response.data.token);

        navigate('/');
      } else {
        alert(response.error);
      }
      setIsLoading(false);
    }
  };

  return (
    <form
      ref={listRef}
      onSubmit={submitHandler}
      className={`${styles.logincontainer} ${styles['puff-in-center']}`}
    >
      <br />
      <h1>Login Credentials</h1>
      <br />
      <label htmlFor="email">Email</label>
      {emailError && <p>Email must contain "@"</p>}
      <input
        onChange={emailHandler}
        value={email}
        id="email"
        className={emailError ? `${styles.error}` : ''}
        type="email"
      />

      <label htmlFor="password">Password</label>
      {passwordError && <p>Password must contain more than 4 character</p>}
      <input
        onChange={passwordHandler}
        value={password}
        className={passwordError ? `${styles.error}` : ''}
        id="password"
        type="password"
      />
      <div className={styles.loginBtn}>
        <button
          disabled={!email.includes('@') || password.trim().length < 5}
          type="submit"
        >
          {!isLoading ? 'Login' : 'Loading...'}
        </button>
      </div>
    </form>
  );
};
export default Login;
