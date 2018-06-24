# Food-Passion
Website for sharing recipes and keeping track of what each user cooks

## Short project description 

  Browsing the Internet, we can find many websites where people who are fond of cooking are able to see recipes and prepare them at home. However there are less websites where users have their own space for adding recipes with images and different modifications which they have tried on different recipes.
The application allows people to keep track of the best dishes they have prepared, or just some kind of list which includes what they have cooked. Depending on the confidence of each person and his/her cooking skills, users are able to make their recipes public or keep them private if they want to use the application as a personal tracker of cooking.  

The main user roles (actors in UML) are:
-	**Anonymous User** 
    * Anonymous User can browse the public recipes, register or read the information pages
-	**Registered User** 
    * Registered User can log into the application, add public and private recipes, edit added recipes, /comment or rate on other recipes/


## Main Use Cases / Scenarios


Use case name | Brief Descriptions | Actors Involved
------------ | ------------- | -------------
Log In | The User can log into the system providing valid e-mail address and valid password. | Registered User
Register | Anonymous User can register in the system providing a valid e-mail address, first and last name, and password. | Anonymous User
Edit User Profile | Registered User can view and edit his/her personal User Profile. | Registered User
Add Recipe | The User can add recipe providing compulsory and optional information for the recipe. | Registered User
Edit Recipe | The User can edit recipe providing the compulsory information for it and the changes he/she wants to make. | Registered User
Delete Recipe | The User can delete recipe which he/she has created. | Registered User
View Recipe	| The User can view recipe. | Registered User / Anonymous User
View Recipe by Category	| The User can view all the recipes from specific category. | Registered User / Anonymous User
Generate Random Recipe | The System provides already added and random recipe to the User. | System
Search for Recipe | The User can search for recipes by keyword or category. | Registered User / Anonymous User
Comment on a Recipe	| The User can comment on recipes from his/her profile. | Registered User
Like a Recipe | The User can like recipes from his/her profile. | Registered User


## Main Views (SPA Frontend)

View name	| Brief Descriptions | URI
------------ | ------------- | -------------
Homepage	| Presents the homepage.	| /
Login page	| Presents ability for registered users to log into the application.	| /login
Register page	| Presents ability for users of the application to register.	| /register
User Profile	| Presents ability to edit user’s profile and information.	| /myprofile
Recipe by Category	| Presents information about all recipes from certain category.	| /category/{categoryId}
Add Recipe | Presents ability to add a new recipe | /recipe/add
View Recipe | Presents ability to view a recipe | /recipe/view
Edit Recipe | Presents ability to edit a recipe | /recipe/edit
Delete Recipe | Presents ability to delete a recipe | /recipe/delete


## API Resources (Node.js Backend)

View name	| Brief Descriptions | URI
------------ | ------------- | -------------
User | POST, GET, PUT User Data for User with specified userId.	| /user/{userId}
Recipe | POST, GET, PUT, DELETE Recipe with specified recipeId.	| /recipe/{recipeId}
Category | GET all recipes by specific category with specified categoryId. | /category/{categoryId}
All recipes	| GET all Recipes. | /recipes
All categories	| GET all Categories. | /categories
All users	| GET all Users. | /users
Login | POST a registered user. | /login
isLogged | GET whether a user is already logged in or not. | /isLogged
Logout | POST a logged in user to log out. | /logout
