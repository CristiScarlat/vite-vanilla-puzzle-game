
let photosList = [];
let totalPhotos = 0;
const perPage = 80;
let prevPage = 1;
export const getImgFromPexels = async (photoIndex) => {
  if(photoIndex === totalPhotos-1)return
  const page = Math.ceil((photoIndex+1)/perPage);
  let arrIdx = photoIndex-(perPage*(page-1));
  if(photosList.length === 0 || page !== prevPage){
    prevPage = page;
    const pexelsResObj = await getPexelsCuratedPhotos(page);
    totalPhotos = pexelsResObj.total_results;
    photosList = pexelsResObj.photos
  }
  return photosList[arrIdx];
}

const getPexelsCuratedPhotos = async (page) => {
  const apiRes = await fetch(`https://api.pexels.com/v1/curated?page=${page}&per_page=80`, {
    headers: {
      'Authorization': import.meta.env.VITE_PEXELS_KEY
    }
  });
  const pexelsData = await apiRes.json();
  return pexelsData;
}