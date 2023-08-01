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
        <h1 className="form">Manage your spots</h1>
            {!Object.values(spots) ?
                <Link to='/spots/new'>Create a New Spot</Link>
                :
                <div className='spot-container'>
                    {
                        Object.values(spots).map(spot => (
                            <div className='manage-tiles' key={spot.id}>
                                <Link to={`/spots/${spot.id}`} key={spot.id}>
                                    <SpotTile spot={spot} />
                                </Link>
                                <br />
                                <button className='manage-buttons' onClick={() => { handleUpdate(spot.id) }}>Update</button>
                                <span className='manage-modal'>
                                    <OpenModalButton
                                    buttonText="Delete"
                                    modalComponent={<ConfirmDeleteModal spotId={spot.id} />}
                                />
                                </span>
                            </div>
                        ))
                    }
                </div>
            }
        </div>
    )
}

export default ManageSpotsIndex
