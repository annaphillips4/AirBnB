import { csrfFetch } from "./csrf";

const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_SPOT = 'spots/LOAD_SPOT'
const LOAD_USER_SPOTS = 'spots/LOAD_USER_SPOTS'
const ADD_SPOT = 'spots/ADD_SPOT'
const UPDATE_SPOT = 'spots/UPDATE_SPOT'
const DELETE_SPOT = 'spots/DELETE_SPOT'

// action handlers
export const fetchSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots')

    if (response.ok) {
        const payload = await response.json();
        dispatch(loadSpots(payload.Spots))
    }
}
export const fetchSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`)

    if (response.ok) {
        const payload = await response.json()
        dispatch(loadSpot(payload))
        return payload
    }
}
export const fetchUserSpots = () => async dispatch => {
    const response = await csrfFetch('/api/spots/current')

    if(response.ok) {
        const payload = await response.json();

        dispatch(loadUserSpots(payload.Spots))
    }
}
export const postSpot = (payload) => async dispatch => {

    const response = await csrfFetch(`/api/spots`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(addSpot(spot))
        return spot
    }
}
export const putSpot = (payload) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${payload.id}`, {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(payload)
    })

    if (response.ok) {
        const spot = await response.json()
        dispatch(updateSpot(spot))
        return spot
    }
}
export const deleteSpot = (spotId) => async dispatch => {
    const response = await csrfFetch(`/api/spots/${spotId}`, {
        method: 'DELETE',
    });

    if (response.ok) {
        const spot = await response.json();
        dispatch(killSpot(spot))
        return spot;
    }
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
export const loadUserSpots = spots => ({
    type: LOAD_USER_SPOTS,
    spots
})
export const addSpot = spot => ({
    type: ADD_SPOT,
    spot
})
export const updateSpot = spot => ({
    type: UPDATE_SPOT,
    spot
})
export const killSpot = spot => ({
    type: DELETE_SPOT,
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
        case UPDATE_SPOT:
        case ADD_SPOT:
        case LOAD_SPOT:
            return {...state, [action.spot.id]: action.spot}
        case LOAD_USER_SPOTS:
            const allSpots = {};
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot;
            })
            return { ...allSpots }
        case DELETE_SPOT:
            const newState = {...state};
            delete newState[action.spot.id]
            return newState

        default:
            return state
    }
}
