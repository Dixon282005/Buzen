CREATE TABLE `Client` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `name` varchar(15) NOT NULL,
  `surname` varchar(15) NOT NULL,
  `age` integer(2) NOT NULL,
  `country` varchar(20) NOT NULL,
  `number` integer(15) UNIQUE NOT NULL,
  `create` timestamp NOT NULL
);

CREATE TABLE `User` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `email` varchar(255) UNIQUE NOT NULL,
  `username` varchar(20) UNIQUE NOT NULL,
  `password` varchar(20) NOT NULL,
  `user_id` integer NOT NULL
);

CREATE TABLE `Likes` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `music_id` integer NOT NULL
);

CREATE TABLE `Music_History` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `music_id` integer NOT NULL,
  `user_id` integer NOT NULL,
  `play_date` timestamp NOT NULL
);

CREATE TABLE `Favorite_Gender` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `gender_id` integer NOT NULL,
  `user_id` integer NOT NULL
);

CREATE TABLE `Favorite_Artist` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `user_id` integer NOT NULL,
  `artist_id` integer NOT NULL
);

CREATE TABLE `Playlist` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `playlist_name` varchar(30) UNIQUE NOT NULL,
  `create_date` timestamp NOT NULL,
  `user_id` integer NOT NULL,
  `music_id` integer NOT NULL
);

CREATE TABLE `Log_in` (
  `id` integer PRIMARY KEY AUTO_INCREMENT,
  `log_date` timestamp NOT NULL,
  `platform` varchar(255) NOT NULL,
  `dispositive` varchar(255) NOT NULL,
  `user_id` integer NOT NULL
);

ALTER TABLE `User` ADD FOREIGN KEY (`user_id`) REFERENCES `Client` (`id`);

ALTER TABLE `Likes` ADD FOREIGN KEY (`user_id`) REFERENCES `User` (`id`);

ALTER TABLE `User` ADD FOREIGN KEY (`user_id`) REFERENCES `Music_History` (`user_id`);

ALTER TABLE `User` ADD FOREIGN KEY (`user_id`) REFERENCES `Log_in` (`user_id`);

ALTER TABLE `User` ADD FOREIGN KEY (`user_id`) REFERENCES `Favorite_Artist` (`user_id`);

ALTER TABLE `User` ADD FOREIGN KEY (`user_id`) REFERENCES `Favorite_Gender` (`user_id`);

ALTER TABLE `User` ADD FOREIGN KEY (`user_id`) REFERENCES `Playlist` (`user_id`);
