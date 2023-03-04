import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_SPOT = 'spots/LOAD_SPOT'
const CREATE_SPOT = 'spots/CREATE_SPOT'

// action handlers
export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')
    const payload = await response.json();
    dispatch(loadSpots(payload.Spots))
}
export const fetchSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)
    const payload = await response.json()
    dispatch(loadSpot(payload))
}
export const postSpot = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })
    const spot = await response.json()
    dispatch(createSpot(spot))
    return spot
}

// actions
export const loadSpots = spots => ({
    type: LOAD_SPOTS,
    spots
})
export const loadSpot = spot => ({
    type: LOAD_SPOT,
    spot
})
export const createSpot = spot => ({
    type: CREATE_SPOT,
    spot
})

const initialState = {}

export const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS:{
            const allSpots = {};
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot;
            })
            return {
                ...allSpots,
                ...state
            }}
        case LOAD_SPOT:{
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState}
        case CREATE_SPOT: {
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState
        }

        default:
            return state
    }
}
