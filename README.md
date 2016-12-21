# ROS-ForceJS

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
                "<this(Float64)>",
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