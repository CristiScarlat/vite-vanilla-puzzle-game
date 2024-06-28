import './styles.css'
import { getImgFromPexels } from './pexels';
import {loadImg} from "./image.js";
import {fisherYatesShuffle} from "./utils.js";

window.addEventListener('load', async () => {
  Array.prototype.shuffle = function () {return fisherYatesShuffle(this);}
  window.indexesToSwapp = [];
  window.noOfSwapps = 0;
  let index = 0;
  let photo = await getImgFromPexels(index);
  const swappsContainer = document.querySelector('span[data-swapps]');
  swappsContainer.innerText = window.noOfSwapps;
  const imageContainer = document.getElementById("pexels-photo");
  const piecesContainer = document.querySelector('.puzzle-pieces');
  const prevImgBtn = document.querySelector('button[data-prev-btn]');
  const nextImgBtn = document.querySelector('button[data-next-btn]');
  const collpaseImageBtn = document.querySelector('button[data-bs-toggle="collapse"]')
  const collapsedImageContainer = document.getElementById('collapseOriginalImage');
  imageContainer.src = photo
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
    if(!collapsedImageContainer.classList.contains("show"))collapsedImageContainer.classList.add("show")
    console.log("start")
    index--;
    photo = await getImgFromPexels(index);
    imageContainer.src = photo
    piecesContainer.innerHTML = ""
    imageContainer.onload = () => loadImg(imageContainer, piecesContainer)
    window.noOfSwapps = 0;
    swappsContainer.innerText = window.noOfSwapps;
  }
  nextImgBtn.onclick = async() => {
    if(!collapsedImageContainer.classList.contains("show"))collapsedImageContainer.classList.add("show")
    index++;
    console.log("start")
    photo = await getImgFromPexels(index);
    imageContainer.src = photo
    piecesContainer.innerHTML = ""
    imageContainer.onload = () => loadImg(imageContainer, piecesContainer)
    window.noOfSwapps = 0;
    swappsContainer.innerText = window.noOfSwapps;
  }
})



