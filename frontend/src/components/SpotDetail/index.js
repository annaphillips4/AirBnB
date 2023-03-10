import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSpot } from "../../store/spots"
import SpotReviews from "../SpotReviews"


const SpotDetail = () => {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[spotId])
    const dispatch = useDispatch()

    useEffect(() => {
        if (!spot) {
            dispatch(fetchSpot(spotId))
        }
    }, [dispatch])

    return (
        <div>
            <div>{spot?.id}:{spot?.name}
            </div>
            <div>
                {spot?.SpotImages && spot?.SpotImages.map(img => {
                    return <img key={img.id} src={img.url}/>
                })}
            </div>
            <SpotReviews />
        </div>
    )
}

export default SpotDetail
