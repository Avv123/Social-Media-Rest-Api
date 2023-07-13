# Social-Media-Rest-Api
This is a social platform rest api backend application built using node js express js mongoose

# Database Distribution
1-> User Collection-
        Includes Details of the User who has registered on the social media app
2-> Post Collection-
        Includes Details of the Post that is posted by the users

# API ENDPOINTS
1-> /api/auth/register - this enables our incoming user to register on the social networking site and stores various details including password in hash form using md5
2-> /api/auth/login - this enables our incoming user to login to  the social networking site by securely submitting the email and password

3-> /api/users/update-  this allows a user to update his/her user details on the site
4-> /api/users/delete-  this deletes a user on request 
5-> /api/users/follow - this allows a user to follow other users on the site
6-> /api/users/unfollow - this allows a user to follow other users on the site
7-> /api/posts/create  - this allows a user to post his/her first image on the platform
8-> /api/posts/update  - this allows a user to update his/her existing posts on the platform
9-> /api/posts/delete  - this allows a user to delete his/her posts on the platform
10-> /api/posts/like-dislike  - this allows a user to like others posts on the platform

# MODULES USED
1-> node.js
2->express.js
3->mongoDb
4->ejs
5->mongoose
6->dotenv
7->md5

# MIDDLEWARES 
1-> Morgan
2-> Helmet

# Extra
In order to run the project you will need to install the packages in package.json and establishing a connection in mongoDb
