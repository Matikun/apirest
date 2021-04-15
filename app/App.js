import { Loader } from "./componets/loader.js";
import { Header } from "./componets/Header.js";
import { Main} from "./componets/Main.js";
import { Router } from "./componets/Router.js";
import { InfiniteScroll } from "./helpers/infinite_scroll.js";

export function App () {
   const $root = document.getElementById("root");

  $root.innerHTML = null;
  $root.appendChild(Header())
  $root.appendChild(Main())
  $root.appendChild(Loader())


  Router()
  InfiniteScroll()
};