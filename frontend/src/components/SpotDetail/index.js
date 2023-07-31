import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSpot } from "../../store/spots"
import SpotReviews from "../SpotReviews"
import './SpotDetail.css'

const SpotDetail = () => {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[spotId])
    const reviewCount = Object.values(useSelector(state => state.reviews)).length;
    const dispatch = useDispatch()
    const rating = parseFloat(spot?.avgRating).toFixed(2)

    useEffect(() => {
        dispatch(fetchSpot(spotId))
    }, [dispatch])

    return (
        <div className='container'>
            <h1>{spot?.name}</h1>
            <p className="heading-info"><i className="fa-solid fa-star" /> {rating} · <a href="#reviews">{reviewCount} {reviewCount > 1 ? 'Reviews' : 'Review'}</a> · {spot.city}, {spot.state}, {spot.country}</p>
            <div className='gallery'>
                {spot?.SpotImages && spot?.SpotImages.map((img, i) => {
                    if (i === 0) {
                        return <div key={img.id} className='preview'><img src={img.url} alt={`Preview Image ${i}`} /></div>;
                    } else {
                        return <div key={img.id} className='image'><img src={img.url} alt={`Image ${i}`} /></div>;
                    }
                })}
            </div>
            <div className="spot-details">
                <div className="info">
                    <h1>Hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h1>
                    <p>{spot?.description}</p>
                </div>

                <div className='card-column'>
                    <div className="card">
                        <p><em>${spot?.price}</em> night</p>
                        {
                            reviewCount === 0 ?
                                <p><i className="fa-solid fa-star"></i> New</p> :
                                <p><i className="fa-solid fa-star"></i> {rating} · {reviewCount} {reviewCount > 1 ? 'Reviews' : 'Review'}</p>
                        }
                    </div>
                </div>
            </div>
                <div className="review-container" id="reviews">
                    {
                        reviewCount === 0 ?
                            <p><i className="fa-solid fa-star"></i> New</p> :
                            <p><i className="fa-solid fa-star"></i> {rating} · {reviewCount} {reviewCount > 1 ? 'Reviews' : 'Review'}</p>
                    }
                    <SpotReviews />
                </div>
        </div>
    )
}

export default SpotDetail
