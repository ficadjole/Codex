import express from "express";
import cors from "cors";

// Auth
import { IAuthService } from "./Domain/services/auth/IAuthService";
import { AuthService } from "./Services/auth/AuthService";
import { AuthController } from "./WebAPI/controllers/AuthController";

// Item
import { IItemService } from "./Domain/services/item/IItemService";
import { ItemService } from "./Services/item/ItemService";
import { ItemController } from "./WebAPI/controllers/ItemController";

// User
import { IUserService } from "./Domain/services/user/IUserService";
import { UserService } from "./Services/user/UserService";
import { UserController } from "./WebAPI/controllers/UserController";

// BlogPost
import { IBlogPostRepository } from "./Domain/repositories/IBlogPostRepository";
import { BlogPostRepository } from "./Database/repositories/blogPost/BlogPostRepository";
import { IBlogPostItemRepository } from "./Domain/repositories/IBlogPostItemRepository";
import { BlogPostItemRepository } from "./Database/repositories/blogPost/BlogPostItemRepository";
import { IBlogPostService } from "./Domain/services/blogPost/IBlogPostService";
import { BlogPostService } from "./Services/blogPost/BlogPostService";
import { BlogPostController } from "./WebAPI/controllers/BlogPostController";

// Comment
import { ICommentRepository } from "./Domain/repositories/ICommentRepository";
import { CommentRepository } from "./Database/repositories/comment/CommentRepository";
import { ICommentService } from "./Domain/services/comment/ICommentService";
import { CommentService } from "./Services/comment/CommentService";
import { CommentController } from "./WebAPI/controllers/CommentController";

// User Repository
import { IUserRepository } from "./Domain/repositories/IUserRepository";
import { UserRepository } from "./Database/repositories/UserRepository";

// Accessories
import { IAccessoryRepository } from "./Domain/repositories/IAccessoryRepository";
import { AccessoryRepository } from "./Database/repositories/accessory/AccessoryRepository";

// Genre
import { IGenreRepository } from "./Domain/repositories/IGenreRepository";
import { GenreRepository } from "./Database/repositories/genre/GenreRepository";

// BookGenre
import { IBookGenreRepository } from "./Domain/repositories/IBookGenreRepository";

// Book
import { IBookRepository } from "./Domain/repositories/IBookRepository";
import { BookRepository } from "./Database/repositories/book/BookRepository";

// Item
import { IItemRepository } from "./Domain/repositories/IItemRepository";
import { ItemRepository } from "./Database/repositories/item/ItemRepository";
import { BookGenreRepository } from "./Database/repositories/bookGenre/BookGenreRepository";
import { IGenreService } from "./Domain/services/genre/IGenreService";
import { GenreService } from "./Services/genre/GenreService";
import { GenreController } from "./WebAPI/controllers/GenreController";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

// --- User & Auth Setup ---

const userRepository: IUserRepository = new UserRepository();

const authService: IAuthService = new AuthService(userRepository);
const authController = new AuthController(authService);

const userService: IUserService = new UserService(userRepository);
const userController = new UserController(userService);

// --- Item Setup ---

const itemRepository: IItemRepository = new ItemRepository();
const bookRepository: IBookRepository = new BookRepository();
const bookGenreRepository: IBookGenreRepository = new BookGenreRepository();
const genreRepository: IGenreRepository = new GenreRepository();
const accessoryRepository: IAccessoryRepository = new AccessoryRepository();

const itemService: IItemService = new ItemService(
  itemRepository,
  bookRepository,
  genreRepository,
  bookGenreRepository,
  accessoryRepository,
);

const itemController = new ItemController(itemService);

// --- BlogPost Setup ---

const blogPostRepository: IBlogPostRepository = new BlogPostRepository();
const blogPostItemRepository: IBlogPostItemRepository =
  new BlogPostItemRepository();

const blogPostService: IBlogPostService = new BlogPostService(
  blogPostRepository,
  blogPostItemRepository,
  itemRepository,
  userRepository,
);

const blogPostController = new BlogPostController(blogPostService);

// --- Comment Setup ---

const commentRepository: ICommentRepository = new CommentRepository();
const commentService: ICommentService = new CommentService(
  commentRepository,
  userRepository,
);
const commentController = new CommentController(commentService);

// --- Routes ---

const genreService: IGenreService = new GenreService(genreRepository);
const genreController = new GenreController(genreService);

app.use("/api/v1", authController.getRouter());
app.use("/api/v1/item", itemController.getRouter());
app.use("/api/v1/user", userController.getRouter());
app.use("/api/v1/blogPost", blogPostController.getRouter());
app.use("/api/v1/comment", commentController.getRouter());
app.use("/api/v1/genre", genreController.getRouter());

export default app;
