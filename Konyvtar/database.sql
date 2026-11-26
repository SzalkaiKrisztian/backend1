CREATE TABLE konyv (
    id INT AUTO_INCREMENT PRIMARY KEY NOT NULL,
    cim VARCHAR(50) NOT NULL,
    szerzo VARCHAR(50) NOT NULL,
    kiadasEve INT NOT NULL DEFAULT 1900,
    ar INT NOT NULL DEFAULT 0,
    keszlet INT NOT NULL DEFAULT 1,
    borito TEXT DEFAULT NULL
);

INSERT INTO konyv (id, cim, szerzo, kiadasEve, ar, keszlet, borito) VALUES
(NULL, 'Egri csillagok', 'Gárdonyi Géza', 1901, 4500, 12, 'egri_csillagok.jpg'),
(NULL, 'A Pál utcai fiúk', 'Molnár Ferenc', 1907, 3800, 20, 'pal_utcai_fiuk.jpg'),
(NULL, 'Abigél', 'Szabó Magda', 1970, 4990, 8, 'abigel.jpg'),
(NULL, 'Az arany ember', 'Jókai Mór', 1872, 4200, 5, 'arany_ember.jpg'),
(NULL, 'Sorstalanság', 'Kertész Imre', 1975, 4600, 7, 'sorstalansag.jpg'),
(NULL, 'Árvácska', 'Móricz Zsigmond', 1941, 3500, 10, 'arvacska.jpg'),
(NULL, 'Utazás koponyám körül', 'Karinthy Frigyes', 1937, 3900, 6, 'utazas_koponyam_korul.jpg'),
(NULL, 'Édes Anna', 'Kosztolányi Dezső', 1926, 4100, 9, 'edes_anna.jpg'),
(NULL, 'Tüskevár', 'Fekete István', 1957, 3700, 15, 'tuskevar.jpg'),
(NULL, 'A kőszívű ember fiai', 'Jókai Mór', 1869, 4800, 4, 'koszivu_ember_fiai.jpg'),
(NULL, '1984', 'George Orwell', 1949, 4400, 14, '1984.jpg'),
(NULL, 'Állatfarm', 'George Orwell', 1945, 3200, 18, 'allatfarm.jpg'),
(NULL, 'A kis herceg', 'Antoine de Saint-Exupéry', 1943, 3400, 25, 'kis_herceg.jpg'),
(NULL, 'Bűn és bűnhődés', 'Fjodor Mihajlovics Dosztojevszkij', 1866, 5500, 3, 'bun_es_bunhodes.jpg'),
(NULL, 'Száz év magány', 'Gabriel García Márquez', 1967, 5200, 6, 'szaz_ev_magany.jpg'),
(NULL, 'A Mester és Margarita', 'Mihail Bulgakov', 1967, 5100, 7, 'mester_es_margarita.jpg'),
(NULL, 'Fahrenheit 451', 'Ray Bradbury', 1953, 4100, 11, 'fahrenheit_451.jpg'),
(NULL, 'Dűne', 'Frank Herbert', 1965, 6200, 9, 'dune.jpg'),
(NULL, 'A hobbit', 'J. R. R. Tolkien', 1937, 4700, 13, 'hobbit.jpg'),
(NULL, 'Galaxis útikalauz stopposoknak', 'Douglas Adams', 1979, 4300, 8, NULL);
