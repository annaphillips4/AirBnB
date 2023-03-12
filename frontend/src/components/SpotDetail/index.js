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

    useEffect(() => {
        if (!spot) {
            dispatch(fetchSpot(spotId))
        }
    }, [dispatch])

    return (
        <div className='container'>
            <div className='gallery'>
                {spot?.SpotImages && spot?.SpotImages.map((img, i) => {
                    return <img className={`box${i}`} key={img.id} src={img.url}/>
                })}
            </div>
            <div className="info">
                <h1>{spot?.name} hosted by {spot?.Owner?.firstName} {spot?.Owner?.lastName}</h1>
                <p>{spot?.description}</p>
            </div>
            <div className='detailscard'>
                <p>${spot?.price} night</p>
                {
                    reviewCount === 0 ?
                    <p><i className="fa-solid fa-star"></i> New</p> :
                    <p><i className="fa-solid fa-star"></i> {spot?.avgRating.toFixed(2)} · {reviewCount} {reviewCount > 1 ? 'Reviews' : 'Review'}</p>
                }
            </div>
            <div className="review-container">
                {
                    reviewCount === 0 ?
                    <p><i className="fa-solid fa-star"></i> New</p> :
                    <p><i className="fa-solid fa-star"></i> {spot?.avgRating.toFixed(2)} · {reviewCount} {reviewCount > 1 ? 'Reviews' : 'Review'}</p>
                }
                <SpotReviews />
            </div>
        </div>
    )
}

export default SpotDetail
