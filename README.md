# Pizza App

Application made as part of a required project.

This application consists of two parts, a front-end application and a back-end system.

The front-end application was made with the React framework using libraries such as semantic-ui-react for the design and axios to make requests to the back-end server.

The back-end system was made in php with the help of the Laravel framework.

## Installation

For this application it is necessary to use a web environment in this case I use the latest version of xampp that includes PHP 8.

If you are going to install xampp leave the default credentials or change them in the backend .env

After this it is necessary to install Laravel and then Node JS. I will not go into detail in this since I suppose that to use this repository you must have that knowledge.

Once we have our development environment ready, we will clone the repositories in which we will work.

```bash
git clone https://github.com/zJairO/Pizza-Backend
```

```bash
git clone https://github.com/zJairO/Pizza-App
```
We will have to create a database called "pizza"

```sql
CREATE DATABASE pizza;
```
From the terminal go to "pizza-backend" and run the following: 

```bash
php artisan migrate
```
&
```bash
php artisan db:seed
```
&
```bash
php artisan serve
```
With this we will have our backend server ready, listening on localhost:8000 (If you get any error please check your web server)

To run our react application, it is necessary from terminal go to "pizza-app" and run the following:
```bash
npm install
``` 
With this we will install all the necessary dependencies to run our application.

Now we are ready to run our application 

```bash
npm start
``` 
You are done, a new window will open, enjoy your application!

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.

Please make sure to update tests as appropriate.

## License
[MIT](https://choosealicense.com/licenses/mit/)
