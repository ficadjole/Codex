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

app.use("/api/v1", authController.getRouter());

app.use("/api/v1/artikal", artikalController.getRouter());

export default app;
