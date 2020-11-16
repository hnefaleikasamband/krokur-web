# Krókur 


This project was bootstrapped with [Create React App](https://github.com/facebook/create-react-app) and is generously sponsored by [Vercel](https://vercel.com?utm_source=krokur&utm_campaign=oss)

This is the front-end of the application Krókur, which stores and represents data for Diploma Boxing managed by the Icelandic Boxing Association.

## `prerequisite`
To run the frontend you only need node with npm.

However, if you want to get further then displaying the login screen you'll need to [host your own API](https://github.com/hnefaleikasamband/krokur-api) and populate it.

When you have your API up and running, point development build to it by creating a file in the root directory called `.env.local`. It should host the variable `REACT_APP_API_GATEWAY` and point to the api f.e.

```
REACT_APP_API_GATEWAY='pathToApi.com'
```

## `Up and running`

Install dependencies with
```
npm install
```

and if all is well

```
npm start
```

This runs the app in the development mode.<br>
Open [http://localhost:3000](http://localhost:3000) (or the port shown in terminal) to view it in the browser.


## `Building`

To build the project for production run 
```
npm run build --production
```

## Contributing
Pull requests are welcome. For major changes, please open an issue first to discuss what you would like to change.


## License
[GPL-3.0](https://github.com/hnefaleikasamband/krokur-web/blob/master/LICENSE)

<br>

![Powered by Vercel](src/assets/powered-by-vercel.svg?raw=true "Powered by Vercel")