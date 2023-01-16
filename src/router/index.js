import { createRouter, createWebHistory } from "vue-router";
import HomeView from "../views/HomeView.vue";
import NotFound from "../views/NotFound.vue";
import ShallNot from "../views/ShallNot.vue";
import ProfilePage from "../views/ProfilePage.vue";
import MainDash from "@/components/MainDash.vue";
import LogIn from "@/components/dialogs/LogIn.vue";
import SignUp from "@/components/dialogs/SignUp.vue";
import ForgotPassword from "@/components/dialogs/ForgotPassword.vue";
import DashBoard from "@/components/dialogs/DashBoard.vue";
import AddMovie from "@/components/dialogs/AddMovie.vue";
import EditQuote from "@/components/dialogs/EditQuote.vue";
import MovieList from "@/views/MovieList.vue";
import SingleMovie from "@/components/SingleMovie.vue";
import MoviesDash from "@/components/MoviesDash.vue";
import NewUsername from "@/components/dialogs/NewUsername.vue";
import NewPassword from "@/components/dialogs/NewPassword.vue";
import ProfileEmail from "@/components/ProfileEmail.vue";
import AddEmail from "@/components/dialogs/AddEmail.vue";
import AddSecondary from "@/components/dialogs/AddSecondary.vue";
import HomePage from "@/views/HomePage.vue";
import ThankYou from "@/components/dialogs/ThankYou.vue";

import axiosInstance from "@/config/axios/jwt-axios.js";
import { useAuthStore } from "@/stores/auth";
import { isAuthenticated } from "./guards";
import { isNotAuthenticated } from "./guards";
import RedirectComponent from "../views/RedirectComponent.vue";

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: "/verify-new-email",
      name: "verify-new-email",
      component: RedirectComponent,
    },
    {
      path: "/",
      name: "home",
      component: HomeView,
      children: [
        {
          path: "/login",
          name: "login",
          component: LogIn,
        },
        {
          path: "/sign-up",
          name: "sign-up",
          component: SignUp,
        },
        {
          path: "/forgot-password",
          name: "forgot-password",
          component: ForgotPassword,
        },
        {
          path: "/activated",
          name: "activated",
          component: ThankYou,
        },
      ],
      beforeEnter: isAuthenticated,
    },
    {
      path: "/newsfeed",
      name: "news",
      component: HomePage,
      beforeEnter: isNotAuthenticated,
      children: [
        {
          path: "/profile",
          name: "profile",
          component: ProfilePage,
          children: [
            {
              path: "",
              name: "profile-page",
              component: ProfileEmail,
            },
            {
              path: "username-edit",
              name: "username-edit",
              component: NewUsername,
            },
            {
              path: "password-update",
              name: "password-update",
              component: NewPassword,
            },
            {
              path: "add-emails",
              name: "add-emails",
              component: AddEmail,
            },
            {
              path: "add-secondary",
              name: "add-secondary",
              component: AddSecondary,
            },
          ],
          beforeEnter: isNotAuthenticated,
        },
        {
          path: "/newsfeed",
          name: "newsfeed",
          component: MainDash,
        },
        { path: "dashboard", name: "dashboard", component: DashBoard },
        {
          path: "/movie-list",
          name: "movie-list",
          component: MovieList,
          children: [
            {
              path: "movie/:id",
              name: "single-movie",
              component: SingleMovie,
              children: [
                {
                  path: "quote/:quoteID",
                  name: "single-quote",
                  component: EditQuote,
                },
              ],
            },
            {
              path: "",
              name: "dash",
              component: MoviesDash,
            },

            { path: "add-movie", name: "add-movie", component: AddMovie },
          ],
          beforeEnter: isNotAuthenticated,
        },
      ],
    },

    {
      path: "/:pathMatch(.*)",
      component: NotFound,
    },
    {
      path: "/forbidden",
      component: ShallNot,
    },
  ],
});

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();

  if (authStore.authenticated === null) {
    try {
      await axiosInstance.get(`${import.meta.env.VITE_API_BASE_URL}me`);
      authStore.authenticated = true;
    } catch (err) {
      authStore.authenticated = false;
    } finally {
      return next();
    }
  }
  return next();
});

export default router;
