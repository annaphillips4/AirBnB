import { useDispatch, useSelector } from 'react-redux'
import { useEffect } from 'react'
import { fetchSpots } from '../../store/spots'
import { Link } from 'react-router-dom'
import SpotTile from '../SpotTile'
import './spots.css'

const SpotsIndex = () => {
    const spots = useSelector(state => state.spots)
    const dispatch = useDispatch()

    useEffect(() => {
        dispatch(fetchSpots())
    }, [dispatch])

    return (
        <div className='spot-container'>
                {
                    Object.values(spots).map(spot => (
                        <Link to={`/spots/${spot.id}`} key={spot.id}>
                        <SpotTile spot={spot} />
                        </Link>
                    ))
                }
        </div>
    )
}

export default SpotsIndex
