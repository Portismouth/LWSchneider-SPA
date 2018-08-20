const initial = {
  index: 0,
  image: null
}

export default (state = initial, action) => {
  switch (action.type) {
    case 'SET_PANEL':
      return {
        ...state,
        index: action.index
      }
    case 'SET_BACKGROUND':
      return {
        ...state,
        image: action.image
      }
    default:
      return state
  }
}