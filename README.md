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
Delete Recipe	| The User can delete recipe which he/she has created. | Registered User
View Recipe	| The User can view recipe. | Registered User / Anonymous User
Generate Random Recipe | The System provides already added and random recipe to the User. | System
Search for Recipe	| The User can search for recipes by keyword or category. | Registered User / Anonymous User
Comment on a Recipe	| The User can comment on recipes from his/her profile. | Registered User
Like a Recipe	| The User can like recipes from his/her profile. | Registered User


## Main Views (SPA Frontend)

View name	| Brief Descriptions | URI
------------ | ------------- | -------------
Homepage	| Presents the homepage.	| /
Login page	| Presents ability for registered users to log into the application.	| /login
Register page	| Presents ability for users of the application to register.	| /register
User Profile	| Presents ability to edit user’s profile and information.	| /myprofile
Recipe	| Presents information about a recipe.	| /recipe/{recipeId}


## API Resources (Node.js Backend)

View name	| Brief Descriptions | URI
------------ | ------------- | -------------
User | GET, PUT User Data for User with specified userId.	| /api/users/{userId}
All recipes	| GET all Recipes.	| /api/recipes
Recipe | GET, POST, PUT, DELETE Recipe with specified recipeId.	| /api/recipes/{recipeId}
	
