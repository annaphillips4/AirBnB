import './spotTile.css'

const SpotTile = ({ spot }) => {
    const rating = parseFloat(spot.avgRating).toFixed(2)
    // console.log(rating)
    return (
        <div className='tile'>
            <img className='tile-image' src={spot.previewImage} alt='spot'/>
            <div className='spot-info'>
                <p className='tile-name'>{spot.city}, {spot.state}< br/><b>${spot.price}</b> night</p>
            </div>
            <div className='tile-rating'>
                {
                    parseFloat(spot.avgRating) === 0 ?
                    <p><i className="fa-solid fa-star"></i> New</p> :
                    <p><i className="fa-solid fa-star"></i> {rating}</p>
                }
            </div>
        </div>
    )
}

export default SpotTile;
