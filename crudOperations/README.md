# Welcome to your Expo app 👋

This is an [Expo](https://expo.dev) project created with [`create-expo-app`](https://www.npmjs.com/package/create-expo-app).

## Get started

1. Install dependencies

   ```bash
   npm install
   ```

2. Start the app

   ```bash
    npx expo start
   ```

In the output, you'll find options to open the app in a

- [development build](https://docs.expo.dev/develop/development-builds/introduction/)
- [Android emulator](https://docs.expo.dev/workflow/android-studio-emulator/)
- [iOS simulator](https://docs.expo.dev/workflow/ios-simulator/)
- [Expo Go](https://expo.dev/go), a limited sandbox for trying out app development with Expo

You can start developing by editing the files inside the **app** directory. This project uses [file-based routing](https://docs.expo.dev/router/introduction).

## Get a fresh project

When you're ready, run:

```bash
npm run reset-project
```

This command will move the starter code to the **app-example** directory and create a blank **app** directory where you can start developing.

## Learn more

To learn more about developing your project with Expo, look at the following resources:

- [Expo documentation](https://docs.expo.dev/): Learn fundamentals, or go into advanced topics with our [guides](https://docs.expo.dev/guides).
- [Learn Expo tutorial](https://docs.expo.dev/tutorial/introduction/): Follow a step-by-step tutorial where you'll create a project that runs on Android, iOS, and the web.

## Join the community

Join our community of developers creating universal apps.

- [Expo on GitHub](https://github.com/expo/expo): View our open source platform and contribute.
- [Discord community](https://chat.expo.dev): Chat with Expo users and ask questions.













# React Native User Management App

This is a simple React Native application that demonstrates basic user management functionalities such as viewing users, creating a new user, editing an existing user, and deleting a user. The app interacts with a RESTful API to fetch and manipulate user data.

## Features

- **Create User**: Allows users to create a new user by providing a username, email, and password.
- **Edit User**: Allows users to update existing user details.
- **Delete User**: Allows users to delete a user from the list.
- **View Users**: Displays a list of users fetched from the server.

## Requirements

Before running the app, make sure you have the following installed:

- [Node.js](https://nodejs.org/) - A JavaScript runtime for building the app.
- [React Native](https://reactnative.dev/docs/environment-setup) - The framework used to build the app.
- [Expo CLI](https://docs.expo.dev/get-started/installation/) (if you're using Expo for development).
- An emulator or a physical device to run the app.

## Installation

1. Clone this repository to your local machine:

    ```bash
    git clone https://github.com/varshadhanotiya/CRUD-operations.git
    ```

2. Navigate to the project folder:

    ```bash
    cd CRUD-operations
    ```

3. Install the dependencies:

    ```bash
    npm install
    ```

4. If you're using Expo CLI, start the app with:

    ```bash
    expo start
    ```

    If you're using React Native CLI, run the app on your emulator or device using:

    ```bash
    react-native run-android # for Android
    react-native run-ios     # for iOS
    ```
5. To start the server and watch for changes in the db.json file, run the following command:

    ```
    npx json-server --watch db.json --port 3000
    ```

## Usage

- Upon opening the app, you will see a list of users.
- Click on **Create User** to add a new user.
- Click on the **Edit** button next to a user to edit their details.
- Click on the **Delete** button next to a user to remove them from the list.

## API Endpoints

The app uses the following API to fetch and manipulate users:

- **GET `/users`** - Fetches the list of users.
- **POST `/users`** - Creates a new user.
- **PUT `/users/{id}`** - Updates an existing user by ID.
- **DELETE `/users/{id}`** - Deletes a user by ID.

Make sure to replace the API URL in the code with the actual URL of your backend service.

## File Structure


**/src /components HomeScreen.js**: Main screen with user list and actions ,
**UserModal.js** Modal for creating/editing user ,
**/constants/API.ts** # Contains the API URL.


## Libraries Used

- `axios`: HTTP client for making API requests.
- `react-native`: The framework used for building the mobile app.
- `react-native-vector-icons`: Icon library used for displaying edit and delete icons.



