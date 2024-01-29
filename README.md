# Task_Manager

###Prequisites

Install Python
Install Node.js
Have a code editor
Download the zip folder from my git repository and extract
open the folder with your code editor

###Running the code

######## BACKEND
Run these codes on your terminal:

1.  cd backend ###################################This takes you to the backend directory in the folder

2.  python -m pip install virtualenv ##############This installs virtual environment so as to install all your dependencies

3.  python -m virtualenv venv ################This creates a virtual environment with the name venv in your backend folder

4.  venv\Scripts\activate ######################This activates your virtual environment

5.  pip install django #####################Installs django

6.  cd backend_site ######################Go to the backend_site directory

7.  pip install -r requirements.txt #######################Installs all the dependancies and requirements of your backend

8.  python manage.py makemigrations ##################### Now everythign is ready make migrations and run the server

9.  python manage.py migrate

10. python manage.py runserver

11. copy link of server and paste on your browser add /admin/ and use the credentials you set for your super user to login

12. python manage.py createsuperuser #########################Create a super user so as to login to the backend admin dashboard

####### FRONTEND

1. open new terminal

2. cd frontend

3. npm install

4. npm start

5. The application should now open on your browser with a login page.

6. create new account password should be atleast 8 characters should be a strong password so account creation

7. log in with the credentials after successful registration.

8. Now you can add, delete, show, sort your tasks.

#########

Functionalities

1. Task Creation

   - Users is be able to create a new task by providing a title, description, and due date.
   - Has an option to assign tasks to specific categories (e.g., work, personal, urgent).

2. Task List

   - Display a list of tasks with relevant details (title, due date, category).
   - Click on header titles on the list to sort using that category e.g Work, Completed

3. Task Details:

   - Users is be able to click on a task to view its details, including the full description and also mark it as completed and can also delete the task.

4. Task Status

   - Has a feature to mark tasks as complete or incomplete.
   - Has a visual indicator of task status in the task list.

5. User Authentication:

   - User authentication to ensure that each user has a personalized task list.
   - Users is be able to register, log in, and log out.

6. User Dashboard:
   - Has a dashboard where users can get an overview of their tasks, such as the number of tasks.
   - Also has an ALL TASKS page to display all your tasks.
