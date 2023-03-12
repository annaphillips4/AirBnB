import './ReviewTile.css'

const ReviewTile = ({rev}) => {
    const year = rev.createdAt.slice(0,4)
    let monthLetArr = ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'Septemper', 'October', 'November', 'December']
    let month;
    // console.log(rev.createdAt.slice(6,7))
    if (rev.createdAt.slice(5,6) === '0') {
        month = monthLetArr[rev.createdAt.slice(6,7)-1]
    } else {
        month = monthLetArr[rev.createdAt.slice(5,7)-1]
    }

    // console.log(month)

    return (
        <div className="review-tile">
            <p><b>{rev.User.firstName}</b><br />{month} {year}<br />{rev.review}</p>
        </div>
    )
}

export default ReviewTile
