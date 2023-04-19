import styles from './Login.module.css';
import { useNavigate } from 'react-router-dom';
import useInput from '../hooks';
import HttpClient from '../utils/HttpClient';
const Login = () => {
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

  const navigate = useNavigate();

  const submitHandler = async e => {
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
    }
  };

  return (
    <form onSubmit={submitHandler} className={styles.logincontainer}>
      <h1>Enter details</h1>
      <label htmlFor="email">Emaill</label>
      {emailError && <p>Email must contain "@"</p>}
      <input
        onChange={emailHandler}
        value={email}
        id="email"
        className={emailError ? `${styles.error}` : ''}
        type="email"
      />

      <label htmlFor="password">Password</label>
      {passwordError && <p>Password must contain more than 6 character</p>}
      <input
        onChange={passwordHandler}
        value={password}
        className={passwordError ? `${styles.error}` : ''}
        id="password"
        type="password"
      />
      <button
        disabled={!email.includes('@') || password.trim().length < 5}
        type="submit"
      >
        Login
      </button>
    </form>
  );
};
export default Login;
