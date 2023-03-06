import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserSpots } from '../../store/spots'
import { Link, useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import ConfirmDeleteModal from '../ConfirmDeleteModal'

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
                            <OpenModalButton
                                buttonText="Delete"
                                modalComponent={<ConfirmDeleteModal spotId={spot.id} />}
                            />
                        </div>
                    ))
                }
            </ul>
        </div>
    )
}

export default ManageSpotsIndex
