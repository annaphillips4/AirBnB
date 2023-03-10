import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSpotReviews } from "../../store/reviews"

const SpotReviews = () => {
    const { spotId } = useParams()
    const reviews = useSelector(state => state.reviews)
    const user = useSelector(state => state.session.user)
    const dispatch = useDispatch()
    console.log(Object.values(reviews).length)

    useEffect(() => {
        dispatch(fetchSpotReviews(spotId))
    }, [dispatch])

    return (
        <div>
            <button>Post a review</button>
            {Object.values(reviews).length
                ? Object.values(reviews).map(rev => {return <p key={rev.id}>{rev.review}</p>})
                : <p>Be the first to leave a review!</p>}
        </div>
    )
}

export default SpotReviews
