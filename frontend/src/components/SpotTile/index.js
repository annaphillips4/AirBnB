import './spotTile.css'

const SpotTile = ({ spot }) => {
    console.log(spot)
    return (
        <div className='tile'>
            <img className='tile-image' src={spot.previewImage} alt='spot'/>
            <div className='spot-info'>
                <p className='tile-name'>{spot.city}, {spot.state}< br/><b>${spot.price}</b> night</p>
            </div>
            <div className='tile-rating'>
            <i class="fa-solid fa-star"></i> {spot.avgRating.toFixed(2)}
            </div>
        </div>
    )
}

export default SpotTile;
