import { useState } from 'react';
import styles from '../pages/Home.module.css';
const Highlights = props => {
  const [input, setInputs] = useState([{ highlightText: '' }]);

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
  const submitHandler = e => {
    e.preventDefault();
    console.log('clicked');
  };
  return (
    <>
      {input.map((item, index) => {
        return (
          <div key={index} className={styles.highlightContainer}>
            <input
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
      <button onClick={submitHandler} className={styles.btn} type="submit">
        Submit
      </button>
    </>
  );
};
export default Highlights;
