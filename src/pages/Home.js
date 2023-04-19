import { Link, useNavigate } from 'react-router-dom';
import styles from './Home.module.css';
import { useState, useEffect, useRef } from 'react';
import HttpClient from '../utils/HttpClient';
import Highlights from '../Components/Highlights';

const Home = () => {
  // ~ states
  const [images, setImages] = useState([]);
  const [category, setCategory] = useState([]);
  const [buisness, setBuisness] = useState([]);
  const [country, setCountry] = useState([]);
  const [subCategory, setSubCategory] = useState([]);

  const [selectedBuisness, setSelectedBuisness] = useState();
  const [selectedCity, setSelectedCity] = useState();
  const [selectedCat, setSelectedCat] = useState();
  const [selectedSubCat, setSelectedSubCat] = useState();
  const [loading, setLoading] = useState(false);

  // ~ Refs
  const pdtName = useRef();
  const pdtPrice = useRef();

  const navigate = useNavigate();

  //! Logout handler
  const logoutHandler = e => {
    e.preventDefault();
    localStorage.removeItem('login');
    localStorage.removeItem('id');
    localStorage.removeItem('token');
    navigate('/login');
  };

  //! Fetch sub category
  const dropdownHandler = async e => {
    if (e.target.value === 'default') return setSubCategory([]);
    setSelectedCat(+e.target.value);
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
    setLoading(true);
    const selectedFiles = Array.from(e.target.files);

    const sendImages = async x => {
      let data = new FormData();
      data.append(`image`, selectedFiles[x]);
      let result = await HttpClient.fileUplode(
        'image-upload/product',
        'POST',
        data
      );
      // console.log(result.url);
      setImages(prevstate => [...prevstate, result.url]);
    };
    e.target.value = '';
    for (let i = 0; i < selectedFiles.length; i++) {
      await sendImages(i);
    }
    setLoading(false);
    // setTimeout(() => setLoading(false), 5000);
  };

  // ~ Selected city
  const cityHandler = e => {
    setSelectedCity(+e.target.value);
  };
  // ~ Selected buisness
  const buisnessHandler = e => {
    setSelectedBuisness(+e.target.value);
  };
  // ~ Subcategory Handler
  const subCategoryHandler = e => {
    setSelectedSubCat(+e.target.value);
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
      // console.log(res.allData);
      const buisness = res.allData.map(item => ({
        name: item.businessName,
        id: item.id,
      }));
      setBuisness(oldState => [...oldState, ...buisness]);
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

  // ~ Passing parent data
  const passParentData = () => {
    return {
      category: selectedCat,
      subCategory: selectedSubCat,
      buisness: selectedBuisness,
      city: selectedCity,
      productName: pdtName.current.value,
      productPrice: +pdtPrice.current.value,
      images,
    };
  };
  return (
    <>
      <div className={styles.maincontainer}>
        <br />
        <h1>Home Page</h1>
        <p>
          In publishing and graphic design, Lorem ipsum is a placeholder text
          commonly used to demonstrate the visual form of a document or a
          typeface without relying on meaningful content. Lorem ipsum may be
          used as a placeholder before final copy is available.
        </p>

        <button
          className={`${styles.btn} ${styles.submit}`}
          onClick={logoutHandler}
        >
          Logout
        </button>
        <button className={`${styles.btn} ${styles.submit}`}>
          <Link id={styles.anchor} to="/products">
            Products List
          </Link>
        </button>
        <hr />
        <form>
          <h1>Add a Product</h1>
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
              <select id="category2" onChange={subCategoryHandler}>
                <option>Select Sub Category</option>
                {subCategory.map(item => (
                  <option key={item.name} value={item.id}>
                    {item.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          {/* BUISNESS */}
          <div>
            <label className={styles.leftlabel} htmlFor="buisness">
              Buisness
            </label>
            <br></br>
            <select id="buisness" onChange={buisnessHandler}>
              <option>Select Sub Category</option>
              {buisness.map((item, index) => (
                <option key={index} value={item.id}>
                  {item.name}
                </option>
              ))}
            </select>
          </div>
          {/* CITY */}
          <div>
            <label className={styles.leftlabel} htmlFor="city">
              City
            </label>
            <br></br>
            <select id="city" onChange={cityHandler}>
              <option>Select city</option>
              {country.map((n, i) => (
                <option key={i} value={i}>
                  {n}
                </option>
              ))}
            </select>
          </div>
          {/* PRODUCT NAME */}
          <div>
            <label htmlFor="pdtname">Product Name</label>
            <br></br>
            <input id="pdtname" type="text" ref={pdtName} />
          </div>
          {/* PRODUCT PRICE */}
          <div>
            <label htmlFor="pdtprice">Product Price</label>
            <br></br>
            <input id="pdtprice" type="number" ref={pdtPrice} />
          </div>
          {/* IMAGES */}
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
            {loading && <p>Loading images...</p>}
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
          <Highlights parentData={passParentData} />
        </form>
      </div>
    </>
  );
};
export default Home;
