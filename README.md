# AuthMachine Front End Customer Portal

Run the application:
### 1. `npm install`
### 2. `npm start`

Runs the app in the development mode.\
Open [http://localhost:3000](http://localhost:3000) to view it in the browser.

The page will reload if you make edits.\
You will also see any lint errors in the console.
### 3. `npm build`
Builds the app for production to the `build` folder.\
It correctly bundles React in production mode and optimizes the build for the best performance.
    
The build is minified and the filenames include the hashes.\
Your app is ready to be deployed!


## Change admin console url
The admin pathname is `/admin-console`. Define the env variable `REACT_APP_ADMIN_CONSOLE_PATH_PREFIX` in the `.env` file to set unique 
admin console pathname
```
$ export REACT_APP_ADMIN_CONSOLE_PATH_PREFIX=ae65f7c32
```
The admin console be available here `/admin-console/ae65f7c32`