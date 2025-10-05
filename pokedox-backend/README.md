### Technologies Involved
1. Laravel


### Data Fetching
Two data fetching endpoint has been developed. First is root (index) endpoint where it collects the data from external API and returns all the pokemon data based on the offset ( calculated based on page ) and specified limit ( constant 60, maxed at 100 ).
The system first gets the name pokemon from the specified url below and the pokemon data will be fetch from the another url comes along with the name. The external API URL is

https://pokeapi.co/api/v2/pokemon?offset={$offset}&limit={$limit}

The second is search() endpoint where it collects the data from the external API based on the name of the single Pokemon. The API url is 

https://pokeapi.co/api/v2/pokemon/{$name}

Both endpoint requires data={ name, height, weight, types,image } and returns {data, succes, message(if any), query}


### Important File Structure
1. API Data Fetching = pokedox-backend/app/Http/Controllers/PokemonController.php


### Key Improvements

1. Added `try/catch` for error handling during API requests
2. All API URLs placed in `.env` file for security (`.env` is uploaded in github 🚀)
3. Clean and refactored codebase


### Disclaimer
Github Copilot is used in one part. When I intialised the laravel framework, it comes with frontend files, I used AI to clean the frontend files to make it minimalistic.

Prompt: The laravel framework comes with pre-installed frontend files. Help me to clean it out to make it minimalistic.



