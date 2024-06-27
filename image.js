
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
  piecesContainer.style = `
    display: grid;
    gap: 0.1rem;
    grid-template-columns: ${widthOfOnePiece}px ${widthOfOnePiece}px ${widthOfOnePiece}px ${widthOfOnePiece}px ${widthOfOnePiece}px ${widthOfOnePiece}px ${widthOfOnePiece}px ${widthOfOnePiece}px;
    grid-template-rows: ${heightOfOnePiece}px ${heightOfOnePiece}px ${heightOfOnePiece}px ${heightOfOnePiece}px ${heightOfOnePiece}px ${heightOfOnePiece}px ${heightOfOnePiece}px ${heightOfOnePiece}px;`
    imagePieces.shuffle().forEach((image, index) => {
    const img = document.createElement('img');
    img.crossOrigin="anonymous"
    img.src = image;
    piecesContainer.append(img)
  })
}

export const loadImg = (image, piecesContainer) => {
  image.crossOrigin="anonymous"
  cutImageUp(image, piecesContainer, 8, 8);
  console.log("end")
}
