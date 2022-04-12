import { updateImage } from '../../redux/action';

// @ts-ignore
export const flipCaptureImageUtil = (imageId, container, setCardImage) => {
  console.log('flip captured');
  // @ts-ignore
  const img: HTMLImageElement = document.getElementById(imageId);
  const canvas = document.createElement('canvas');
  canvas.width = container.width;
  canvas.height = container.height;
  const canvasContext = canvas.getContext('2d');
  if (canvasContext) {
    canvasContext.translate(container.width, container.width / container.height);
    canvasContext.scale(-1, 1);
    // @ts-ignore
    canvasContext.drawImage(img, 0, 0);
  }
  canvas.toBlob(blob => setCardImage(blob), 'image/jpeg', 1);
  
}
// @ts-ignore
export const flipUploadImageUtil = (imageId, setCardImage, dispatch) => {
  // @ts-ignore
  const img: HTMLImageElement = document.getElementById(imageId);
  const canvas = document.createElement('canvas');
  if (!img || !canvas) {
    return;
  }
  // @ts-ignore
  const width = img.naturalWidth;
  // @ts-ignore
  const height = img.naturalHeight;
  canvas.width = width;
  canvas.height = height;
  const canvasContext = canvas.getContext('2d');
  if (canvasContext) {
    canvasContext.translate(width, Math.round(width / height));
    canvasContext.scale(-1, 1);
    // @ts-ignore
    canvasContext.drawImage(img, 0, 0);
  }
  dispatch(updateImage(canvas.toDataURL('image/jpeg', 1.0)));
}