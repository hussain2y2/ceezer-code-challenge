## Ceezer Backend Code Challenge

### Backend

There are three main modules in the backend: `auth`, `users`, and `pokemon` with common functionalities' directory.

To run the backend application after cloning the repository, please follow the following guidelines:
1. Switch the directory to `backend` and run `npm run install` OR `yarn install` to install the required node packages.
2. Run the command `cp .env.example .env` and change `.env` file according to your environment configuration.
3. Now run the backend application using `npm run start:dev` and check everything is working fine on the backend.
4. For docker configuration please build the container and then change the .env file according to the container configuration.

### Database
I have already downloaded the pokemon csv file, so we don't need to download it again.

To import the csv pokemon file by using the following commands as per the database configuration:

1. MySQL:
`LOAD DATA INFILE 'path-to-pokemon-csv-file' INTO TABLE pokemons FIELDS TERMINATED BY ',' ENCLOSED BY '"' LINES TERMINATED BY '\n' IGNORE 1 ROWS (pokemon_id, name, type_1, type_2, total, hp, attack, defence, sp_attack, sp_defence, speed, genration, legendary);`

2. Postgres
`COPY pokemons (pokemonId, name, typeFirst, typeSecond, total, hp, attack, spAttack, speed, generation, legendary, defense, spDefense) FROM '/home/hussain/Downloads/czr_pokemon_db-updated.csv' FORMAT CSV, HEADER, DELIMITER ','`

### Frontend
Due to time shortage I did not complete the frontend, but I have configured `tailwindcss` for designing along with typescript. 

I have configured the `Swagger` so we can test the APIs easily. To check the APIs endpoints and schema, open the link: [Swagger](http://localhost:8000/docs)` in your browser. Port can be changes according to the environment configuration.

### Testing
Run the directory specific package.json `jest` test commands to run the unit tests. I didn't write the unit tests as I was out of time.
