export const setImage = (image, options) => ({
  type: 'SET_IMAGE',
  image,
  options: options || {}
})

export const setVideo = video => ({
  type: 'SET_VIDEO',
  video
})