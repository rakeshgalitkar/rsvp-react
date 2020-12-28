# React App RSVP:

This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app).

# Requirements :

You have an upcoming ReactJS meetup where you need the participants to RSVP so that you can prepare appropriate accommodations and transport facilities. The participants can bring up to two guests along with them.

You also need an admin screen that contains list of all the participants which can be searched based on their names and locality

The task is to build three screens.

# First Screen

It will have a registration form with following fields —

    Name
    Age
    D.O.B (JS Date object)
    Profession (can be Employed/Student)
    Locality
    Number of Guests (0-2)
    Address (multiline input upto 50 characters)

With a submit button you can simply mock a submit API call with services like Beeceptor. Also ensure you show an alert to the user if they click back while editing the form.

# Second Screen

Second screen in the drawer should have a searchable list of all the RSVP'd users (JSON data can be mocked using a tool like Mockaroo). The list can have the name and locality of the RSVP’d user. The entire list should be searchable with a single text input by the user’s locality and name. Clicking an user in the list will open a new screen that contains all the details collected in the first form.

# Third Screen

The third screen will have useful reports regarding the event. The reports you'll need to build are —

    Number of people in a given age range (13-18, 18-25 and 25+).
    Number of people by localities.
    Average group size of people attending the event (using guests count).
    Professionals & students count.

There should be easy navigation on the top to navigate and the site should also render on mobile/responsive

## Available Scripts

In the project directory, you can run:

### `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.

### `npm test`

Launches the test runner in the interactive watch mode.\
See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

### `npm run build`

Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.

The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!

See the section about [deployment](https://facebook.github.io/create-react-app/docs/deployment) for more information.
