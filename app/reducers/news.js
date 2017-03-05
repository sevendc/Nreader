import * as types from './actions';

const initialState = {
  news: null
};

export default function news(state = initialState, action = {}) {
  switch (action.type) {
    case types.SETNEWS:
      return Object.assign({}, this.state, { news: action.payload })
    default:
      return state;
  }
}
