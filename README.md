### Installation Guide:
First create a `base project` folder.
Clone this repository to `base-folder/laravel-react-dsp`
Clone Laradock from `https://github.com/laradock/laradock.git` to `base-folder/laradock`
Now follow the following commands
##### Command to run:
1) first copy the .env and docker yml file in laradock directory
   1) `$ cp laravel-react-dsp/laradock/.env-example laradock/.env`
   2) `$ cp laravel-react-dsp/laradock/docker-compose.yml laradock`
2) Go to Laradock Directory and run the following command to start docker env
   1) `docker-compose up -d nginx mysql phpmyadmin workspace`
3) Login to docker VM by following command (For windows)
   1) `winpty docker-compose exec workspace bash`
---
4) Install Laravel and React Dependencies 
   1) `composer install`
   2) For react frontend app goto `frontend` directory from root and run
      1) `npm install`
---
5) Start the react `frontend` app by `npm start`
   1) it should be running on this point `http://localhost:3000/`
---
6) start the laravel app by 
   1) `cp .env.example .env` (Generate .env File)
   2) `php artisan key:generate` (Generate App Key)
   3) `php artisan storage:link` (Generate the storage symlink)
   4) `php artisan migrate:refresh --seed` (Generate Database and SEED data)
   5) `php artisan serve` (Run the Server)
   6) It should be running on `http://localhost:8000/`
---
7) To see the phpmyadmin goto `http://localhost:8081/`
   1) username: root
   2) password: root
   3) DB Name: eskimi
---
##### Testing the Laravel app:
1) There are some test cases already defined for unit testing in app/test folder.
   1) to run the test `php artisan test`
