import { useEffect, useState } from 'react';
// import HttpClient from '../utils/HttpClient';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';
import 'bootstrap/dist/css/bootstrap.min.css'; // it must be imported somewhere in our code base
import { MDBTable, MDBTableHead, MDBTableBody } from 'mdb-react-ui-kit';

const Products = () => {
  const [pdts, setPdts] = useState([]);
  const [updatePdt, setUpdatePdt] = useState(false);

  useEffect(() => {
    const fetchPdts = async () => {
      const res = await fetch(
        'https://training-d4b60-default-rtdb.firebaseio.com/products.json'
      );
      const data = await res.json();

      const products = Object.values(data).map((item, index) => {
        let addedDate = new Date(item.date);
        let formattedDate = new Intl.DateTimeFormat(navigator.language, {
          year: 'numeric',
          month: 'short',
          day: '2-digit',
        }).format(addedDate);
        return {
          id: Object.keys(data)[index],
          Name: item.name,
          Price: item.price,
          Image: <img src={item.img} alt="images" height="50px" width="70px" />,
          AddedOn: formattedDate,
          Category: item.category,
        };
      });
      // console.log(products);
      setPdts(products);
    };
    fetchPdts();
  }, [updatePdt]);

  // ! Delete handler
  const changeState = () => setUpdatePdt(oldState => !oldState);
  const deleteHandler = async e => {
    const confirmation = window.confirm('Are you sure ?');
    if (confirmation) {
      const res = await fetch(
        `https://training-d4b60-default-rtdb.firebaseio.com/products/${e.target.value}.json`,
        {
          method: 'DELETE',
        }
      );

      // console.log(res);
      changeState();
    }
  };

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
                <th scope="col">Category</th>
                <th scope="col">AddedOn</th>
                <th scope="col"></th>
              </tr>
            </MDBTableHead>
            <MDBTableBody>
              {pdts.map((product, i) => {
                return (
                  <tr key={i}>
                    <th scope="row">{product.Name}</th>
                    <td>₹ {product.Price}</td>
                    <td>{product.Image}</td>
                    <td>{product.Category}</td>
                    <td>{product.AddedOn}</td>
                    <td>
                      <button
                        onClick={deleteHandler}
                        value={product.id}
                        className={styles.btn}
                      >
                        Delete
                      </button>
                    </td>
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
