import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import { useModal } from "../../context/Modal"
import { deleteSpot, fetchUserSpots } from "../../store/spots";

function ConfirmDeleteModal({ spotId }) {
    const { closeModal } = useModal();
    const dispatch = useDispatch();
    const history = useHistory();

    const handleDelete = (e) => {
        e.preventDefault();
        dispatch(deleteSpot(spotId))
        history.go(0)

    }
    return (
        <>
            <h1>Confirm Delete</h1>
            <label>Are you sure you want to remove this spot from the listings?</label>
            <button onClick={handleDelete}>Yes (Delete Spot)</button>
            <button onClick={closeModal}>No (Keep Spot)</button>
            <form>

            </form>
        </>
    )
}

export default ConfirmDeleteModal
