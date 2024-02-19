Use SocialNetworkDB
CREATE DATABASE SocialNetworkDB;
USE SocialNetworkDB;
CREATE TABLE Tbl_User (
    UserID VARCHAR(255) PRIMARY KEY,
    Username VARCHAR(255) NOT NULL,
    Email VARCHAR(255) NOT NULL,
    Password VARCHAR(255) NOT NULL,
    TagName VARCHAR(50),
    Location VARCHAR(100)
);
UPDATE Tbl_User SET UserID = CAST(UserID AS VARCHAR(255))
    select * from Tbl_User

DROP TABLE Tbl_User

CREATE TABLE Post (
    PostID VARCHAR(255)  PRIMARY KEY,
    UserID VARCHAR(255) ,
    Content TEXT,
    PostDate DATETIME,
    Likes VARCHAR(255) ,
    Comments VARCHAR(255),
    FOREIGN KEY (UserID) REFERENCES Tbl_User(UserID)
);
DROP TABLE Post

-- Create Comment Table
CREATE TABLE Comment (
    CommentID INT PRIMARY KEY,
    PostID INT,
    UserID INT,
    CommentDate DATETIME,
    Content TEXT,
    FOREIGN KEY (PostID) REFERENCES Post(PostID),
    FOREIGN KEY (UserID) REFERENCES Tbl_User(UserID)
);DROP TABLE Comment

-- Create Friendship Table
CREATE TABLE Friendship (
    FriendshipID INT PRIMARY KEY,
    User1ID INT,
    User2ID INT,
    FriendshipDate DATETIME,
    FOREIGN KEY (User1ID) REFERENCES Tbl_User(UserID),
    FOREIGN KEY (User2ID) REFERENCES Tbl_User(UserID)
);
DROP TABLE Friendship

-- Create Photo Table
CREATE TABLE Photo (
    PhotoID INT PRIMARY KEY,
    UserID INT,
    PhotoURL VARCHAR(255),
    UploadDate DATETIME,
    FOREIGN KEY (UserID) REFERENCES Tbl_User(UserID)
);
DROP TABLE Photo

-- Create Group Table
CREATE TABLE Tbl_Group (
    GroupID INT PRIMARY KEY,
    GroupName VARCHAR(255),
    Description TEXT,
    CreatedDate DATETIME
);
DROP TABLE Tbl_Group

-- Create GroupMembers Table
CREATE TABLE GroupMembers (
    GroupID INT,
    MemberID INT,
    PRIMARY KEY (GroupID, MemberID),
    FOREIGN KEY (GroupID) REFERENCES Tbl_Group(GroupID),
    FOREIGN KEY (MemberID) REFERENCES Tbl_User(UserID)
);
DROP TABLE GroupMembers

-- Create Event Table
CREATE TABLE Event (
    EventID INT PRIMARY KEY,
    EventName VARCHAR(255),
    Description TEXT,
    EventDate DATETIME,
    Location VARCHAR(100),
    EventPosterURL VARCHAR(255)
);
DROP TABLE Event

-- Create EventAttendee Table
CREATE TABLE EventAttendee (
    EventID INT,
    AttendeeID INT,
    PRIMARY KEY (EventID, AttendeeID),
    FOREIGN KEY (EventID) REFERENCES Event(EventID),
    FOREIGN KEY (AttendeeID) REFERENCES Tbl_User(UserID)
);
DROP TABLE EventAttendee

-- Create Message Table
CREATE TABLE Message (
    MessageID INT PRIMARY KEY,
    SenderID INT,
    ReceiverID INT,
    MessageDate DATETIME,
    Content TEXT,
    FOREIGN KEY (SenderID) REFERENCES Tbl_User(UserID),
    FOREIGN KEY (ReceiverID) REFERENCES Tbl_User(UserID)
);

DROP TABLE Message
-- Insert Dummy Data (Example for User table)
-- Dummy data for User table
INSERT INTO Tbl_User (UserID, Username, Email, Password, TagName, Location)
VALUES 
    (1, 'user1', 'user1@example.com', 'password1', 'tag1', 'Location 1'),
    (2, 'user2', 'user2@example.com', 'password2', 'tag2', 'Location 2'),
    (3, 'user3', 'user3@example.com', 'password3', 'tag3', 'Location 3');

-- Dummy data for Post table
INSERT INTO Post (PostID, UserID, Content, PostDate, Likes, Comments)
VALUES 
    (1, 1, 'Post content 1', GETDATE(), 10, 5),
    (2, 2, 'Post content 2', GETDATE(), 15, 8),
    (3, 3, 'Post content 3', GETDATE(), 20, 12);

