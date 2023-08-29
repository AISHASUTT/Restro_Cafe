import React, { useState, useEffect } from 'react';
import ImgReaction1 from '../../assets/img/reaction1.svg';
import ImgReaction2 from '../../assets/img/reaction2.svg';
import ImgReaction3 from '../../assets/img/reaction3.svg';
import ImgReaction0 from '../../assets/img/reaction0.svg';
import ImgIconCross from '../../assets/img/cross.svg';
import API from '../../API';

const api = new API();

const Reviews = ({ selectedItemId, setSelectedItemId, setShowReview }) => {
    const [reviews, setReviews] = useState([]);

    useEffect(() => {
        api.getReviews(selectedItemId).then(reviews => {
            setSelectedItemId(null);
            setReviews(reviews);
        });
    }, []);

    const getImgReaction = like_count => {
        switch (like_count) {
            case 1:
                return ImgReaction1;
            case 2:
                return ImgReaction2;
            case 3:
                return ImgReaction3;
            default:
                return ImgReaction0;
        }
    };

    return (
        <section class="popup">
            <div class="innter">
                <div class="popup-content">
                    <div class="innter">
                        <img src={ImgIconCross} onClick={() => setShowReview(false)} class="cross" alt="" />

                        <h2>Reviews</h2>
                        <ul class="reviews">
                            {reviews && reviews.results ? (
                                reviews.results.map(review => (
                                    <li>
                                        <img src={getImgReaction(review.like_count)} alt="" />
                                        <div class="name">{review.name}</div>
                                        <div class="body">{review.body}</div>
                                    </li>
                                ))
                            ) : (
                                <p>Loading...</p>
                            )}
                        </ul>
                    </div>
                </div>
            </div>
        </section>

        //     <section class="form_sec">
        //         <div class="sign">
        //             <h1>All Review</h1>

        //             <h3>Choose your thought</h3>
        //             <div class="all-button">
        //                 <div class="good_button">
        //                     <img src={heartImage} alt="" />
        //                     <div class="inner_button">
        //                         <h2 id="h2">Good</h2>
        //                         <p id="p2">(15 likes)</p>
        //                     </div>
        //                 </div>
        //                 <div class="good_button">
        //                     <img src={heartImage} alt="" />
        //                     <div class="inner_button">
        //                         <h2 id="h2">Very Good</h2>
        //                         <p id="p2">(15 likes)</p>
        //                     </div>
        //                 </div>
        //                 <div class="good_button">
        //                     <img src={heartImage} alt="" />
        //                     <div class="inner_button">
        //                         <h2 id="h2">Excellent</h2>
        //                         <p id="p2">(15 likes)</p>
        //                     </div>
        //                 </div>
        //                 <div class="good_button">
        //                     <img src={thumbsUp} alt="" />
        //                     <div class="inner_button">
        //                         <h2 id="h2">Not Good</h2>
        //                         <p id="p2">(15 likes)</p>
        //                     </div>
        //                 </div>
        //             </div>
        //             <h3>Jhon Cena</h3>
        //             <p>
        //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate vero distinctio incidunt beatae
        //                 nostrum suscipit, accusantium earum animi aliquam eligendi dolorem, impedit, facilis enim sit
        //                 deleniti deserunt neque? Laborum, ea!
        //             </p>
        //             <br />
        //             <h3>Rock</h3>
        //             <p>
        //                 Lorem ipsum dolor sit amet consectetur, adipisicing elit. Voluptate vero distinctio incidunt beatae
        //                 nostrum suscipit, accusantium earum animi aliquam eligendi dolorem, impedit, facilis enim sit
        //                 deleniti deserunt neque? Laborum, ea!
        //             </p>
        //         </div>
        //     </section>
        /* {reviews &&
                                reviews.map((review) => (
                                    <li>
                                        <img src={getImgReaction(review.like_count)} alt="" />
                                        <div class="name">{review.name}</div>
                                        <div class="body">{review.body}</div>
                                    </li>
                                ))} */
    );
};

export default Reviews;