import React, { useContext, useRef, useState } from 'react'
import './postModal.css'
import { AuthContext } from '../../context/AuthContext';
import Select from 'react-select';
import { Cancel, PermMedia } from '@mui/icons-material';


function PostModal() {
    const { user } = useContext(AuthContext);
    const [file, setFile] = useState([]);
    const amenitiesOption = [
        { value: 'cctv', label: 'surveillance' },
        { value: 'fireext', label: 'Fire Exit' },
        { value: 'lift', label: 'Lift' },
        { value: 'parking', label: 'Parking' },
        { value: 'powerbackup', label: 'Power backup' },
        { value: 'dining', label: 'Dining' },
        { value: 'tv', label: 'TV' },
        { value: 'washingmachine', label: 'Washing Machine' },
        { value: 'rowater', label: 'Water Purifer' },
        { value: 'wifi', label: 'Wifi' },
        { value: 'ac', label: 'Air Conditioner' },
        { value: 'bed', label: 'Bed with Matress' },
        { value: 'geyser', label: 'Geyser' },
    ];
    const genderOptions = [
        { value: "female", label: "Female" },
        { value: "male", label: "Male" },
        { value: "unisex", label: "Unisex" }
    ];
    const propertyName = useRef();
    const propertyAddress = useRef();
    const city = useRef();
    const propertyRent = useRef();
    const propertyAbout = useRef();
    const cleanRating = useRef();
    const foodRating = useRef();
    const safetyRating = useRef();
    const [selectedAmenitiesOptions, setSelectedAmenitiesOptions] = useState();
    const [selectedGenderOptions, setSelectedGenderOptions] = useState();
    function handleAmenitiesSelect(data) {
        setSelectedAmenitiesOptions(data);
    }
    function handleGenderSelect(data) {
        setSelectedGenderOptions(data);
    }
    const postHandle = async (e) => {
        e.preventDefault();
        const postdata = {
            userId: user._id,
            propertyName: propertyName.current.value,
            propertyAddress: propertyAddress.current.value,
            city: city.current.value,
            propertyGender: selectedGenderOptions.value,
            propertyAmenities: selectedAmenitiesOptions,
            propertyRating: [cleanRating.current.value, foodRating.current.value, safetyRating.current.value],
            propertyRent: propertyRent.current.value,
            propertyAbout: propertyAbout.current.value,

        }
        if (file.length > 0) {
            postdata.images = [];
            file.forEach((item, index) => {
                let formdata = new FormData();
                const fileName = Date.now() + item.name;
                const newFile = new File([item], fileName);
                formdata.append("file", newFile);
                postdata.images.push(fileName);
                try {
                    const uploadPost = async () => {
                        await fetch('https://pglife-web-app.onrender.com/api/upload', {
                            method: 'POST',
                            body: formdata
                        })
                    }
                    uploadPost();
                } catch (err) {
                    console.log(err);
                }
            })
        }
        try {
            const res = await fetch('https://pglife-web-app.onrender.com/api/post/', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(postdata)
            })
            if (res.status === 200)
                window.alert('Property Posted');
            else
                window.alert('Property NOT Posted');
            setSelectedAmenitiesOptions([]);
            setSelectedGenderOptions([]);
            setFile([])
            await e.target.reset();
            window.location.reload();
        } catch (err) {
            console.log(err);
        }
    }
    const uploadSingleFile = (e) => {
        e.target.files[0].url = (URL.createObjectURL(e.target.files[0]));
        setFile([...file, (e.target.files[0])])
    }
    const deleteFile = (event, key) => {
        const s = file.filter((item, index) => index !== key);
        setFile(s);
    }
    return (
        <div className="modal fade" id="PostModal" tabIndex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
            <div className="modal-dialog modalBox">
                <div className="modal-content postBox">
                    <div className="modal-header postHeader">
                        <h1 className="modal-title fs-5" id="PostTitle">Property Detail</h1>
                        <button type="button" className="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
                    </div>
                    <div className="modal-body">
                        <form className='postForm' onSubmit={postHandle}>
                            <div className='postDiv'>
                                <div className='postDetailHeading'>Name :</div>
                                <input type='text' placeholder='Property Name' required className='postInput' ref={propertyName} />
                            </div>
                            <div className='postDiv'>
                                <div className='postDetailHeading'>Address :</div>
                                <input type='text' placeholder='Address' required className='postInput' ref={propertyAddress} />
                            </div>
                            <div className='postDiv'>
                                <div className='postDetailHeading'>City :</div>
                                <input type='text' placeholder='City' required className='postInput' ref={city} />
                            </div>
                            <div className='postDiv'>
                                <div className='postDetailHeading'>About :</div>
                                <textarea placeholder='About' required className='postInput postTextArea' ref={propertyAbout} />
                            </div>
                            <div className='postDiv'>
                                <div className='postDetailHeading'>Amenities :</div>
                                <Select
                                    className='selectInput'
                                    options={amenitiesOption}
                                    placeholder="Amenities"
                                    value={selectedAmenitiesOptions}
                                    onChange={handleAmenitiesSelect}
                                    isSearchable={true}
                                    isMulti
                                />
                            </div>
                            <div className='postDiv'>
                                <div className='postDetailHeading'>Gender :</div>
                                <Select
                                    className='selectInput'
                                    options={genderOptions}
                                    placeholder="Gender"
                                    value={selectedGenderOptions}
                                    onChange={handleGenderSelect}
                                // isSearchable={true}
                                />
                            </div>
                            <div className='postDiv ratingDiv'>
                                <div className='postDetailHeading ratingHeading'>Ratings :</div>
                                <div className='differentRating'>
                                    <div className='insideRating'>Cleanliness : <input type='number' required className='postInput ratingInput' min={0} max={5} ref={cleanRating} /></div>
                                    <div className='insideRating'>Food Quality : <input type='number' required className='postInput ratingInput' min={0} max={5} ref={foodRating} /></div>
                                    <div className='insideRating'>Safety : <input type='number' required className='postInput ratingInput' min={0} max={5} ref={safetyRating} /></div>
                                </div>
                            </div>
                            <div className='postDiv'>
                                <div className='postDetailHeading'>Rent : </div>
                                <input type='number' required className='postInput rentInput' min={0} max={100000000} ref={propertyRent} />
                            </div>
                            <div className=''>
                                <div className='postDetailHeading'>Photos :</div>
                                <div>
                                    {file.length > 0 &&
                                        file.map((item, index) => {
                                            return (
                                                <div className='shareImgContainer'>
                                                    <img className='shareImg' src={item.url} alt='' />
                                                    <Cancel className='shareCancelImg' onClick={(event) => deleteFile(event, index)} />
                                                </div>
                                            )
                                        })
                                    }
                                </div>
                                <div >
                                    <label htmlFor='file' className='shareOption'>
                                        <PermMedia htmlColor="red" className='shareIcon' />
                                        <span className='shareOptionText'>Photos</span>
                                        <input style={{ display: 'none' }} type='file' id='file' accept='.png,.jpeg,.jpg' onChange={uploadSingleFile} />
                                    </label>
                                </div>
                            </div>
                            <button type='submit' className='postButton'>post</button>
                        </form>
                    </div>
                </div>
            </div>
        </div>
    )
}

export default PostModal