-- Dummy data for Comment table
INSERT INTO Comment (CommentID, PostID, UserID, CommentDate, Content)
VALUES 
    (1, 1, 2, GETDATE(), 'Comment on post 1 by user 2'),
    (2, 2, 3, GETDATE(), 'Comment on post 2 by user 3'),
    (3, 3, 1, GETDATE(), 'Comment on post 3 by user 1');
-- Dummy data for Friendship table
INSERT INTO Friendship (FriendshipID, User1ID, User2ID, FriendshipDate)
VALUES 
    (1, 1, 2, GETDATE()),
    (2, 1, 3, GETDATE());

-- Dummy data for Photo table
INSERT INTO Photo (PhotoID, UserID, PhotoURL, UploadDate)
VALUES 
    (1, 1, 'url1', GETDATE()),
    (2, 2, 'url2', GETDATE()),
    (3, 3, 'url3', GETDATE());
-- Dummy data for Group table
INSERT INTO Tbl_Group (GroupID, GroupName, Description, CreatedDate)
VALUES 
    (1, 'Group 1', 'Description for Group 1', GETDATE()),
    (2, 'Group 2', 'Description for Group 2', GETDATE());
-- Dummy data for GroupMembers table
INSERT INTO GroupMembers (GroupID, MemberID)
VALUES 
    (1, 1),
    (1, 2),
    (2, 2),
    (2, 3);
-- Dummy data for Event table
INSERT INTO Event (EventID, EventName, Description, EventDate, Location, EventPosterURL)
VALUES 
    (1, 'Event 1', 'Description for Event 1', GETDATE(), 'Location 1', 'poster_url_1'),
    (2, 'Event 2', 'Description for Event 2', GETDATE(), 'Location 2', 'poster_url_2');
-- Dummy data for EventAttendee table
INSERT INTO EventAttendee (EventID, AttendeeID)
VALUES 
    (1, 1),
    (1, 2),
    (2, 2),
    (2, 3);
-- Dummy data for Message table
INSERT INTO Message (MessageID, SenderID, ReceiverID, MessageDate, Content)
VALUES 
    (1, 1, 2, GETDATE(), 'Message from user 1 to user 2'),
    (2, 2, 1, GETDATE(), 'Reply from user 2 to user 1'),
    (3, 3, 1, GETDATE(), 'Message from user 3 to user 1');

	-- Retrieve all posts with their comments and likes for a specific user

	SELECT Post.PostID,Post.Content AS PostContent,Post.Likes,Comment.Content AS CommentContent
FROM 
    Post
LEFT JOIN 
    Comment ON Post.PostID = Comment.PostID
LEFT JOIN 
    Tbl_User ON Comment.UserID = Tbl_User.UserID
WHERE 
    Post.UserID = 2;
--Retrieve all friends of a user
DECLARE @UserID INT = 1; 

SELECT Tbl_User.UserID, Username, Email, TagName, Location
FROM (
    SELECT User1ID AS UserID
    FROM Friendship
    WHERE User2ID = @UserID
    UNION
    SELECT User2ID AS UserID
    FROM Friendship
    WHERE User1ID = @UserID
) AS FriendIDs
INNER JOIN Tbl_User ON FriendIDs.UserID = Tbl_User.UserID;


-- Retrieve all events attended by a specific user
DECLARE @UserID INT = 2; 

SELECT Event.EventID, Event.EventName, Event.Description
FROM Event 
LEFT JOIN EventAttendee ON Event.EventID = EventAttendee.EventID
WHERE EventAttendee.AttendeeID = @UserID;

--To display group members and their details for a certain group

SELECT Tbl_User.UserID, Tbl_User.Username, Tbl_User.Email, Tbl_User.TagName, Tbl_User.Location
FROM Tbl_User
INNER JOIN GroupMembers ON Tbl_User.UserID = GroupMembers.MemberID
INNER JOIN Tbl_Group ON GroupMembers.GroupID = Tbl_Group.GroupID
WHERE Tbl_Group.GroupID = 1;

--Retrieve all messages between two users
SELECT  m1.SenderID,m1.Content AS Content1, m2.ReceiverID AS ReceiverID2,
    m2.Content AS Content2
FROM 
    Message m1
INNER JOIN 
    Message m2 ON m1.SenderID = m2.ReceiverID 
               AND m1.ReceiverID = m2.SenderID
WHERE 
    m1.SenderID = 1 
    AND m1.ReceiverID = 2 
    AND m2.SenderID = 2
    AND m2.ReceiverID = 1; 


--To display event details and the details of their attendeess
SELECT Event.EventID,Event.EventName,Event.Description,Event.EventDate,Event.Location,Event.EventPosterURL,
    Tbl_User.Username ,Tbl_User.Email 
FROM Event
INNER JOIN 
    EventAttendee ON Event.EventID = EventAttendee.EventID
