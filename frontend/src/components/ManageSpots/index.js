import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserSpots } from '../../store/spots'
import { Link, useHistory } from 'react-router-dom'

const ManageSpotsIndex = () => {
    const spots = useSelector(state => state.spots)
    const dispatch = useDispatch()
    const history = useHistory()

    useEffect(() => {
        dispatch(fetchUserSpots())
    }, [dispatch])

    const handleUpdate = (spotId) => {
        history.push(`/spots/${spotId}/edit`)
    }

    const handleDelete = () => {}

    return (
        <div>
            <ul>
                {
                    Object.values(spots).map(spot => (
                        <div>
                            <Link to={`/spots/${spot.id}`} key={spot.id}>
                            <li key={spot.id}>
                                {spot.name} Rating: {spot.avgRating}
                            </li>
                            </Link>
                            <button onClick={()=>{handleUpdate(spot.id)}}>Update</button>
                            <button onClick={handleDelete}>Delete</button>
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default ManageSpotsIndex
