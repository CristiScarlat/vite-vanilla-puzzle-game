
const cutImageUp = (image, piecesContainer, numColsToCut, numRowsToCut) => {
  const imagePieces = [];
  const widthOfOnePiece = image.width/numColsToCut;
  const heightOfOnePiece = image.height/numRowsToCut;

  for(let x = 0; x < numColsToCut; ++x) {
    for(let y = 0; y < numRowsToCut; ++y) {
      const canvas = document.createElement('canvas');
      canvas.width = widthOfOnePiece;
      canvas.height = heightOfOnePiece;
      const context = canvas.getContext('2d');
      context.drawImage(image, x * widthOfOnePiece, y * heightOfOnePiece, widthOfOnePiece, heightOfOnePiece, 0, 0, canvas.width, canvas.height);
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
export const loadImg = (image, piecesContainer) => {
  image.crossOrigin="anonymous"
  piecesContainer.style.width = image.width + "px";
  piecesContainer.style.height = image.height + "px";
  const shuffledImages = cutImageUp(image, piecesContainer, 8, 8);
  renderPuzzle(shuffledImages, piecesContainer)
}
