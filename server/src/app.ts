import express from "express";
import cors from "cors";
import { IAuthService } from "./Domain/services/auth/IAuthService";
import { AuthService } from "./Services/auth/AuthService";
import { AuthController } from "./WebAPI/controllers/AuthController";

import { IArtikalService } from "./Domain/services/artikal/IArtikalService";
import { ArtikalService } from "./Services/artikal/ArtikalService";

import { ArtikalController } from "./WebAPI/controllers/ArtikalController";
import { IUserService } from "./Domain/services/user/IUserService";
import { KorisnikService } from "./Services/korisnik/KorisnikService";
import { KorisnikController } from "./WebAPI/controllers/KorisnikController";
import { IBlogPostRepository } from "./Domain/repositories/IBlogPostRepository";
import { BlogPostRepository } from "./Database/repositories/blogPost/BlogPostRepository";
import { IBlogPostArtikalRepository } from "./Domain/repositories/IBlogPostArtikalRepository";
import { BlogPostArtikalRepository } from "./Database/repositories/blogPost/BlogPostArtikalRepository";
import { IBlogPostService } from "./Domain/services/blogPost/IBlogPostService";
import { BlogPostService } from "./Services/blogPost/BlogPostService";
import { BlogPostController } from "./WebAPI/controllers/BlogPostController";
import { IKomentarRepository } from "./Domain/repositories/IKomentarRepository";
import { KomentarRepository } from "./Database/repositories/komentar/KomentarRepository";
import { IKomentarService } from "./Domain/services/komentar/IKomentarService";
import { KomentarService } from "./Services/komentar/KomentarService";
import { KomentarController } from "./WebAPI/controllers/KomentarController";
import { IUserRepository } from "./Domain/repositories/IUserRepository";
import { UserRepository } from "./Database/repositories/UserRepository";
import { IAccessoryRepository } from "./Domain/repositories/IAccessoryRepository";
import { AccesoryRepository } from "./Database/repositories/aksesoar/AccesoryRepository";
import { GenreRepository } from "./Database/repositories/kategorija/GenreRepository";
import { IGenreRepository } from "./Domain/repositories/IGenreRepository";
import { BookGenreRepository } from "./Database/repositories/knjigaKategorija/BookGenreRepository";
import { IBookGenreRepository } from "./Domain/repositories/IBookGenreRepository";
import { BookRepository } from "./Database/repositories/knjiga/BookRepository";
import { IBookRepository } from "./Domain/repositories/IBookRepository";
import { ItemRepository } from "./Database/repositories/artikal/ItemRepository";
import { IItemRepository } from "./Domain/repositories/IItemRepository";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//Korisnik

const userRepository: IUserRepository = new UserRepository();
const authService: IAuthService = new AuthService(userRepository);
const authController = new AuthController(authService);

//Artikal

const artikalRepository: IItemRepository = new ItemRepository();
const knjigaRepository: IBookRepository = new BookRepository();
const knjigaKategorijaRepository: IBookGenreRepository = new BookGenreRepository();
const kategorijaRepository: IGenreRepository = new GenreRepository();
const aksesoarRepository: IAccessoryRepository = new AccesoryRepository();

const artikalService: IArtikalService = new ArtikalService(
  artikalRepository,
  knjigaRepository,
  kategorijaRepository,
  knjigaKategorijaRepository,
  aksesoarRepository
);

const artikalController = new ArtikalController(artikalService);

//Korisnik

const korisnikService: IUserService = new KorisnikService(userRepository);
const korisnikController = new KorisnikController(korisnikService);

//BlogPost
const blogPostRepository: IBlogPostRepository = new BlogPostRepository();

const blogPostArtikalRepository: IBlogPostArtikalRepository =
  new BlogPostArtikalRepository();

const blogPostService: IBlogPostService = new BlogPostService(
  blogPostRepository,
  blogPostArtikalRepository,
  artikalRepository,
  userRepository
);

const blogPostController = new BlogPostController(blogPostService);

//Komentar
const komentarRepository: IKomentarRepository = new KomentarRepository();

const komentarService: IKomentarService = new KomentarService(
  komentarRepository,
  userRepository
);

const komentarController = new KomentarController(komentarService);

app.use("/api/v1", authController.getRouter());

app.use("/api/v1/artikal", artikalController.getRouter());

app.use("/api/v1/korisnik", korisnikController.getRouter());

app.use("/api/v1/blogPost", blogPostController.getRouter());

app.use("/api/v1/komentar", komentarController.getRouter());
export default app;
