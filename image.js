
const cutImageUp = (image, piecesContainer, numColsToCut, numRowsToCut) => {
  const imagePieces = [];
  const { width, height} = image.getBoundingClientRect();
  const widthOfOnePiece = width/numColsToCut;
  const heightOfOnePiece = height/numRowsToCut;

  for(let y = 0; y < numRowsToCut; ++y) {
    for(let x = 0; x < numColsToCut; ++x) {
      const canvas = document.createElement('canvas');
      canvas.width = widthOfOnePiece;
      canvas.height = heightOfOnePiece;
      const context = canvas.getContext('2d');
      context.drawImage(image, x * (image.naturalWidth/numColsToCut), y * (image.naturalHeight/numRowsToCut), image.naturalWidth/numColsToCut, image.naturalHeight/numRowsToCut, 0, 0, widthOfOnePiece, heightOfOnePiece);
      imagePieces.push(canvas.toDataURL());
    }
  }
  return imagePieces.shuffle();
}

const renderPuzzle = (photos, piecesContainer) => {
  piecesContainer.innerHTML = "";
    photos.forEach((image, index, arr) => {
      const img = document.createElement('img');
      img.crossOrigin="anonymous"
      img.src = image;
      img.addEventListener("click", () => handleSwapp(arr, index, piecesContainer))
      piecesContainer.append(img)
    })
}

const handleSwapp = (photos, index, container) => {
  if(indexesToSwapp.length < 2){
    indexesToSwapp.push(index);
    const images = container.getElementsByTagName("img");
    const list = Array.from(images);
    list[index].style.border = "2px solid red";
    list[index].style.width = `${list[index].width}px`;
  }
  if(indexesToSwapp.length === 2){
    const newList = Array.from(photos);
    const temp = newList[indexesToSwapp[0]]
    newList[indexesToSwapp[0]] = newList[indexesToSwapp[1]]
    newList[indexesToSwapp[1]] = temp
    indexesToSwapp = []
    window.noOfSwapps++;
    const swappsContainer = document.querySelector('span[data-swapps]');
    swappsContainer.innerText = window.noOfSwapps;
    renderPuzzle(newList, container)
  }
}
export const loadImg = (piecesContainer) => {
  const image = document.getElementById("pexels-photo");
  const { width, height} = image.getBoundingClientRect();
  image.crossOrigin="anonymous";
  piecesContainer.style.width = width + "px";
  piecesContainer.style.height = height + "px";
  const shuffledImages = cutImageUp(image, piecesContainer, 8, 8);
  renderPuzzle(shuffledImages, piecesContainer)
}
