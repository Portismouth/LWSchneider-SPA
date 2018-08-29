export const preload = (images, counter) => {
  let index = counter || 0
  console.log('preloading ' + images[index])
  let img = new Image()
  if (images.length > index + 1) img.onload = () => preload(images, index + 1)
  img.src = images[index]
}