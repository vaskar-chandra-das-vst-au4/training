import { useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useState, useEffect } from 'react';
import HttpClient from '../utils/HttpClient';
import Highlights from '../Components/Highlights';

const Home = () => {
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [buisness, setBuisness] = useState([]);
  const [country, setCountry] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const navigate = useNavigate();

  //! Logout handler
  const logoutHandler = e => {
    e.preventDefault();
    localStorage.removeItem('login');
    navigate('/login');
  };

  //! Fetch sub category
  const dropdownHandler = async e => {
    if (e.target.value === 'default') return setSubCategory([]);
    const res = await HttpClient.requestData(
      'subCategory/dependency-subcategory',
      'POST',
      { category_id: +e.target.value }
    );
    setSubCategory([...res.data]);
    // console.log(res.data);
  };

  //! Delete images
  const deleteHandler = url => {
    setImages(prevstate => {
      let updatedImages = prevstate.filter(image => image !== url);
      return updatedImages;
    });
  };

  //! Image uploads
  const fileHandler = async e => {
    const selectedFiles = Array.from(e.target.files);

    const sendImages = async x => {
      let data = new FormData();
      data.append(`image`, selectedFiles[x]);
      let result = await HttpClient.fileUplode(
        'image-upload/product',
        'POST',
        data
      );
      setImages(prevstate => [...prevstate, result.url]);
    };
    e.target.value = '';

    for (let i = 0; i < selectedFiles.length; i++) {
      await sendImages(i);
    }
  };

  useEffect(() => {
    //! Fetch category
    const getCategory = async () => {
      const res = await HttpClient.requestData('categary', 'GET');
      const fetchedCategory = res.data.map(c => {
        return {
          id: c.id,
          name: c.name,
        };
      });
      setCategory(fetchedCategory);
    };

    // ! Fetch buisness
    const id = localStorage.getItem('id');
    const getBuisness = async () => {
      const res = await HttpClient.requestData(
        'business/get-business',
        'POST',
        { owner_id: +id }
      );
      const bnames = res.allData.map(item => item.businessName);
      setBuisness(oldState => [...oldState, ...bnames]);
    };

    // ! Fetch city
    const getCity = async () => {
      const res = await HttpClient.requestData('product/getCity');
      const countryNames = res.map(item => item.name);
      setCountry(oldState => [...oldState, ...countryNames]);
    };

    getCategory();
    getBuisness();
    getCity();
    // Promise.allSettled([getCategory(), getBuisness(), getCity()]);
  }, []);

  return (
    <>
      <div className={styles.maincontainer}>
        <h2>Home Page</h2>
        <button className={styles.btn} onClick={logoutHandler}>
          Logout
        </button>
        <form>
          <h3>Primary Form</h3>
          <div className={styles.categoryContainer}>
            {/* Category */}
            <div className={styles.c1}>
              <label htmlFor="category1">Category</label>
              <select id="category1" onChange={dropdownHandler}>
                <option value="default">Select Category</option>
                {category.map(c => (
                  <option key={c.id} value={c.id}>
                    {c.name}
                  </option>
                ))}
              </select>
            </div>
            {/* subcategory */}
            <div className={styles.c2}>
              <label htmlFor="category2">Sub Category</label>
              <select id="category2">
                <option>Select Sub Category</option>
                {subCategory.map(item => (
                  <option key={item.name}>{item.name}</option>
                ))}
              </select>
            </div>
          </div>
          <div>
            <label className={styles.leftlabel} htmlFor="buisness">
              Buisness
            </label>
            <br></br>
            <select id="buisness">
              <option>Select Sub Category</option>
              {buisness.map((item, index) => (
                <option key={index}>{item}</option>
              ))}
            </select>
          </div>
          <div>
            <label className={styles.leftlabel} htmlFor="city">
              City
            </label>
            <br></br>
            <select id="city">
              <option>Select city</option>
              {country.map((n, i) => (
                <option key={i}>{n}</option>
              ))}
            </select>
          </div>
          <div>
            <label htmlFor="pdtname">Product Name</label>
            <br></br>
            <input id="pdtname" type="text" />
          </div>
          <div>
            <label htmlFor="pdtprice">Product Price</label>
            <br></br>
            <input id="pdtprice" type="number" />
          </div>
          <div>
            <label htmlFor="images">Select Images:</label>
            <input
              type="file"
              name="images"
              id="imageField"
              multiple
              accept="image/png ,image/jpeg ,image/jpg ,image/webp"
              onChange={fileHandler}
            />
            <div className="images">
              {images &&
                images.map((url, index) => {
                  return (
                    <img
                      key={index}
                      src={url}
                      alt="images"
                      height="120px"
                      width="180.2px"
                      onClick={deleteHandler.bind(null, url)}
                    />
                  );
                })}
            </div>
          </div>
          <label>Highlights</label>
          <br></br>
          <Highlights />
        </form>
      </div>
    </>
  );
};
export default Home;
