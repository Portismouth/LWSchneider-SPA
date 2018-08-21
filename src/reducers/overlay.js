const initial = {
  image: null,
  video: null
}

export default (state = initial, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.image
      }
    case 'SET_VIDEO':
      return {
        ...state,
        video: action.video
      }
    default:
      return state
  }
}