import { csrfFetch } from "./csrf"

const LOAD_SPOT_REVIEWS = 'reviews/LOAD_SPOT_REVIEWS'

// action handlers
export const fetchSpotReviews = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}/reviews`)

    if (response.ok) {
        const payload = await response.json();
        dispatch(loadSpotReviews(payload.Reviews))
    }
}

// actions
export const loadSpotReviews = reviews => ({
    type: LOAD_SPOT_REVIEWS,
    reviews
})

const initialState = {}

export const reviewsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOT_REVIEWS:
            const allReviews = {};
            if(!action.reviews) return allReviews
            action.reviews.forEach(review => {
                allReviews[review.id] = review;
            })
            return allReviews
        default:
            return state
    }
}
