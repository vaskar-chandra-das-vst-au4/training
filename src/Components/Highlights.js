import { useState } from 'react';
import styles from '../pages/Home.module.css';
import HttpClient from '../utils/HttpClient';
import { useNavigate } from 'react-router-dom';
import { useAutoAnimate } from '@formkit/auto-animate/react';

const Highlights = props => {
  const [listRef] = useAutoAnimate();

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
  const submitHandler = async e => {
    e.preventDefault();
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
      cat_id: category,
      sub_cat_id: subCategory,
      owner_id: id,
      bussiness_id: buisness,
      img: images,
      highlight: input,
      mode: 'Best Offer',
      city_id: city,
      product_status: true,
    };
    console.log(data);
    let res = await HttpClient.requestData('product/add-product', 'POST', data);

    if (res && res.status) {
      console.log(res);
      // navigate(0); // Reload
      navigate('/onSubmit');
    } else {
      alert(res.error);
    }
  };
  return (
    <>
      <div ref={listRef}>
        {input.map((item, index) => {
          return (
            <div key={index} className={styles.highlightContainer}>
              <input
                // className={styles['text-focus-in']}
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
          Submit
        </button>
      </div>
    </>
  );
};
export default Highlights;
// onClick = { submitHandler };
