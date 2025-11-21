import express from "express";
import cors from "cors";
import { KorisnikRepository } from "./Database/repositories/korisnik/KorisnikRepository";
import { IAuthService } from "./Domain/services/auth/IAuthService";
import { AuthService } from "./Services/auth/AuthService";
import { AuthController } from "./WebAPI/controllers/AuthController";
import { IArtikalRepository } from "./Domain/repositories/IArtikalRepository";
import { ArtikalRepository } from "./Database/repositories/artikal/ArtikalRepository";
import { KnjigaRepository } from "./Database/repositories/knjiga/KnjigaRepository";
import { IKnjigaRepository } from "./Domain/repositories/IKnjigaRepository";
import { IKnjigaKategorijaRepository } from "./Domain/repositories/IKnjigaKategorijaRepository";
import { KnjigaKategorijaRepository } from "./Database/repositories/knjigaKategorija/KnjigaKategorijaRepository";
import { IAksesoarRepository } from "./Domain/repositories/IAksesoarRepository";
import { AksesoarRepository } from "./Database/repositories/aksesoar/AksesoarRepository";
import { IArtikalService } from "./Domain/services/artikal/IArtikalService";
import { ArtikalService } from "./Services/artikal/ArtikalService";
import { IKategorijaRepository } from "./Domain/repositories/IKategorijaRepository";
import { KategorijaRepository } from "./Database/repositories/kategorija/KategorijaRepository";
import { ArtikalController } from "./WebAPI/controllers/ArtikalController";
import { IKorisnikRepository } from "./Domain/repositories/IKorisnikRepository";
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

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//Korisnik

const korisnikRepository: IKorisnikRepository = new KorisnikRepository();
const authService: IAuthService = new AuthService(korisnikRepository);
const authController = new AuthController(authService);

//Artikal

const artikalRepository: IArtikalRepository = new ArtikalRepository();
const knjigaRepository: IKnjigaRepository = new KnjigaRepository();
const knjigaKategorijaRepository: IKnjigaKategorijaRepository =
  new KnjigaKategorijaRepository();
const kategorijaRepository: IKategorijaRepository = new KategorijaRepository();
const aksesoarRepository: IAksesoarRepository = new AksesoarRepository();

const artikalService: IArtikalService = new ArtikalService(
  artikalRepository,
  knjigaRepository,
  kategorijaRepository,
  knjigaKategorijaRepository,
  aksesoarRepository
);

const artikalController = new ArtikalController(artikalService);

//Korisnik

const korisnikService: IUserService = new KorisnikService(korisnikRepository);
const korisnikController = new KorisnikController(korisnikService);

//
const blogPostRepository: IBlogPostRepository = new BlogPostRepository();

const blogPostArtikalRepository: IBlogPostArtikalRepository =
  new BlogPostArtikalRepository();

const blogPostService: IBlogPostService = new BlogPostService(
  blogPostRepository,
  blogPostArtikalRepository,
  artikalRepository,
  korisnikRepository
);

const blogPostController = new BlogPostController(blogPostService);

app.use("/api/v1", authController.getRouter());

app.use("/api/v1/artikal", artikalController.getRouter());

app.use("/api/v1/korisnik", korisnikController.getRouter());

app.use("/api/v1/blogPost", blogPostController.getRouter());

export default app;
