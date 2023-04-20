import { useEffect, useState } from 'react';
// import HttpClient from '../utils/HttpClient';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // it must be imported somewhere in our code base
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const Products = () => {
  const [pdts, setPdts] = useState([
    {
      Name: 'Loading...',
      Price: 'Loading...',
      Image: 'Loading...',
      AddedOn: 'Loading...',
      Category: 'Loading...',
    },
  ]);

  useEffect(() => {
    const fetchPdts = async () => {
      const res = await fetch(
        'https://training-d4b60-default-rtdb.firebaseio.com/products.json'
      );
      const data = await res.json();

      const products = Object.values(data).map(item => {
        let addedDate = new Date(item.date);
        let formattedDate = new Intl.DateTimeFormat(navigator.language, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }).format(addedDate);
        return {
          Name: item.name,
          Price: item.price,
          Image: <img src={item.img} alt="images" height="50px" width="70px" />,
          AddedOn: formattedDate,
        };
      });

      setPdts(products);
    };
    fetchPdts();
  }, []);

  return (
    <>
      <div className={`${styles.productContainer} ${styles['text-focus-in']}`}>
        <br />
        <br />
        <h1>Products Page</h1>
        <button className={`${styles.btn} ${styles.submit}`}>
          <Link id={styles.anchor} to="..">
            Go Back
          </Link>
        </button>

        <div className="container">
          <MDBTable>
            <MDBTableHead>
              <tr>
                <th scope="col">Name</th>
                <th scope="col">Price</th>
                <th scope="col">Image</th>
                <th scope="col">AddedOn</th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {pdts.map((product, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{product.Name}</th>
                    <td>{product.Price}</td>
                    <td>{product.Image}</td>
                    <td>{product.AddedOn}</td>
                  </tr>
                );
              })}
            </MDBTableBody>
          </MDBTable>
        </div>
      </div>
    </>
  );
};
export default Products;
