import { useEffect } from "react"
import { useDispatch, useSelector } from "react-redux"
import { useParams } from "react-router-dom"
import { fetchSpot } from "../../store/spots"


const SpotDetail = () => {
    const { spotId } = useParams()
    const spot = useSelector(state => state.spots[spotId])
    const dispatch = useDispatch()
    console.log(spot)

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

            </div>
        </div>
    )
}

export default SpotDetail
