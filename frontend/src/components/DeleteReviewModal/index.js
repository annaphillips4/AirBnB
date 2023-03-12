import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal"
import { deleteReview } from "../../store/reviews";
import { deleteSpot, fetchUserSpots } from "../../store/spots";

function DeleteReviewModal({ revId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = async (e) => {
        e.preventDefault();
        await dispatch(deleteReview(revId))
        .then(closeModal())
        // history.go(0)

    }
    return (
        <div className="modal">
            <h1 className="form-header">Confirm Delete</h1>
            <label>Are you sure you want to delete this review?</label>
            <button className="delete" onClick={handleDelete}>Yes (Delete Review)</button>
            <button className="modal-button" onClick={closeModal}>No (Keep Review)</button>
            <form>

            </form>
        </div>
    )
}

export default DeleteReviewModal
