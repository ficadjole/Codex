import express from "express";
import cors from "cors";
import { IKorisnikRepository } from "./Domain/repositories/korisnik/IKorisnikRepository";
import { KorisnikRepository } from "./Database/repositories/korisnik/KorisnikRepository";
import { IAuthService } from "./Domain/services/auth/IAuthService";
import { AuthService } from "./Services/auth/AuthService";
import { AuthController } from "./WebAPI/controllers/AuthController";

require("dotenv").config();

const app = express();

app.use(cors());
app.use(express.json());

//Korisnik

const korisnikRepository: IKorisnikRepository = new KorisnikRepository();
const authService: IAuthService = new AuthService(korisnikRepository);
const authController = new AuthController(authService);

app.use("/api/v1", authController.getRouter());

export default app;
