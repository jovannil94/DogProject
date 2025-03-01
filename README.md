# Fetch Dog App Documentation

## Overview
The Fetch Dog App is a web application designed to help users find and adopt dogs. The app provides an intuitive user interface for browsing available dogs, viewing their details, favoriting their dogs, and finally being matched to a dog for adoption. There are several backend API calls to Fetch database for retrieving dog adoption data, authentication, filtering, and sorting.

## Project Structure
The application consists of two pages and multiple components each responsible for a specific part of the functionality.

### Pages

#### **Login** (`Login.js`)
- Hits POST /auth/login.
- Simple log in page.
- Users aren't allowed to see logout button on the navbar

#### **DogSearch** (`DogSearch.js`)
- Holds majority of functionality.
- Hits POST "/dogs/match", GET "/dogs/search", and POST "/dogs".
- Holds several local states to pass along several child components.
- Clean Jsx by using components.

### Components

#### **Navbar** (`Navbar.js`)
- Displays the applications's title, logo, and logout button.
- Users can log out while signed in.
- Hits POST "/auth/logout" for logging out and relocating the user to log in.

#### **Filtercard** (`Filtercard.js`)
- Hits GET "/dogs/breeds" and GET "/dogs/search".
- Fetches all breeds to populate dropdown for the user.
- Handles and builds params for breeds, minimum age, maximum age, and zipcodes.
- Breeds and zipcodes textfields builds array based off user's choices.
- Handles and builds params for sorting results by breed, name, age, in ascending/descending order, and how many results are displayed.
- Users can see how many dogs exist in their current filter results.
- Optimizes API calls by applying filters only when the user clicks the filter button, avoiding unnecessary live requests.
- Instructions on favoriting dogs, populates match button if favorited dogs are added.

#### **Dogcard** (`Dogcard.js`)
- Represents a dog's information such as name, breed, age, and zip code.
- Displays image and details in a material UI card for viewing experience.
- Interactive favorite button to add the dog id to a list of favorited dogs.

#### **Matchcard** (`Matchcard.js`)
- Displays details of a matched dog for adoption.
- Resuses DogCard component for cleaner code.
- Uses `Confetti` to celebrate adoption.

#### **PageControls** (`PageControls.js`)
- Adds Prev and Next buttons if available
- Users can move through pages to fetch more dogs 

### API Utility
#### **API Requests (`utils/api.js`)**
- Provides helper functions to interact with the backend API and cleaner implementation.
- Adds withCredentials from fetch-access-token to each request.
- Reusuable get request with optional parameters and defaulted sorting.
- Reusuable post request with body.

### User Flow
1. **Login**: Users log in through the login screen.
2. **Dog Matching**: The app on load fetches dogs based on user preferences or defaulted settings.
3. **Favoriting**: Users favorite dogs throughout search within session and click adoption match button.
4. **Adoption Details**: Users view more details about the matched dog and adoption process with celebration.
5. **Logout**: Users can log out from the app, returning to the login screen.

## Future Enhancements
- More auth security and validation handling.
- Enhance the UI for better responsiveness.
- Add googlemaps/mapbox for a map of local dogs, maybe directions.
- Use user's device location for nearby dogs
- Pagination numbers at the bottom of the page to navigate
- Mobile compatiblity
- Time constraints, fees for google/mapbox api, more detailed vision.

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in your browser.

The page will reload when you make changes.\
You may also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
