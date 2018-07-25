/* actions */
const SET_DETAIL = 'ACTION/SET_DETAIL'

const INITIAL_STATE = {
    detail_id: 'new'
}


/* action creators*/
export function setDetail(id){
    return {
        type: SET_DETAIL,
        payload: id
    }
}

export default function reducer(state = INITIAL_STATE, action = {}) {
    switch (action.type) {
        case SET_DETAIL:
            return {
                ...state,
                detail_id : action.payload
            }
        default:
            return state
    }

}