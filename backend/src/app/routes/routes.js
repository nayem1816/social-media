const express = require("express");
const AuthRoutes = require("../modules/auth/auth.routes");
const UserRoutes = require("../modules/User/user.routes");
const PostRoutes = require("../modules/posts/post.routes");

const router = express.Router();

const routes = [
  {
    path: "/auth",
    route: AuthRoutes,
  },
  {
    path: "/user",
    route: UserRoutes,
  },
  {
    path: "/post",
    route: PostRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
