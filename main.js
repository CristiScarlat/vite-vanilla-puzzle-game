import './styles.css'
import { getImgFromPexels } from './pexels';
import { loadImg } from "./image.js";
import { fisherYatesShuffle } from "./utils.js";

window.addEventListener('load', async () => {
  Array.prototype.shuffle = function () {return fisherYatesShuffle(this);}
  window.indexesToSwapp = [];
  window.noOfSwapps = 0;
  let index = 0;
  let photo = null;
  try{
    photo = await getImgFromPexels(index);
    console.log(photo)
  }
  catch (e) {
    alert("There was a problem getting image from Pexels, please try again later.");
  }
  const swappsContainer = document.querySelector('span[data-swapps]');
  swappsContainer.innerText = window.noOfSwapps;
  const imageContainer = document.getElementById("pexels-photo");
  const piecesContainer = document.querySelector('.puzzle-pieces');
  const prevImgBtn = document.querySelector('button[data-prev-btn]');
  const nextImgBtn = document.querySelector('button[data-next-btn]');
  const collpaseImageBtn = document.querySelector('button[data-bs-toggle="collapse"]')
  const collapsedImageContainer = document.getElementById('collapseOriginalImage');
  const photoInfoContainer = document.querySelector('.pexels-photo-info');
  const photographer = document.createElement("strong");
  photographer.innerHTML = `<span class="me-2">Photo by:</span>${photo.photographer}`;
  photoInfoContainer.append(photographer);
  imageContainer.src = photo.src.large;
  imageContainer.onload = () => loadImg(imageContainer, piecesContainer)
  const handleMutationChange = (par) => {
    if(par[par.length - 1]?.target?.classList.contains("show")){
      collpaseImageBtn.innerText = "Hide Image"
    }
    else {
      collpaseImageBtn.innerText = "Show Image"
    }
  }
  const observer = new MutationObserver(handleMutationChange);
  observer.observe(collapsedImageContainer, { attributes: true })
  prevImgBtn.onclick = async() => {
    if(index===0)return;
    if(!collapsedImageContainer.classList.contains("show"))collapsedImageContainer.classList.add("show");
    index--;
    photo = await getImgFromPexels(index);
    photographer.innerHTML = `<span class="me-2">Photo by:</span>${photo.photographer}`;
    imageContainer.src = photo.src.large;
    piecesContainer.innerHTML = "";
    imageContainer.onload = () => loadImg(imageContainer, piecesContainer);
    window.noOfSwapps = 0;
    swappsContainer.innerText = window.noOfSwapps;
  }
  nextImgBtn.onclick = async() => {
    if(!collapsedImageContainer.classList.contains("show"))collapsedImageContainer.classList.add("show");
    index++;
    photo = await getImgFromPexels(index);
    photographer.innerHTML = `<span class="me-2">Photo by:</span>${photo.photographer}`;
    imageContainer.src = photo.src.large;
    piecesContainer.innerHTML = "";
    imageContainer.onload = () => loadImg(imageContainer, piecesContainer);
    window.noOfSwapps = 0;
    swappsContainer.innerText = window.noOfSwapps;
  }
})



