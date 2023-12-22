import React, { useState, useEffect } from 'react'
import './properties.css'
import { Favorite, FavoriteBorder, Star, StarHalf, StarOutline, Tune, VerticalAlignBottom, VerticalAlignTop } from '@mui/icons-material'
import { useNavigate, useParams } from 'react-router-dom';
import Cookies from 'js-cookie';


function Properties() {
    const PF = process.env.REACT_APP_PUBLIC_FOLDER;
    const navigate = useNavigate();
    let currentUser = {};
    if (Cookies.get('user') !== undefined) {
        currentUser = JSON.parse(Cookies.get('user'));
    }
    const [property, setProperty] = useState([]);
    const likehandle = (elem, index) => {
        if (currentUser._id !== undefined) {
            const data = [...property];
            if (property[index].likes.includes(currentUser._id)) {
                let temp = (data[index].likes).filter(elem => elem !== currentUser._id);
                data[index].likes = temp;
            } else {
                (data[index].likes).push(currentUser._id);
            }
            setProperty([...data]);
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
    const params = useParams();
    const city = params.city;
    useEffect(() => {
        const fetchProperty = async () => {
            const fetchData = await fetch(`https://pglife-web-app.onrender.com/api/post/property/${city}`, {
                method: 'GET',
                headers: {
                    "Content-Type": "application/json"
                }
            })
            const data = await fetchData.json();
            setProperty(data);
        }
        fetchProperty();
    }, [city])
    const sortLow = () => {
        const data = [...property];
        data.sort((a, b) => a.propertyRent - b.propertyRent);
        setProperty([...data]);
    }
    const sortHigh = () => {
        const data = [...property];
        data.sort((a, b) => b.propertyRent - a.propertyRent);
        setProperty(data);
    }
    return (
        <div className='properties'>
            <div className='propertiesWrapper'>
                <div className='propertiesFilter'>
                    <div className='filterInfo'>
                        <Tune className='filterIcon' />
                        <span className='filterName'>Filter</span>
                    </div>
                    <div className='filterInfo'>
                        <VerticalAlignBottom className='filterIcon' onClick={sortHigh} />
                        <span className='filterName'>Highest rent first</span>
                    </div>
                    <div className='filterInfo'>
                        <VerticalAlignTop className='filterIcon' onClick={sortLow} />
                        <span className='filterName'>Lowest rent first</span>
                    </div>
                </div>
                <div className='propertiesCards'>
                    {property.map((elem, index) => (
                        <div className='propertiesCard'>
                            <div className='cardLeft'>
                                <img className='cardImg' src={(elem.images[0] === undefined) ? `${PF}/defaultImg.jpg` : `https://pglife-web-app.onrender.com/api/image/${elem.images[0]}`} alt='' /></div>
                            <div className='cardRight'>
                                <div className='cardRightTop'>
                                    <div className='starsCount'>
                                        {elem.propertyRating && elem.propertyRating.length !== 0 && [...Array(Math.round((elem.propertyRating[0] * 1 + elem.propertyRating[1] * 1 + elem.propertyRating[2] * 1) / 3))].map((_, index) => (<Star className='starImg' />))}
                                        {elem.propertyRating && elem.propertyRating.length !== 0 && [...Array((((elem.propertyRating[0] * 1 + elem.propertyRating[1] * 1 + elem.propertyRating[2] * 1) / 3)) - Math.round((elem.propertyRating[0] * 1 + elem.propertyRating[1] * 1 + elem.propertyRating[2] * 1) / 3) > 0 ? 1 : 0)].map((_, index) => (<StarHalf className='starImg' />))}
                                        {elem.propertyRating && elem.propertyRating.length !== 0 && [...Array(5 - Math.round((elem.propertyRating[0] * 1 + elem.propertyRating[1] * 1 + elem.propertyRating[2] * 1) / 3) - ((((elem.propertyRating[0] * 1 + elem.propertyRating[1] * 1 + elem.propertyRating[2] * 1) / 3)) - Math.round((elem.propertyRating[0] * 1 + elem.propertyRating[1] * 1 + elem.propertyRating[2] * 1) / 3) > 0 ? 1 : 0))].map((_, index) => (<StarOutline className='starImg' />))}
                                    </div>
                                    <div className='interestedCountTab'>
                                        {elem.likes.includes(currentUser._id)
                                            ? <Favorite className='favouriteIcon' onClick={() => likehandle(elem._id, index)} />
                                            : <FavoriteBorder className='favouriteIcon' onClick={() => likehandle(elem._id, index)} />
                                        }
                                        <span className='interestCount'>{elem.likes.length} interested</span>
                                    </div>
                                </div>
                                <div className='cardRightCenter'>
                                    <span className='propertyName'>{elem.propertyName}</span>
                                    <span className='propertyAddress'>{elem.propertyAddress}</span>
                                    <img className='genderImg' src={PF + `/innerImg/${elem.propertyGender}.png`} alt='' />
                                </div>
                                <div className='cardRightBottom'>
                                    <div className='price'>
                                        <span className='moneyRequired'>Rs {elem.propertyRent}/-</span>
                                        <span className='timeRequired'>per month</span>
                                    </div>
                                    <div className='viewButtonTab'>
                                        <button className='viewButton' onClick={() => navigate(`/detail/${city}/${elem._id}`)}>View</button>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    )
}

export default Properties