import { useState } from 'react';
import styles from '../pages/Home.module.css';
// import HttpClient from '../utils/HttpClient';
import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Highlights = props => {
  const [listRef] = useAutoAnimate();
  const [submitting, setSubmitting] = useState(false);
  const [input, setInputs] = useState([{ highlightText: '' }]);
  const navigate = useNavigate();
  // ! Register stroke
  const registerTextHandler = (e, index) => {
    const { name, value } = e.target;
    const list = [...input];
    list[index][name] = value;
    setInputs(list);
    // console.log(input);
  };
  // ! Add Fields
  const addInputHandler = e => {
    e.preventDefault();
    setInputs(oldState => [...oldState, { highlightText: '' }]);
  };
  // ! Remove fields
  const removeInputHandler = (e, i) => {
    e.preventDefault();
    const list = [...input];
    list.splice(i, 1);
    setInputs(list);
  };
  //! Add Button
  const addBtn = (
    <button onClick={addInputHandler} type="text" className={styles.btn}>
      Add Highlight
    </button>
  );
  // ! Remove button
  const removeBtn = index => (
    <button
      onClick={e => removeInputHandler(e, index)}
      type="text"
      className={styles.btn}
    >
      Remove
    </button>
  );
  // ! Submit data
  const submitHandler = async e => {
    e.preventDefault();
    setSubmitting(true);
    const id = localStorage.getItem('id');
    const {
      category,
      subCategory,
      buisness,
      city,
      productName,
      productPrice,
      images,
    } = props.parentData();

    let data = {
      name: productName,
      price: productPrice,
      category,
      sub_cat_id: subCategory,
      owner_id: id,
      bussiness_id: buisness,
      date: Date.now(),
      img:
        images[0] ||
        'https://testdadfile.s3.us-east-1.amazonaws.com/product/c616ff40-df5a-11ed-a44d-17028cd7da50.jpg',
      highlight: input,
      mode: 'Best Offer',
      city_id: city,
      product_status: true,
    };

    if (
      productName.trim().length === 0 ||
      productPrice < 0 ||
      category.trim().length === 0 ||
      id < 0 ||
      buisness < 0 ||
      city < 0
    ) {
      props.hasError(true);
      setSubmitting(false);
      window.scrollTo({ top: 0, left: 0, behavior: 'smooth' });
      return;
    }

    props.hasError(false);

    const res = await fetch(
      'https://training-d4b60-default-rtdb.firebaseio.com/products.json',
      {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(data),
      }
    );
    // const createdPdt = await res.json();
    if (res && res.ok) {
      setSubmitting(false);
      // console.log(res);
      // console.log(createdPdt);
      navigate('/onSubmit');
    }
    // if (res && res.status) {
    //   // navigate(0); // Reload
    // }
  };
  return (
    <>
      <div ref={listRef}>
        {input.map((item, index) => {
          return (
            <div key={index} className={styles.highlightContainer}>
              <input
                placeholder="Put product highlight..."
                id={styles.highlights}
                type="text"
                name="highlightText"
                value={item.highlightText}
                onChange={e => registerTextHandler(e, index)}
              />
              {input.length > 1 && removeBtn(index)}
              {input.length - 1 === index && addBtn}
            </div>
          );
        })}
        <button
          onClick={submitHandler}
          className={`${styles.btn} ${styles.submit}`}
          type="submit"
        >
          {!submitting ? 'Submit' : 'Submitting...'}
        </button>
      </div>
    </>
  );
};
export default Highlights;
// onClick = { submitHandler };
