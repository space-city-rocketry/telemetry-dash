Telemetry Dash
==============

One Paragraph of project description goes here


Getting Started
---------------

These instructions will get you a copy of the project up and running on your local machine for development and testing purposes.


### Prerequisites

You will first need to install [Node.js](https://nodejs.org/en/). This project is built on and tested with version 8.1.2. If you already have Node installed, you may consider using [NVM]() to use the correct version of Node.

    nvm use


### Installing

The project dependencies will be installed automatically with the command:

    npm install

**NOTE:** This application expects a Mapbox API key to be set as an environment variable. This is simplified by the [dotenv](https://www.npmjs.com/package/dotenv) package. You need to create a file named `.env` in the project root and add the API key to it. If you don't do this, the application will run but the map tiles will not appear. See the `.env-example` file for how this should look.

To start the application, first connect the USB serial device then run

    npm run serve

the application will then be available at [localhost:3000](http://localhost:3000). Choose the serial device in the dropdown menu.


Running the tests
-----------------

Currently there are no tests. The horror!


### Coding style

This project follows a modified version of the AirBnB JS Style Guide. To ensure code is clean, use the [ESLint]() tool by running

    npm run lint -s

(the `-s` flag silences NPM error messages) or by setting up the ESLint package in your editor.


Deployment
----------

Add additional notes about how to deploy this on a live system


Built With
----------

* [Mapbox](https://www.mapbox.com) - The mapping framework used
* [React](https://reactjs.org) - Client UI Framework
* [Node.js](https://nodejs.org/en/) - Connects to the serial device and serves the client
* [Socket.io](https://socket.io) - Streams data from the serial device in real time


Contributing
------------

Please read [CONTRIBUTING.md]() for details on our code of conduct, and the process for submitting pull requests to us.


Versioning
----------

We use [SemVer](http://semver.org/) for versioning. For the versions available, see the [tags on this repository](https://github.com/your/project/tags).


Authors
-------

* **Maxwell Ciotti** - *Initial work* - [mdciotti](https://github.com/mdciotti)

See also the list of [contributors](https://github.com/your/project/contributors) who participated in this project.


License
-------

This project is licensed under the MIT License - see the [LICENSE.md](LICENSE.md) file for details


Acknowledgments
---------------

* Hat tip to anyone who's code was used
* Inspiration
* etc
