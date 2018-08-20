const initial = {
  image: null
}

export default (state = initial, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.image
      }
    default:
      return state
  }
}