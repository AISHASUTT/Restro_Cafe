import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import Item from "../components/common/Items";
import lineLogo from "../assets/img/home_main_line.png";
import itemImage from "../assets/img/home_item_1.png";
import heartImage from "../assets/img/home_heart.png";
import { fetchItems } from "../reducks/items/operations";
import { getItems } from "../reducks/items/selectors";
import { getCarts, getSubtotal } from "../reducks/carts/selectors";
import { fetchFromLocalStorage } from "../reducks/carts/operations";
import queryString from "query-string";
import Header from "../components/common/Header";
import Footer from "../components/common/Footer";
import PopWriteReview from "../components/popup/WriteReview";
import PopReview from "../components/popup/Reviews";
import Buttons from "../components/common/Buttons";
import { push } from "connected-react-router";
import { Link } from "react-router-dom";

const Home = () => {
  const parsed = queryString.parse(window.location.search);
  const [showWriteReviews, setShowWriteReview] = useState(false);
  const [showReviews, setShowReview] = useState(false);
  const [showCartList, setShowCartList] = useState(false);
  const [selectedItemId, setSelectedItemId] = useState(false);
  const dispatch = useDispatch();
  const selector = useSelector((state) => state);
  const item = getItems(selector);
  const carts = getCarts(selector);
  const subtotal = getSubtotal(selector);
  const [cat, setCat] = useState("");
  const handleClick = (params) => {
    if (params === 1) {
      setCat("hot");
    } else if (params === 2) {
      setCat("cold");
    } else if (params === 3) {
      setCat("bagel");
    } else {
      setCat("");
    }
  };

  useEffect(() => {
    dispatch(fetchItems(cat));
    // eslint-disable-next-line
  }, [cat]);

  const showItem = (item) => {
    let selected_count = 0;
    if (carts[item.id] && carts[item.id].selected_count) {
      selected_count = carts[item.id].selected_count;
    }

    if (showCartList && carts[item.id] === undefined) {
      return;
    }

    return (
      <Item
        key={item.id}
        item={item}
        selected_count={selected_count}
        setShowWriteReview={setShowWriteReview}
        setShowReviews={setShowReview}
        setSelectedItemId={setSelectedItemId}
      ></Item>
    );
  };

  return (
    <>
      <Header />

      <section class="mid_content">
        {showCartList ? (
          <>
            <h1>Selected Items</h1>
            <p>Please show this page to the waiter.</p>
          </>
        ) : (
          <>
            <div class="mid_quote">
              <h1>Our Most Popular Recipes</h1>
            </div>
            <div>
              <img src={lineLogo} />
            </div>
            <div>
              <p>
                Try Our Most Delicious Food and it usually take minutes to
                deliver!{" "}
              </p>
            </div>
          </>
        )}
      </section>
      <Buttons  handleClick={handleClick}/>
      {/* <ul class="items">{item && item.results.map(items => showItem(items))}</ul> */}

      <div className="items">
        {item && item.results ? (
          item.results.map((items) => showItem(items))
        ) : (
          <p> Loading...</p>
        )}
      </div>

      <Footer
        price={subtotal}
        showCartList={showCartList}
        setShowCartList={setShowCartList}
      />

      {showWriteReviews && (
        <PopWriteReview
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          setShowWriteReview={setShowWriteReview}
        />
      )}
      {showReviews && (
        <PopReview
          selectedItemId={selectedItemId}
          setSelectedItemId={setSelectedItemId}
          setShowReview={setShowReview}
        />
      )}
    </>
  );
};
export default Home;