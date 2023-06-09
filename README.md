# SoPra Group 7 - SpeetUp

If you have ever tried to organize a sports event with friends then you know how difficult and frustrating it can be to get a group of even 5 people to come to an agreenment. The greatest difficulty arises from trying to keep track of everyones preferences regarding what sport to play, when to play and where to play. It is simply impossible to organize an event with which everyone is happy with. This is precisely the problem SpeetUp was designed to solve, so next time you need to organize an event don't open WhatsApp, instead head over to [SpeetUp](http://speetup.ch). [SpeetUp](http://speetup.ch) allows it's users to create lobbies where every member can express which sports they would like to play as well as where and when they can play. After all members of the lobby have saved their choices or if the timer has run out an event will be created using the majority option in each category. This way an event can be created with which everyone is satisfied by.

Try now at [SpeetUp.ch](http://speetup.ch)


## Table of Contents

- [Technologies](#technologies)
- [Components](#components)
- [Launch & Deployment](#launch)
- [User Flow](#user-flow)
- [Roadmap](#roadmap)
- [Authors and Acknowledgments](#authors-and-acknowledgments)
- [Credits](#credits)
- [License](#license)

## Technologies

### User Technologies
- [JavaScript React](https://legacy.reactjs.org) - Used for front end logic, structure and design
- [Material UI](https://mui.com) - Icons as well as many other UI elements

### Developer Technologies
- [ESLint](https://eslint.org) - Code quality check
- [Npm](https://www.npmjs.com) - Package manager
- [Gradle](https://gradle.org) - Build automation
- [Google App Engine](https://cloud.google.com) - Cloud build and deployment

### APIs
- [React Mapbox GL](https://docs.mapbox.com/help/tutorials/use-mapbox-gl-js-with-react/) - Map functionalities

## Components

### NavBar

The NavBar(short for navigation bar) is a component used in most pages in SpeetUp. It allows users to navigate to all beasic pages such as Home, Lobbies, Events, etc. from anywhere in the app with one simple click.

### Lobbies

The Lobbies component is responsible for conveying all open lobbies to the user. It is responsible for giving users a way to join any lobby they wish as well as allows them access to the Create Lobby page with the use of various buttons, for example the "Join" button to join a lobby. For each lobby, the user is shown relevant details about the lobby such as the region the lobby takes place in, the number of participants in the lobby and the time remaining for the lobby.

### Lobby

The Lobby component is responsible for receiving constant updates from the server and displaying them to the users. It shows what each user has selected in each category (sport, time and location) as well as the current majority in each category, which is highlighted in orange. The Lobby component provides users a way to leave the lobby with a button labelled "Leave". Additionally users can click the "Invite Friends" button to get a link to the lobby, which can be shared to friends who wish to join the lobby.

### Events and Event

The Events and Event components are synonymous to the Lobbies and Lobby components respectively. The key difference between Event and Lobby is that in a Lobby users are given the chance to express their choices and have a say on the final decision, whereas an Event is already final and a user may only join or leave the event. 


## Launch & Deployment <a name="launch"></a>

For your local development environment, you will need Node.js. You can download it [here](https://nodejs.org). All other dependencies, including React, get installed with:

```npm install```

Run this command before you start your application for the first time. Next, you can start the app with:

```npm run dev```

Now you can open [http://localhost:3000](http://localhost:3000) to view it in the browser.

Notice that the page will reload if you make any edits. You will also see any lint errors in the console (use Google Chrome).

### Testing
Testing is optional, and you can run the tests with `npm run test`.
This launches the test runner in an interactive watch mode. See the section about [running tests](https://facebook.github.io/create-react-app/docs/running-tests) for more information.

> For macOS user running into a 'fsevents' error: https://github.com/jest-community/vscode-jest/issues/423

### Build
Finally, `npm run build` builds the app for production to the `build` folder.<br>
It correctly bundles React in production mode and optimizes the build for the best performance: the build is minified, and the filenames include hashes.<br>

## Learn More

To learn more about...
- React, check out the [React documentation](https://reactjs.org/).
- Spring Boot, check out the [Spring Boot documentation](https://spring.io/projects/spring-boot).
- Google Cloud Platform, check out the [GCP documentation](https://cloud.google.com/docs).
- Toastify, check out the [React toastify documentation](https://fkhadra.github.io/react-toastify/introduction/)
- tsParticles, check out the [tsParticles documentation](https://particles.js.org/)


## User Flow

### Register

Upon going to our app, the user is first shown the register page. Although it is not required to register/login to use our app, there are certain features only available for logged in users such as joining an event or lobby. To successfully register, a unique username, email and a password is required.

![image](https://github.com/sopra-fs23-group-07/sopra-fs23-group-07-client/blob/main/Screenshots/SpeetUp%20Register%20Page.png)

### Home

After registration the user is redirected to the home page. The home page consists of many tutorials explaining how to use SpeetUp and its many features. At the top of the page there is a navigation bar which allows users to navigate throughout the app with ease.

![image](https://github.com/sopra-fs23-group-07/sopra-fs23-group-07-client/blob/main/Screenshots/SpeetUp%20Home%20Page.png)

### Events

A user can then go to the events page by clicking "Events" on the navigation bar where they will be sent to a page showing all events. Here a user may view the details of an event by clicking the icon of an eye or view the location of the event on the map by clicking the location icon. If a user wishes to create there own event(without any collaboration), they can click the "Create New Event" button. A user may also filter the events by location or sport to find an event which best suits them.

![image](https://github.com/sopra-fs23-group-07/sopra-fs23-group-07-client/blob/main/Screenshots/SpeetUp%20Events%20Page.png)

### Lobbies

Incase there is no event which interests the user, they can have a look at what lobbies are currently open in the lobbies page by clicking "Lobbies" on the navigation bar on top of the page. Here the user is shown all lobbies including the number of patricpants in a lobby and the area in which the lobby is taking place. To join a lobby the user can click the "Join" button and if there is no lobby which suits the user, they can create a new lobby by clicking the "Create New Lobby" button.

![image](https://github.com/sopra-fs23-group-07/sopra-fs23-group-07-client/blob/main/Screenshots/SpeetUp%20Lobbies%20Page.png)

### Create Lobby

To create a lobby the user must first give the lobby a unique name, set the maximum number of participants and select a region where the event will take place. To create the event the user must simply click the "Create Lobby" button and they will be redireted to the lobby page.

![image](https://github.com/sopra-fs23-group-07/sopra-fs23-group-07-client/blob/main/Screenshots/SpeetUp%20CreateLobby%20Page.png)

### Lobby

While in the lobby a user must select at least one sport, date and time, and location which suits them. Instructions on how to make selections for the various categories can be found in a text box when hovering over the information icon next to the categoriy headers. Once all members have saved their choices or if the timer has run out, the majority of each category will be used to create a new event and all users of the lobby will be redirected to the event details page for that event. If at any time the user wishes to leave the lobby, they can click the "Leave Lobby" button. The user may also chat with other members of the lobby by clicking the "Open Chat" button on the bottom right of the screen.

![image](https://github.com/sopra-fs23-group-07/sopra-fs23-group-07-client/blob/main/Screenshots/SpeetUp%20Lobby%20Page.png)

### Share Lobby Invite Link

When in a lobby a user may want to share the lobby link to a friend so that they may also join the lobby. To accomplish this the user in the lobby can click the "Invite Friends" button which will open a pop up containg the lobby's link. The user can copy the link and send it to their friend or send it via WhatsApp, SMS or E-mail by clicking the respective icon.

![image](https://github.com/sopra-fs23-group-07/sopra-fs23-group-07-client/blob/main/Screenshots/SpeetUp%20Invite%20Link.png)

### Event Details

The event details page allows users to view the specifics about an event such as the sport, time, location and particpants of the event. If a user wishes to join the event and there is still space in the event, the user can click the "Join" button. Likewise if a user wishes to leave an event, they can click the "Leave" button. Incase a user wishes to share an event with a friend, sharing a link to an event is the same procedure as with a lobby.

![image](https://github.com/sopra-fs23-group-07/sopra-fs23-group-07-client/blob/main/Screenshots/SpeetUp%20EventDetails%20Page.png)

## Roadmap

### Friending
The next step for SpeetUp would be adding a friending system where users can friend in the app and share lobby invites directly through SpeetUp. 

### Private Lobbies

Another feature that could be implemented is private lobbies, where only those users invited can join. Then you can create a lobby with just your friends by only inviting them to the lobby.

### Rating Users

An additional feature could be the ability to rate users after an event is done. This way others can see if a user is fun to play with, or if he is not so friendly.


## Authors and Acknowledgments

* **Suleman Ali Khan** - *Developer* - [SuleKhan](https://github.com/SuleKhan)
* **Omar Abo Hamida** - *Developer* - [oaboha](https://github.com/oaboha)
* **Patrick Schelling** - *Developer* - [patrick9051](https://github.com/patrick9051)
* **Yannic Laurent Meyer** - *Developer* - [cinnayre](https://github.com/cinnayre) (committed with [yanmey](https://github.com/yanmey))
* **Raffael Kummer** - *Developer* - [theraffael](https://github.com/theraffael)

* **Mete Polat** - *Scrum Master* - [polatmete](https://github.com/polatmete)

## Credits

<a href="https://www.flaticon.com/authors/freepik" title="icons">Icons created by Freepik - Flaticon</a><br>

## License

MIT License

Copyright (c) [2023] [Suleman Ali Khan, Omar Abo Hamida, Patrick Schelling, Yannic Laurent Meyer, Raffael Kummer]

Permission is hereby granted, free of charge, to any person obtaining a copy
of this software and associated documentation files (the "Software"), to deal
in the Software without restriction, including without limitation the rights
to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
copies of the Software, and to permit persons to whom the Software is
furnished to do so, subject to the following conditions:

The above copyright notice and this permission notice shall be included in all
copies or substantial portions of the Software.

THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN THE
SOFTWARE.
