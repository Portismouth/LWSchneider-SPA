export const setImage = (image, options) => ({
  type: 'SET_IMAGE',
  image,
  options: options || {}
})

export const setGallery = (images, options) => ({
  type: 'SET_GALLERY',
  images,
  options: options || {}
})

export const setVideo = (video, options) => ({
  type: 'SET_VIDEO',
  video,
  options: options || {}
})