INNER JOIN 
    Tbl_User ON EventAttendee.AttendeeID = Tbl_User.UserID;

----------------
-- Retrieve all users
     SELECT * FROM Tbl_User
-- Retrieve user by UserID
    SELECT UserID FROM Tbl_User

-- Retrieve users in a specific location
    SELECT *  FROM Tbl_User
    WHERE Location = '1';


-- Update user information
   UPDATE Tbl_User SET  Username = 'Leah', Email = 'Leah@gmail.com', Password = 'Leah1', TagName = '@Leah',
    Location = 'Nyari'
WHERE UserID = 1;

-- Delete a user
INSERT INTO Tbl_User (UserID, Username, Email, Password, TagName, Location)
VALUES 
    (5, 'user5', 'user5@example.com', 'password5', 'tag5', 'Location 5');
	DELETE FROM Tbl_User
	WHERE UserID = '5';


----------------
--Post Table:
----------------
-- Retrieve all posts
	 SELECT * FROM Post

-- Retrieve posts for a specific user
 SELECT *  FROM Post
    WHERE PostID = '1';

-- Retrieve posts with more than 10 likes
    SELECT * FROM Post
	WHERE Likes > 10;
-- Update post content
	 UPDATE Post SET Content = 'Leah Updated This Content'
	WHERE PostID = 2;


-- Delete a post
    DELETE FROM Post
	WHERE Content = 'post content 1';
----------------
--Comment Table:

----------------
-- Retrieve all comments
 SELECT * FROM Comment

-- Retrieve comments for a specific post
	SELECT * FROM Comment WHERE PostID = '1';

-- Retrieve comments by a specific user
	SELECT * FROM Comment WHERE UserID = '2';

-- Update comment content
	UPDATE Comment SET Content = 'My Great People Good Morning' WHERE CommentID = '2';


-- Delete a comment
		DELETE FROM Comment WHERE CommentID = '1';


-------------------
--Friendship Table:
-------------------
-- Retrieve all friendships
    SELECT * FROM Friendship;

-- Retrieve friendships for a specific user
	SELECT * FROM Friendship WHERE User1ID = '1'OR User2ID = '1';


-- Update friendship date
	UPDATE Friendship SET FriendshipDate = '2024-02-22' WHERE FriendshipID = 1;


-- Delete a friendship
DELETE FROM Friendship WHERE FriendshipID = '2';

----------------
--Photo Table:
----------------
-- Retrieve all photos
SELECT * FROM Photo

-- Retrieve photos for a specific user
SELECT * FROM Photo WHERE UserID = '1';


-- Update photo URL
	UPDATE Photo SET PhotoURL = 'https//..www.img.png' WHERE PhotoID = '1';


-- Delete a photo
	DELETE FROM Photo WHERE PhotoID = '1';


----------------
--Group Table:
----------------
-- Retrieve all groups
	SELECT * FROM Tbl_Group;

-- Retrieve a group by GroupID
	SELECT * FROM Tbl_Group WHERE GroupID = '1';


-- Update group information
	UPDATE Tbl_Group SET Description = 'Leahs  description' WHERE GroupID = '1';


-- Delete a group
	DELETE FROM GroupMembers WHERE GroupID = '1' AND MemberID = '1';
------------------------
--GroupMembers Table:
-------------------------
-- Retrieve all group members
	SELECT * FROM GroupMembers

-- Retrieve members of a specific group
	SELECT * FROM GroupMembers WHERE GroupID = '1';

	
-- Remove a member from a group
	DELETE FROM GroupMembers WHERE GroupID = '1' AND MemberID = '1';


----------------
--Event Table:
----------------
-- Retrieve all events
	SELECT * FROM Event;


-- Retrieve events with a specific location
	SELECT * FROM Event WHERE Location = '1';


-- Update event information
UPDATE Event SET Description = 'The Leah description' WHERE EventID = '1';


-- Delete an event

DELETE FROM Event WHERE EventID = '1';

-------------------------
--EventAttendee Table:
-------------------------
-- Retrieve all event attendees
	SELECT * FROM EventAttendee;


-- Retrieve attendees for a specific event
	SELECT * FROM EventAttendee WHERE EventID = '1';


-- Remove an attendee from an event
	DELETE FROM EventAttendee WHERE EventID = '1' AND AttendeeID ='2';


---------------------
--Message Table:
---------------------
-- Retrieve all messages
	SELECT * FROM Message;


-- Retrieve messages between two users
	SELECT * FROM Message WHERE (SenderID = '1' AND ReceiverID = '2' )OR (SenderID = '2'AND ReceiverID = '1');


-- Update message content
	UPDATE Message SET Content = 'Message table content' WHERE MessageID = '1';


-- Delete a message
	DELETE FROM Message WHERE MessageID = '1';


 SELECT * FROM Photo