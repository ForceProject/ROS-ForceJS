# ROS-ForceJS

## Installation

Follow the following links to install both NodeJS and NPM onto your machine:
- [NodeJS](https://nodejs.org/en/) (You want v6.9.2)
- [NPM](https://docs.npmjs.com/getting-started/installing-node)

Now to download and run this program:
- Clone this repository onto your computer.
- Open a terminal and change directories into the **ForceJS** folder within this git repository.
- Run
```bash
npm install
```
to install all of the required packages.
- Now to actually run the program by starting webpack:
```bash
npm start
```

### Restarting Webpack
** Note that when new packages are installed, or the *webpack.config.js* file is modified, you must restart webpack. **
The webpack-dev-server can ususally be stopped by pressing **Control-C**.
To start it up again:
```bash
npm start
```

### Changing the target robot

Open the file webpack.config.js, from lines 9 to 15, you should see code that looks something like this:
```javascript
// default values will be overridden by current environment
var packageInfo = require('./package');
var env = {
    NODE_ENV: 'development',
    ROSBRIDGE_URI: 'ws://Orange.local:9090',
    PACKAGE_NAME: packageInfo.name,
    PACKAGE_VERSION: packageInfo.version
};
```
What you now want to do, is to change the value of **ROSBRIDGE_URI** to something like **'ws://<ip/hostname-of-robot>:9090'**.
Save the file and restart webpack.
The web-app should now, connect to and talk to the robot that you specified by IP or Hostname.

## Description

ForceJS is a basic port of the iOS Force app, linked [here](http://forceproject.github.io). This current port is designed to communicate using ROSBridge by publishing data to ROS Topics and subscribing to data sent from ROS Topics from the robot.
To publish data, the following information is required:
- The ROS Topic Name
- Type
- Message body structure
This web app currently does not support filling out header information for sending data.

To receive data, the same information is requred as publsihing the data, however, the *message body structure* is only there to be used as a reference to the data that you would like to read/retreive from what is received. Rather than entering the whole structure of the information that should be read, the following JSON is what is required:
```json
{
    "format":"<here>",
    "keys":["key 1", "key 2 withing key 1", 1]
}
```
As you can see in the above, **<here>** is in the format key. This is because **<here>** is a placeholder value and will be replace with the data that is received.
Now you ask: "If there are a bit of data I want to read from a JSON dictionary that is sent to me, how do I access that, and only that?"
...
Well, my friend, the solution is in the **"key"** value of the above JSON dictionary. Given a JSON input as follows:
```json
{
    "joint_names": [
        "head_pan_joint",
        "head_tilt_joint"
    ],
    "points": [
        {
            "positions": [
                2.345345435,
                -0.018430676901060112
            ],
            "velocities": [
                0.3,
                0
            ],
            "accelerations": [],
            "effort": [],
            "time_from_start": {
                "secs": 1,
                "nsecs": 150000000
            }
        }
    ]
}
```
and you want to read the data **0.3**, (find it for me, I can't be bothered to describe where it is), the value you would have in your **"keys"** would be:
```json
[ "points", "velocities", 0 ]
```
where by the first item in the array is the first key, the second is the second key, and the final number is the index of the item in the array that needs to be accessed.

## Known Issues
- There is no real purpose for the button as of yet.