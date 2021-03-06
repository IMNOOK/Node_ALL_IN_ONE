DROP TABLE IF EXISTS nodeInstagram.User;
CREATE TABLE nodeInstagram.User (
id INT NOT NULL AUTO_INCREMENT,
email VARCHAR(40),
nick VARCHAR(20),
password VARCHAR(100),
provider VARCHAR(10) NOT NULL DEFAULT 'local',
snsId  VARCHAR(30),
PRIMARY KEY(id),
UNIQUE INDEX emailIdx (email ASC))
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;

DROP TABLE IF EXISTS nodeInstagram.Post;
CREATE TABLE nodeInstagram.Post (
id INT NOT NULL AUTO_INCREMENT,
userId INT NOT NULL, 
content VARCHAR(140) NOT NULL,
img VARCHAR(200),
date TIMESTAMP DEFAULT NOW(),
PRIMARY KEY(id),
INDEX userIdx (userId ASC),
CONSTRAINT postUserId FOREIGN KEY (userId) REFERENCES nodeInstagram.User (id) ON DELETE CASCADE ON UPDATE CASCADE)
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;

DROP TABLE IF EXISTS nodeInstagram.Hashtag;
CREATE TABLE nodeInstagram.Hashtag (
id INT NOT NULL AUTO_INCREMENT,
title VARCHAR(100) NOT NULL UNIQUE,
PRIMARY KEY(id))
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;

DROP TABLE IF EXISTS  nodeInstagram.Domain;
CREATE TABLE nodeInstagram.Domain (
id INT NOT NULL AUTO_INCREMENT,
userId INT NOT NULL,
host VARCHAR(80) NOT NULL,
type TINYINT NOT NULL,
clientSecret VARCHAR(37) NOT NULL,
PRIMARY KEY(id),
CONSTRAINT domainUserId FOREIGN KEY (userId) REFERENCES nodeInstagram.User (id) ON DELETE CASCADE ON UPDATE CASCADE)
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;

DROP TABLE IF EXISTS nodeInstagram.Follow;
CREATE TABLE nodeInstagram.Follow (
id INT NOT NULL AUTO_INCREMENT,
followingId INT NOT NULL,
followerId INT NOT NULL, 
PRIMARY KEY(id),
CONSTRAINT followingId FOREIGN KEY (followingId) REFERENCES nodeInstagram.User (id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT followerId FOREIGN KEY (followerId) REFERENCES nodeInstagram.User (id) ON DELETE CASCADE ON UPDATE CASCADE)
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;

DROP TABLE IF EXISTS  nodeInstagram.Good;
CREATE TABLE nodeInstagram.Good (
id INT NOT NULL AUTO_INCREMENT,
userId INT NOT NULL,
postId INT NOT NULL, 
PRIMARY KEY(id),
CONSTRAINT goodUserId FOREIGN KEY (userId) REFERENCES nodeInstagram.User (id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT goodPostId FOREIGN KEY (postId) REFERENCES nodeInstagram.Post (id) ON DELETE CASCADE ON UPDATE CASCADE)
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;

DROP TABLE IF EXISTS nodeInstagram.Room;
CREATE TABLE nodeInstagram.Room (
id INT NOT NULL AUTO_INCREMENT,
aId INT NOT NULL,
bId INT NOT NULL, 
PRIMARY KEY(id),
CONSTRAINT aId FOREIGN KEY (aId) REFERENCES nodeInstagram.User (id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT bId FOREIGN KEY (bId) REFERENCES nodeInstagram.User (id) ON DELETE CASCADE ON UPDATE CASCADE)
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;

DROP TABLE IF EXISTS nodeInstagram.DM;
CREATE TABLE nodeInstagram.DM (
id INT NOT NULL AUTO_INCREMENT,
roomid INT NOT NULL,
senderId INT NOT NULL,
content VARCHAR(140) NOT NULL,
date TIMESTAMP DEFAULT NOW(),
PRIMARY KEY(id),
CONSTRAINT senderId FOREIGN KEY (senderId) REFERENCES nodeInstagram.User (id) ON DELETE CASCADE ON UPDATE CASCADE,
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;

DROP TABLE IF EXISTS nodeInstagram.Comment;
CREATE TABLE nodeInstagram.Comment (
id INT NOT NULL AUTO_INCREMENT,
userId INT NOT NULL,
postId INT NOT NULL,
content VARCHAR(140) NOT NULL,
date TIMESTAMP DEFAULT NOW(),
PRIMARY KEY(id),
CONSTRAINT CommentUserId FOREIGN KEY (userId) REFERENCES nodeInstagram.User (id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT CommentPostId FOREIGN KEY (postId) REFERENCES nodeInstagram.Post (id) ON DELETE CASCADE ON UPDATE CASCADE)
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;

DROP TABLE IF EXISTS nodeInstagram.PostHashtag;
CREATE TABLE nodeInstagram.PostHashtag (
id INT NOT NULL AUTO_INCREMENT,
postId INT NOT NULL,
hashtagId INT NOT NULL, 
PRIMARY KEY(id),
CONSTRAINT postId FOREIGN KEY (postId) REFERENCES nodeInstagram.Post (id) ON DELETE CASCADE ON UPDATE CASCADE,
CONSTRAINT hashtagId FOREIGN KEY (hashtagId) REFERENCES nodeInstagram.Hashtag (id) ON DELETE CASCADE ON UPDATE CASCADE)
DEFAULT CHARACTER SET = utf8
ENGINE = InnoDB;