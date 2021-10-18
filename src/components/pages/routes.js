import { wrap } from "svelte-spa-router/wrap";
import Boards from "./Boards.svelte";
import Home from "./Home.svelte";
import Products from "./Products.svelte";
import SingleProduct from "./SingleProduct.svelte";
import Profile from "./Profile.svelte";

/* Lazy Loading
export const routes = {
  "/products": wrap({
    asyncComponent: () => import("./Products.svelte"),
  }),
  "/boards": wrap({
    asyncComponent: () => import("./Boards.svelte"),
  }),
  "/profile": wrap({
    asyncComponent: () => import("./Profile.svelte"),
  }),
};
*/
export const routes = {
  "/": wrap({
    component: Home,
  }),
  "/products": wrap({
    component: Products,
  }),
  "/products/:id": wrap({
    component: SingleProduct,
  }),
  "/categories": wrap({
    component: Boards,
  }),
  "/profile": wrap({
    component: Profile,
  }),
};
