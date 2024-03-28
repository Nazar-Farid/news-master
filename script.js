const API_KEY = "60d4f957fdf540049d8096b4b7863f58";
const url = "https://newsapi.org/v2/everything?q";

window.addEventListener('load', () => fetchNews('Pakistan'));

function reload(){
  window.location.reload();
}

async function fetchNews(query) {
  const res = await fetch(`${url}=${query}&apiKey=${API_KEY}`);

  const data = await res.json();
  bindData(data.articles);
}

function bindData(articles) {
  const cardsContainer = document.getElementById('cards-container');
  const newsCardtemplate = document.getElementById('template-news-card');
  cardsContainer.innerHTML = '';

  articles.forEach(article => {
    if (!article.urlToImage) return;
    const cardClone = newsCardtemplate.content.cloneNode(true);
    fillDataInCard(cardClone, article);
    cardsContainer.appendChild(cardClone);
  });
}

function fillDataInCard(cardClone, article) {
  const newsImg = cardClone.querySelector('#news-img');
  const newsTitle = cardClone.querySelector('#news-title');
  const newsSource = cardClone.querySelector('#news-source');
  const newsDesc = cardClone.querySelector('#news-desc');

  
  // Check if elements were found before setting properties
  if (newsImg) {
    newsImg.src = article.urlToImage;
  }
  if (newsTitle) {
    newsTitle.innerHTML = article.title;
  }
  if (newsDesc) {
    newsDesc.innerHTML = article.description;
  }
  const date=new Date(article.publishedAt).toLocaleString("en-US" ,{
    timeZone:"Asia/Jakarta"
    
      });
  newsSource.innerHTML=`${article.source.name} . ${date}`;
  cardClone.firstElementChild.addEventListener("click", ()=>{
window.open(article.url, "_blank");
  });
}
 let curSelectedNav=null;
  function onNavItemClick(id){
    fetchNews(id);

    const navItem=document.getElementById("id");
    curSelectedNav?.classList.remove("active");
    curSelectedNav.classList.add("active");
    }  

const searchbutton=document.getElementById("search-button");
const searchText=document.getElementById("search-text");

searchbutton.addEventListener('click',()=>{
const query=searchText.value;
if(!query) return;
fetchNews(query);
curSelectedNav?.classList.remove("active");
curSelectedNav=null;
} );