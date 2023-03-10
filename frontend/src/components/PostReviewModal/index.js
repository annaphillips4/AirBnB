import { useEffect, useState } from "react";
import { useDispatch } from "react-redux";
import { useModal } from "../../context/Modal"


function PostReviewModal() {
    const { closeModal } = useModal();
    const dispatch = useDispatch();

    const [validationErrors, setValidationErrors] = useState([]);
    const [hasSubmitted, setHasSubmitted] = useState(false);
    const [reviewBody, setReviewBody] = useState('');
    const [stars, setStars] = useState(0);

    const updateReviewBody = (e) => setReviewBody(e.target.value);
    const updateStars = (e) => setStars(e.target.value);

    useEffect(() => {
        const errors = [];
        if(!reviewBody.length) errors.push('Review text is required')
    })

    return (
        <>
            <h1>How was your stay?</h1>
            <form>

            </form>
        </>
    )
}

export default PostReviewModal
