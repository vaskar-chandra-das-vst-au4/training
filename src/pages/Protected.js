import { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const Protected = props => {
  const navigate = useNavigate();

  useEffect(() => {
    let login = localStorage.getItem('login');
    if (!login) navigate('/login');
  }, [navigate]);

  return <div>{props.children}</div>;
};
export default Protected;
