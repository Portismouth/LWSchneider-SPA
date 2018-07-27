const initial = {
  index: 0
}

export default (state = initial, action) => {
  switch (action.type) {
    case 'SET_PANEL':
      return {
        ...state,
        index: action.index
      }
    default:
      return state
  }
}