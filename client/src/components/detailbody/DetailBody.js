import React, { useEffect, useState } from 'react'
import './detailbody.css'
import { Brush, Favorite, FavoriteBorder, Lock, Restaurant, Star, StarHalf, StarOutline } from '@mui/icons-material'
import { useParams } from 'react-router-dom';
import Cookies from 'js-cookie';

function DetailBody() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const params = useParams();
    let currentUser = {};
    if (Cookies.get('user') !== undefined) {
        currentUser = JSON.parse(Cookies.get('user'));
    }
    const city = params.city;
    const propertyId = params.propertyId;
    const [propertyDetail, setPropertyDetail] = useState({});
    useEffect(() => {
        const fetchProperty = async () => {
            const fetchData = await fetch(`https://pglife-web-app.onrender.com/api/post/detail/${city}/${propertyId}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await fetchData.json();
            setPropertyDetail(data[0]);
        }
        fetchProperty();
    })
    const likehandle = (elem) => {
        if (currentUser._id !== undefined) {
            const data = propertyDetail;
            if ((propertyDetail.likes).includes(currentUser._id)) {
                let temp = (data.likes).filter(elem => elem !== currentUser._id);
                data.likes = temp;
            } else {
                (data.likes).push(currentUser._id);
            }
            setPropertyDetail(data);
            try {
                const likeUser = async () => {
                    await fetch(`https://pglife-web-app.onrender.com/api/post/${elem}/like`, {
                        method: 'PUT',
                        headers: {
                            "Content-Type": "application/json"
                        }, body: JSON.stringify({
                            userId: currentUser._id
                        })
                    })
                }
                likeUser();
                // window.location.reload();
            } catch (err) {
                console.log(err)
            }
        }
    }
    return (
        <>
            <div className='body'>
                <div className='bodyWrapper'>
                    <div className='bodyCarousel'>
                        <div id="carouselExampleIndicators" className="carousel slide" data-bs-ride="carousel">
                            {/* <div className="carousel-indicators">
                            {(propertyDetail.images) && (propertyDetail.images).map((elem,index) => (
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to={index} className={"active"} aria-current="true" aria-label={`Slide `+index}></button>
                                ))}
                                 <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="1" aria-label="Slide 2"></button>
                                <button type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide-to="2" aria-label="Slide 3"></button> 
                            </div> */}
                            <div className="carousel-inner">
                                {(propertyDetail.images) && (propertyDetail.images).map(elem => (
                                    <div className="carousel-item active">
                                        <img src={`https://pglife-web-app.onrender.com/api/image/${elem}`} className="d-block w-100 carouselImg" alt="..." />
                                    </div>
                                ))}
                            </div>
                            <button className="carousel-control-prev" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="prev">
                                <span className="carousel-control-prev-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Previous</span>
                            </button>
                            <button className="carousel-control-next" type="button" data-bs-target="#carouselExampleIndicators" data-bs-slide="next">
                                <span className="carousel-control-next-icon" aria-hidden="true"></span>
                                <span className="visually-hidden">Next</span>
                            </button>
                        </div>
                    </div>
                    <div className='details'>
                        <div className='detailsWrapper'>
                            <div className='cardRight'>
                                <div className='cardRightTop'>
                                    <div className='starsCount'>
                                        {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(Math.round((propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3))].map((_, index) => (<Star className='starImg' />))}
                                        {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array((((propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3)) - Math.round((propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3) > 0 ? 1 : 0)].map((_, index) => (<StarHalf className='starImg' />))}
                                        {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(5 - Math.round((propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3) - ((((propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3)) - Math.round((propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3) > 0 ? 1 : 0))].map((_, index) => (<StarOutline className='starImg' />))}
                                    </div>
                                    <div className='interestedCountTab'>
                                        {propertyDetail.likes && (propertyDetail.likes).includes(currentUser._id)
                                            ? <Favorite className='favouriteIcon' onClick={() => likehandle(propertyDetail._id)} />
                                            : <FavoriteBorder className='favouriteIcon' onClick={() => likehandle(propertyDetail._id)} />
                                        }
                                        <span className='interestCount'>{propertyDetail.likes && propertyDetail.likes.length} interested</span>
                                    </div>
                                </div>
                                <div className='cardRightCenter'>
                                    <span className='propertyName'>{propertyDetail.propertyName}</span>
                                    <span className='propertyAddress'>{propertyDetail.propertyAddress}</span>
                                    <img className='genderImg' src={PF + `/innerImg/${propertyDetail.propertyGender}.png`} alt='' />
                                </div>
                                <div className='cardRightBottom'>
                                    <div className='price'>
                                        <span className='moneyRequired'>Rs {propertyDetail.propertyRent}/-</span>
                                        <span className='timeRequired'>per month</span>
                                    </div>
                                    <div className='viewButtonTab'>
                                        <button className='viewButton'>Book Now</button>
                                    </div>
                                </div>
                            </div>
                            <div className='amenities'>
                                <h1 className='heading'>Amenities</h1>
                                <div className='amenityContainers'>
                                    <div className='amenityColoumn'>
                                        <h5 className='coloumnHeading'>Building</h5>
                                        {propertyDetail.propertyAmenities && propertyDetail.propertyAmenities.length !== 0 &&
                                            propertyDetail.propertyAmenities.map((elem) => (
                                                elem.value === 'powerbackup' || elem.value === 'cctv' || elem.value === 'fireext' || elem.value === 'lift' || elem.value === 'parking' ? (
                                                    <div className='amenityContainer'>
                                                        <img src={PF + `/innerImg/amenities/${elem.value}.svg`} alt='' className='amenityImg' />
                                                        <span>{elem.label}</span>
                                                    </div>) : null
                                            ))
                                        }
                                    </div>
                                    <div className='amenityColoumn'>
                                        <h5 className='coloumnHeading'>Common Area</h5>
                                        {propertyDetail.propertyAmenities && propertyDetail.propertyAmenities.length !== 0 &&
                                            propertyDetail.propertyAmenities.map((elem) => (
                                                elem.value === 'wifi' || elem.value === 'tv' || elem.value === 'rowater' || elem.value === 'dining' || elem.value === 'washingmachine' ? (
                                                    <div className='amenityContainer'>
                                                        <img src={PF + `/innerImg/amenities/${elem.value}.svg`} alt='' className='amenityImg' />
                                                        <span>{elem.label}</span>
                                                    </div>) : null
                                            ))
                                        }

                                    </div>
                                    <div className='amenityColoumn'>
                                        <h5 className='coloumnHeading'>Bedroom</h5>
                                        {propertyDetail.propertyAmenities && propertyDetail.propertyAmenities.length !== 0 &&
                                            propertyDetail.propertyAmenities.map((elem) => (
                                                elem.value === 'bed' || elem.value === 'ac' ? (
                                                    <div className='amenityContainer'>
                                                        <img src={PF + `/innerImg/amenities/${elem.value}.svg`} alt='' className='amenityImg' />
                                                        <span>{elem.label}</span>
                                                    </div>) : null
                                            ))
                                        }
                                    </div>
                                    <div className='amenityColoumn'>
                                        <h5 className='coloumnHeading'>Washroom</h5>
                                        {propertyDetail.propertyAmenities && propertyDetail.propertyAmenities.length !== 0 &&
                                            propertyDetail.propertyAmenities.map((elem) => (
                                                elem.value === 'geyser' ? (
                                                    <div className='amenityContainer'>
                                                        <img src={PF + `/innerImg/amenities/${elem.value}.svg`} alt='' className='amenityImg' />
                                                        <span>{elem.label}</span>
                                                    </div>) : null
                                            ))
                                        }
                                    </div>
                                </div>
                            </div>
                            <div className='aboutProperty'>
                                <h1 className='heading'>About the Property</h1>
                                <p className='aboutPara'>
                                    {propertyDetail.propertyAbout}
                                </p>
                            </div>
                            <div className='propertyRating'>
                                <h1 className='heading'>Property Rating</h1>
                                <div className='ratingBody'>
                                    <div className='leftRating'>
                                        <div className='diffRating'>
                                            <div className='ratingIcon'><Brush className='ratingIconImg' /><span>Cleanliness</span></div>
                                            <div className='ratingStar'>
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(Math.round(propertyDetail.propertyRating[0] * 1))].map((_, index) => (<Star className='leftRatingStarImg' />))}
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array((propertyDetail.propertyRating[0] * 1) - Math.round(propertyDetail.propertyRating[0] * 1) > 0 ? 1 : 0)].map((_, index) => (<StarHalf className='leftRatingStarImg' />))}
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(5 - Math.round(propertyDetail.propertyRating[0] * 1) - ((propertyDetail.propertyRating[0] * 1) - Math.round(propertyDetail.propertyRating[0] * 1) > 0 ? 1 : 0))].map((_, index) => (<StarOutline className='leftRatingStarImg' />))}
                                            </div>
                                        </div>
                                        <div className='diffRating'>
                                            <div className='ratingIcon'><Restaurant className='ratingIconImg' /><span>Food Quality</span></div>
                                            <div className='ratingStar'>
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(Math.round(propertyDetail.propertyRating[1] * 1))].map((_, index) => (<Star className='leftRatingStarImg' />))}
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array((propertyDetail.propertyRating[1] * 1) - Math.round(propertyDetail.propertyRating[1] * 1) > 0 ? 1 : 0)].map((_, index) => (<StarHalf className='leftRatingStarImg' />))}
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(5 - Math.round(propertyDetail.propertyRating[1] * 1) - ((propertyDetail.propertyRating[1] * 1) - Math.round(propertyDetail.propertyRating[1] * 1) > 0 ? 1 : 0))].map((_, index) => (<StarOutline className='leftRatingStarImg' />))}
                                            </div>
                                        </div>
                                        <div className='diffRating'>
                                            <div className='ratingIcon'><Lock className='ratingIconImg' /><span>Safety</span></div>
                                            <div className='ratingStar'>
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(Math.round(propertyDetail.propertyRating[2] * 1))].map((_, index) => (<Star className='leftRatingStarImg' />))}
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array((propertyDetail.propertyRating[2] * 1) - Math.round(propertyDetail.propertyRating[2] * 1) > 0 ? 1 : 0)].map((_, index) => (<StarHalf className='leftRatingStarImg' />))}
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(5 - Math.round(propertyDetail.propertyRating[2] * 1) - ((propertyDetail.propertyRating[2] * 1) - Math.round(propertyDetail.propertyRating[2] * 1) > 0 ? 1 : 0))].map((_, index) => (<StarOutline className='leftRatingStarImg' />))}
                                            </div>
                                        </div>
                                    </div>
                                    <div className='rightRating'>
                                        <div className='rightratingCircle'>
                                            <div className='rightmainRating'>{Math.round((propertyDetail.propertyRating && (propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3) * 10) / 10}</div>
                                            <div className='rightmainRatingStars'>
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(Math.round((propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3))].map((_, index) => (<Star className='rightRatingStarImg' />))}
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array((Math.round(((propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3) * 2) % 2 === 1) ? 1 : 0)].map((_, index) => (<StarHalf className='rightRatingStarImg' />))}
                                                {propertyDetail.propertyRating && propertyDetail.propertyRating.length !== 0 && [...Array(Math.round(4.5 - ((propertyDetail.propertyRating[0] * 1 + propertyDetail.propertyRating[1] * 1 + propertyDetail.propertyRating[2] * 1) / 3)))].map((_, index) => (<StarOutline className='rightRatingStarImg' />))}
                                            </div>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className='propertyReview'>
                                <h1 className='heading'>What people say</h1>
                                <div className='reviewCard'>
                                    <img className='reviewImg' src={PF + `/innerImg/man.png`} alt='' />
                                    <div className='reviewInner'>
                                        <p className='reviewPara'><img className='quoteImg' src={PF + `/innerImg/quote-left.png`} alt='' />You just have to arrive at the place, it's fully furnished and stocked with all basic amenities and services and even your friends are welcome.</p>
                                        <div className='reviewSign'>- Ashutosh Gowariker</div>
                                    </div>
                                </div>
                                <div className='reviewCard'>
                                    <img className='reviewImg' src={PF + `/innerImg/man.png`} alt='' />
                                    <div className='reviewInner'>
                                        <p className='reviewPara'><img className='quoteImg' src={PF + `/innerImg/quote-left.png`} alt='' />You just have to arrive at the place, it's fully furnished and stocked with all basic amenities and services and even your friends are welcome.</p>
                                        <div className='reviewSign'>- Karan Johar</div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default DetailBody