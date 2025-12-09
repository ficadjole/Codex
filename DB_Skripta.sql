-- ========================================
-- KORISNICI
-- ========================================
CREATE TABLE users (
    userId INT AUTO_INCREMENT PRIMARY KEY,
    firstname VARCHAR(100),
    surname VARCHAR(100),
    email VARCHAR(255) UNIQUE NOT NULL,
    username VARCHAR(100) UNIQUE NOT NULL,
    passwordHash TEXT NOT NULL,
    userRole ENUM('admin', 'user') DEFAULT 'user',
    dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP
);

-- ========================================
-- ARTIKLI (nadtip)
-- ========================================
CREATE TABLE items (
    itemId INT AUTO_INCREMENT PRIMARY KEY,
    itemName VARCHAR(255) NOT NULL,
    price DECIMAL(10,2) NOT NULL,
    imageUrl TEXT,
    itemType ENUM('knjiga', 'aksesoar') NOT NULL,
	description TEXT,
    userId INT,
    dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE SET NULL
);

-- ========================================
-- KNJIGA (podtip)
-- ========================================
CREATE TABLE books (
    itemId INT PRIMARY KEY,
    isbn VARCHAR(50),
    author VARCHAR(255),
    nmbrOfPages INT,
    cover ENUM('meke', 'tvrde'),
    publicationYear YEAR,
    goodreads_link VARCHAR(255),
    FOREIGN KEY (itemId) REFERENCES items(itemId) ON DELETE CASCADE
);

-- ========================================
-- AKSESOAR (podtip)
-- ========================================
CREATE TABLE accessories (
    itemId INT PRIMARY KEY,
    content TEXT,
    FOREIGN KEY (itemId) REFERENCES items(itemId) ON DELETE CASCADE
);

-- ========================================
-- KATEGORIJE I VEZA KNJIGA-KATEGORIJA
-- ========================================
CREATE TABLE genres (
    genreId INT AUTO_INCREMENT PRIMARY KEY,
    genreName VARCHAR(100) NOT NULL UNIQUE
);

CREATE TABLE bookGenre (
    bookId INT,
    genreId INT,
    PRIMARY KEY (bookId, genreId),
    FOREIGN KEY (bookId) REFERENCES books(itemId) ON DELETE CASCADE,
    FOREIGN KEY (genreId) REFERENCES genres(genreId) ON DELETE CASCADE
);

-- ========================================
-- BLOG SISTEM
-- ========================================
CREATE TABLE blogPosts (
    blogPostId INT AUTO_INCREMENT PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    imgUrl TEXT,
    content LONGTEXT NOT NULL,
    blogPostType ENUM('obavestenje', 'zanimljivost') NOT NULL,
    publicationYear TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    userId INT,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE SET NULL
);

CREATE TABLE blogPostItem (
    blogPostId INT,
    itemId INT,
    PRIMARY KEY (blogPostId, itemId),
    FOREIGN KEY (blogPostId) REFERENCES blogPosts(blogPostId) ON DELETE CASCADE,
    FOREIGN KEY (itemId) REFERENCES items(itemId) ON DELETE CASCADE
);

CREATE TABLE blogComments (
    commentId INT AUTO_INCREMENT PRIMARY KEY,
    blogPostId INT NOT NULL,
    userId INT NOT NULL,  -- povezano sa korisnikom koji je ostavio komentar
    commentText TEXT NOT NULL,
    dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blogPostId) REFERENCES blogPosts(blogPostId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE
);

CREATE TABLE blogLikes (
    likeId INT AUTO_INCREMENT PRIMARY KEY,
    blogPostId INT NOT NULL,
    userId INT NOT NULL,  -- korisnik koji je lajkovao
    dateLiked TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (blogPostId) REFERENCES blogPosts(blogPostId) ON DELETE CASCADE,
    FOREIGN KEY (userId) REFERENCES users(userId) ON DELETE CASCADE,
    UNIQUE (blogPostId, userId)  -- sprečava duple lajkove
);

-- ========================================
-- NARUDŽBINE, STAVKE, TRANSAKCIJE
-- ========================================
CREATE TABLE orders (
  orderId int NOT NULL AUTO_INCREMENT PRIMARY KEY,
  userId int DEFAULT NULL,
  orderDate timestamp NULL DEFAULT CURRENT_TIMESTAMP,
  orderStatus enum('na_cekanju','placeno','poslato','otkazano') DEFAULT 'na_cekanju',
  totalPrice decimal(10,2) DEFAULT NULL,
  firstname varchar(100) NOT NULL,
  lastname varchar(100) NOT NULL,
  email varchar(255) NOT NULL,
  telephone varchar(30) DEFAULT NULL,
  city varchar(100) NOT NULL,
  streat varchar(255) NOT NULL,
  streatNumber varchar(20) DEFAULT NULL,
  postalCode varchar(20) DEFAULT NULL,
  note text,
  KEY userId (userId),
  CONSTRAINT narudzbina_ibfk_1 FOREIGN KEY (userId) REFERENCES users (userId) ON DELETE SET NULL
);

CREATE TABLE orderItems (
    orderId INT,
    itemId INT,
    kolicina INT NOT NULL,
    quantity DECIMAL(10,2) NOT NULL,
    PRIMARY KEY (orderId, itemId),
    FOREIGN KEY (orderId) REFERENCES orders(orderId) ON DELETE CASCADE,
    FOREIGN KEY (itemId) REFERENCES items(itemId) ON DELETE CASCADE
);

CREATE TABLE transaction (
    transactionId INT AUTO_INCREMENT PRIMARY KEY,
    orderId INT NOT NULL,
    gateway_transakcija_id VARCHAR(255),
    amount DECIMAL(10,2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'RSD',
    status ENUM('inicirana','uspesna','neuspesna','otkazana') DEFAULT 'inicirana',
    paymentMethod ENUM('kartica','pouzecem','paypal','stripe') DEFAULT 'kartica',
    dateCreated TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
    FOREIGN KEY (orderId) REFERENCES orders(orderId) ON DELETE CASCADE
);

-- ========================================
-- PRETPLATNICI (NEWSLETTER)
-- ========================================
CREATE TABLE subscribers (
    subscriberId INT AUTO_INCREMENT PRIMARY KEY,
    email VARCHAR(255) NOT NULL UNIQUE,
    status ENUM('aktivan','odjavljen') DEFAULT 'aktivan'
);
