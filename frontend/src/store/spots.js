const LOAD_SPOTS = 'spots/LOAD_SPOTS'
const LOAD_SPOT = 'spots/LOAD_SPOT'

// action handler
export const fetchSpots = () => async dispatch => {
    const response = await fetch('/api/spots')
    const payload = await response.json();
    dispatch(loadSpots(payload.Spots))
}
export const fetchSpot = (spotId) => async dispatch => {
    const response = await fetch(`/api/spots/${spotId}`)
    const payload = await response.json()
    dispatch(loadSpot(payload))
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

const initialState = {}

export const spotsReducer = (state = initialState, action) => {
    switch(action.type) {
        case LOAD_SPOTS:
            const allSpots = {};
            action.spots.forEach(spot => {
                allSpots[spot.id] = spot;
            })
            return {
                ...allSpots,
                ...state
            }
        case LOAD_SPOT:
            const newState = {...state}
            newState[action.spot.id] = action.spot
            return newState

        default:
            return state
    }
}
