import { useEffect } from 'react';
import HttpClient from '../utils/HttpClient';
import { Link } from 'react-router-dom';
import styles from './Home.module.css';

import 'bootstrap/dist/css/bootstrap.min.css';
import { MDBDataTable } from 'mdbreact';

const Products = () => {
  useEffect(() => {
    const id = localStorage.getItem('id');
    const data = {
      owner_id: +id,
    };
    const fetchPdts = async () => {
      const res = await HttpClient.requestData(
        'product/fetch-vproduct',
        'POST',
        data
      );
      console.log(res.data);
    };
    fetchPdts();
  }, []);

  const data = {
    columns: [
      {
        label: 'Name',
        field: 'Name',
        sort: 'asc',
        width: 150,
      },
      {
        label: 'Price',
        field: 'Price',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Image',
        field: 'Image',
        width: 200,
      },
      {
        label: 'AddedOn',
        field: 'AddedOn',
        sort: 'asc',
        width: 100,
      },
      {
        label: 'Category',
        field: 'Category',
        sort: 'asc',
        width: 150,
      },
    ],
    rows: [
      {
        Name: 'Laptop',
        Price: 30000,
        Image: (
          <img
            src="https://testdadfile.s3.us-east-1.amazonaws.com/product/60c62db0-deb9-11ed-a44d-17028cd7da50.jpg"
            alt="images"
            height="50px"
            width="50px"
          />
        ),
        AddedOn: '2011/04/25',
        Category: 'Electronics',
      },
    ],
  };
  return (
    <>
      <div className={styles.productContainer}>
        <br />
        <br />
        <h1>Products Page</h1>
        <button className={`${styles.btn} ${styles.submit}`}>
          <Link id={styles.anchor} to="..">
            Go Back
          </Link>
        </button>
        <div className="container">
          <MDBDataTable striped bordered small data={data} />
        </div>
      </div>
    </>
  );
};
export default Products;
