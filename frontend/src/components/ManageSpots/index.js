import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchUserSpots } from '../../store/spots'
import { Link, useHistory } from 'react-router-dom'
import OpenModalButton from '../OpenModalButton'
import ConfirmDeleteModal from '../ConfirmDeleteModal'
import SpotTile from '../SpotTile'
import './ManageSpots.css'

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
            <h1>Manage Spots</h1>
            {!Object.values(spots) ?
                <Link to='/spots/new'>Create a New Spot</Link>
                :
                <ul>
                    {
                        Object.values(spots).map(spot => (
                            <div className='manage-tiles' key={spot.id}>
                                <Link to={`/spots/${spot.id}`} key={spot.id}>
                                <SpotTile spot={spot} />
                                </Link>
                                <br/>
                                <button onClick={()=>{handleUpdate(spot.id)}}>Update</button>
                                <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<ConfirmDeleteModal spotId={spot.id} />}
                                />
                            </div>
                        ))
                    }
                </ul>
            }
        </div>
    )
}

export default ManageSpotsIndex
