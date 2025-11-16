-- ========================================
-- KORISNICI
-- ========================================
CREATE TABLE korisnik (
    korisnik_id INT AUTO_INCREMENT PRIMARY KEY,
    ime VARCHAR(100),
    prezime VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    korisnicko_ime VARCHAR(100) UNIQUE NOT NULL,
    lozinka_hash TEXT NOT NULL,
    uloga ENUM('admin', 'kupac') DEFAULT 'kupac',
    datum_kreiranja TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- ARTIKLI (nadtip)
-- ========================================
CREATE TABLE artikal (
    artikal_id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(255) NOT NULL,
    cena DECIMAL(10,2) NOT NULL,
    slika_url TEXT,
    tip ENUM('knjiga', 'aksesoar') NOT NULL,
    korisnik_id INT,
    datum_kreiranja TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (korisnik_id) REFERENCES korisnik(korisnik_id) ON DELETE SET NULL
);

-- ========================================
-- KNJIGA (podtip)
-- ========================================
CREATE TABLE knjiga (
    artikal_id INT PRIMARY KEY,
    isbn VARCHAR(50),
    autor VARCHAR(255),
    broj_strana INT,
    korice ENUM('meke', 'tvrde'),
    godina_izdanja YEAR,
    opis TEXT,
    goodreads_link VARCHAR(255),
    FOREIGN KEY (artikal_id) REFERENCES artikal(artikal_id) ON DELETE CASCADE
);

-- ========================================
-- AKSESOAR (podtip)
-- ========================================
CREATE TABLE aksesoar (
    artikal_id INT PRIMARY KEY,
    opis TEXT,
    sadrzaj TEXT,
    FOREIGN KEY (artikal_id) REFERENCES artikal(artikal_id) ON DELETE CASCADE
);

-- ========================================
-- KATEGORIJE I VEZA KNJIGA-KATEGORIJA
-- ========================================
CREATE TABLE kategorija (
    kategorija_id INT AUTO_INCREMENT PRIMARY KEY,
    naziv VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE knjiga_kategorija (
    knjiga_id INT,
    kategorija_id INT,
    PRIMARY KEY (knjiga_id, kategorija_id),
    FOREIGN KEY (knjiga_id) REFERENCES knjiga(artikal_id) ON DELETE CASCADE,
    FOREIGN KEY (kategorija_id) REFERENCES kategorija(kategorija_id) ON DELETE CASCADE
);

-- ========================================
-- BLOG SISTEM
-- ========================================
CREATE TABLE blog_post (
    blog_post_id INT AUTO_INCREMENT PRIMARY KEY,
    naslov VARCHAR(255) NOT NULL,
    slika_url TEXT,
    opis LONGTEXT NOT NULL,
    tip ENUM('obavestenje', 'zanimljivost') NOT NULL,
    datum_objave TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    korisnik_id INT,
    FOREIGN KEY (korisnik_id) REFERENCES korisnik(korisnik_id) ON DELETE SET NULL
);

CREATE TABLE blog_post_artikal (
    blog_post_id INT,
    artikal_id INT,
    PRIMARY KEY (blog_post_id, artikal_id),
    FOREIGN KEY (blog_post_id) REFERENCES blog_post(blog_post_id) ON DELETE CASCADE,
    FOREIGN KEY (artikal_id) REFERENCES artikal(artikal_id) ON DELETE CASCADE
);

CREATE TABLE blog_komentar (
    komentar_id INT AUTO_INCREMENT PRIMARY KEY,
    blog_post_id INT NOT NULL,
    korisnik_id INT NOT NULL,  -- povezano sa korisnikom koji je ostavio komentar
    tekst TEXT NOT NULL,
    datum_komentara TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_post_id) REFERENCES blog_post(blog_post_id) ON DELETE CASCADE,
    FOREIGN KEY (korisnik_id) REFERENCES korisnik(korisnik_id) ON DELETE CASCADE
);

CREATE TABLE blog_lajk (
    lajk_id INT AUTO_INCREMENT PRIMARY KEY,
    blog_post_id INT NOT NULL,
    korisnik_id INT NOT NULL,  -- korisnik koji je lajkovao
    datum_lajka TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blog_post_id) REFERENCES blog_post(blog_post_id) ON DELETE CASCADE,
    FOREIGN KEY (korisnik_id) REFERENCES korisnik(korisnik_id) ON DELETE CASCADE,
    UNIQUE (blog_post_id, korisnik_id)  -- sprečava duple lajkove
);

-- ========================================
-- NARUDŽBINE, STAVKE, TRANSAKCIJE
-- ========================================
CREATE TABLE narudzbina (
  narudzbina_id int NOT NULL AUTO_INCREMENT,
  korisnik_id int DEFAULT NULL,
  datum_narudzbine timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  status enum('na_cekanju','placeno','poslato','otkazano') DEFAULT 'na_cekanju',
  ukupna_cena decimal(10,2) DEFAULT NULL,
  ime varchar(100) NOT NULL,
  prezime varchar(100) NOT NULL,
  email varchar(255) NOT NULL,
  telefon varchar(30) DEFAULT NULL,
  grad varchar(100) NOT NULL,
  ulica varchar(255) NOT NULL,
  broj varchar(20) DEFAULT NULL,
  postanski_broj varchar(20) DEFAULT NULL,
  napomena text,
  PRIMARY KEY (`narudzbina_id`),
  KEY korisnik_id (`korisnik_id`),
  CONSTRAINT narudzbina_ibfk_1 FOREIGN KEY (`korisnik_id`) REFERENCES `korisnik` (`korisnik_id`) ON DELETE SET NULL
);

CREATE TABLE stavka_narudzbine (
    narudzbina_id INT,
    artikal_id INT,
    kolicina INT NOT NULL,
    cena_u_trenutku DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (narudzbina_id, artikal_id),
    FOREIGN KEY (narudzbina_id) REFERENCES narudzbina(narudzbina_id) ON DELETE CASCADE,
    FOREIGN KEY (artikal_id) REFERENCES artikal(artikal_id) ON DELETE CASCADE
);

CREATE TABLE transakcija (
    transakcija_id INT AUTO_INCREMENT PRIMARY KEY,
    narudzbina_id INT NOT NULL,
    gateway_transakcija_id VARCHAR(255),
    iznos DECIMAL(10,2) NOT NULL,
    valuta VARCHAR(10) DEFAULT 'RSD',
    status ENUM('inicirana','uspesna','neuspesna','otkazana') DEFAULT 'inicirana',
    nacin_placanja ENUM('kartica','pouzecem','paypal','stripe') DEFAULT 'kartica',
    datum TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (narudzbina_id) REFERENCES narudzbina(narudzbina_id) ON DELETE CASCADE
);

-- ========================================
-- PRETPLATNICI (NEWSLETTER)
-- ========================================
CREATE TABLE pretplatnik (
    pretplatnik_id INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    datum_prijave TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    status ENUM('aktivan','odjavljen') DEFAULT 'aktivan'
);
