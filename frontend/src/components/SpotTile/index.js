import './spotTile.css'

const SpotTile = ({ spot }) => {
    const rating = parseFloat(spot.avgRating).toFixed(2)
    return (
        <div className='tile'>
            <img className='tile-image' src={spot.previewImage} alt='spot' />
            <div className='tile-info'>
                <p className='tile-name'>{spot.city}, {spot.state}</p>
                <div className='tile-rating'>
                    {
                        parseFloat(spot.avgRating) === 0 ?
                            <p><i className="fa-solid fa-star"></i> New</p> :
                            <p><i className="fa-solid fa-star"></i> {rating}</p>
                    }
                </div>
            </div>
            <p className='spot-price'><b>${spot.price}</b> night</p>
        </div>
    )
}

export default SpotTile;
