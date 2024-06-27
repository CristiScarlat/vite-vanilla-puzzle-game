import './styles.css'
import { getImgFromPexels } from './pexels';
import {loadImg} from "./image.js";
import {fisherYatesShuffle} from "./utils.js";

window.addEventListener('load', async () => {
  Array.prototype.shuffle = function () {return fisherYatesShuffle(this);}
  let index = 0;
  let photo = await getImgFromPexels(index);
  const imageContainer = document.getElementById("pexels-photo");
  const piecesContainer = document.querySelector('.puzzle-pieces');
  const prevImgBtn = document.querySelector('button[data-prev-btn]');
  const nextImgBtn = document.querySelector('button[data-next-btn]');
  imageContainer.src = photo
  imageContainer.onload = () => loadImg(imageContainer, piecesContainer)
  prevImgBtn.onclick = async() => {
    if(index===0)return;
    console.log("start")
    index--;
    photo = await getImgFromPexels(index);
    imageContainer.src = photo
    piecesContainer.innerHTML = ""
    imageContainer.onload = () => loadImg(imageContainer, piecesContainer)
  }
  nextImgBtn.onclick = async() => {
    index++;
    console.log("start")
    photo = await getImgFromPexels(index);
    imageContainer.src = photo
    piecesContainer.innerHTML = ""
    imageContainer.onload = () => loadImg(imageContainer, piecesContainer)
  }
})



