const initial = {
  image: null,
  video: null,
  options: {}
}

export default (state = initial, action) => {
  switch (action.type) {
    case 'SET_IMAGE':
      return {
        ...state,
        image: action.image,
        options: action.options
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