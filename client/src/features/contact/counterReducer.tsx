// Example for Redux
export const INCREMENT_COUNTER = "INCREMENT_COUNTER"; // action type
export const DECREMENT_COUNTER = "DECREMENT_COUNTER"; // action type

export interface CounterState {
    data: number;
    title: string;
}

const initialState: CounterState = {
    data: 42,
    title: 'YARC (Yet Another Redux Counter)'
}

export function increment(amount = 1) {
    return {
        type: INCREMENT_COUNTER,
        payload: amount // argument
    }
}

export function decrement(amount = 1) {
    return {
        type: DECREMENT_COUNTER,
        payload: amount // argument
    }
}

export default function counterReducer(state = initialState, action: any) {
    switch (action.type) {
        case INCREMENT_COUNTER:
            return {
                ...state, // keeps copies of prev state
                data: state.data + action.payload // state.data + 1  
            }
        case DECREMENT_COUNTER:
            return {
                ...state, // keeps copies of prev state
                data: state.data - action.payload
            }
        default: 
            return state;       
    }
}