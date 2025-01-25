import Home from "./routes/Home.svelte";
import Login from "./routes/Login.svelte";
import SignUp from "./routes/SignUp.svelte";
import Dashboard from "./routes/Dashboard.svelte";
import Profile from "./routes/Profile.svelte";
import ProfileSettings from "./routes/ProfileSettings.svelte";
import LearningModule from "./routes/LearningModule.svelte";
import TrendingPaths from "./routes/TrendingPaths.svelte";
import ForgotPassword from "./routes/ForgotPassword.svelte";
import NotFound from "./routes/NotFound.svelte";
import LinkedInCallback from "./routes/LinkedInCallback.svelte";

export const routes = {
  "/": Home,
  "/login": Login,
  "/signup": SignUp,
  "/dashboard": Dashboard,
  "/profile": Profile,
  "/profile-settings": ProfileSettings,
  "/learning-module/:id": LearningModule,
  "/learning-paths": TrendingPaths,
  "/forgot-password": ForgotPassword,
  "/linkedin-callback": LinkedInCallback,
  "*": NotFound,
};
