const express = require("express");
const AuthRoutes = require("../modules/auth/auth.routes");
const UserRoutes = require("../modules/User/user.routes");
const PostRoutes = require("../modules/posts/post.routes");
const CommentRoutes = require("../modules/comments/comment.routes");
const ReplyCommentRoutes = require("../modules/reply_comment/reply_comment.routes");
const ReactionRoutes = require("../modules/reactions/reactions.routes");

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
  {
    path: "/comment",
    route: CommentRoutes,
  },
  {
    path: "/reply-comment",
    route: ReplyCommentRoutes,
  },
  {
    path: "/reaction",
    route: ReactionRoutes,
  },
];

routes.forEach((route) => router.use(route.path, route.route));

module.exports = router;
