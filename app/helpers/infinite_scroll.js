import { PostCards } from "../componets/PostCard.js";
import { SearchCard } from "../componets/SearchCard.js";
import { ajax } from "./ajax.js";
import api from "./wp_api.js"

export async function InfiniteScroll() {
const d = document,
w = window;
let query= localStorage.getItem("wpSearch"),
  apiURL,
  Component;//high order component

  w.addEventListener("scroll", async e => {
    let {scrollTop,clientHeight,scrollHeight} = d.documentElement,
    {hash} = w.location;

    //console.log(scrollTop,clientHeight,scrollHeight, hash)
    if(scrollTop+clientHeight >= scrollHeight) {
      api.page ++;
      d.querySelector(".loader").style.display ="block"

      if(!hash || hash === "#/") {
        apiURL = `${api.POSTS}&page=${api.page}`
        Component= PostCards;
      }else if(hash.includes("#/search")){
          apiURL = `${api.SEARCH}${query}&page=${api.page}`
          Component = SearchCard;
      }else {
        return false;
      }
      await ajax({
        url:apiURL,
        cbSuccess:(posts) =>{
          console.log(posts)
          let html="";
          
          posts.forEach(post => html +=Component(post));
          d.getElementById("main").insertAdjacentHTML("beforeend", html)
          d.querySelector(".loader").style.display="none"
          
        }
      })
    }
  } )
}