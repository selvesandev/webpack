# Webpack

### Installation
Can be installed locally or globally.
``` npm init -y``` to create the package.json file at first  

Then install webpack
```
npm install --save-dev webpack
```

Current Version of webpack
```
"devDependencies": {
    "webpack": "^3.8.1"
  }
```

Now type `webpack` and hit enter. You may get command not found error. The webpack command is inside
the `/node_modules/.bin/webpack` therefor you can add this directory to your path or you can simply
write full path in the terminal `node_modules/.bin/webpack`  

or you can add an **npm script**  
Npm scripts are nice.  
package.json file
```
"scripts": {
    "selvesan": "echo \"Selvesan Malakar\""
  },
```
Hit `npm run selvesan` in terminal  

For the webpack
```
"scripts": {
  "build": "webpack src/main.js dist/build.js",
  "watch": "webpack src/main.js dist/build.js --watch"
  
  or
  
  "watch": "npm run dev -- --watch"  
},
```
**Note** that we are ignoring the node_modules/.bin in this command because it's fine when we do it here.

```
No configuration file found and no output filename configured via CLI option.
```
If you get this error when running the webpack. What's happening is it is trying 
to use the configuration file to decide how it should compile your code but we have not created one.  

You can create the node configuration file by specifying your src file and destination file for the compiled output
```
node_modules/.bin/webpack src/main.js dist/bundle.js
```
**Note** the src/main.js file should be already created.  
dist/bundle.js with all the compiled should be created.  


Create a index.html file
```html
<!doctype html>
<html lang="en">
<head>
    <meta charset="UTF-8">
    <title>Webpack</title>
</head>
<body>

<script type="text/javascript" src="dist/bundle.js"></script>
</body>
</html>

```

#### watch
so that you don't have to run the command to compile the code every time some changes are made.
```
node_modules/.bin/webpack src/main.js dist/bundle.js --watch
```

## Compiling With Webpack
For small projects compiling like we did above would be fine but for real life large projects
we will be doing quite a bit more.  
so create a `webpack.config.js` file

When this file is in you project root folder the `webpack` command will automatically trigger it. However if you 
store it anywhere else you can specify it specifically `webpack --config="node_modules\location"`   
webpack.config.js
```
var webpack = require('webpack');
var path = require('path');
module.exports = {
    entry: './src/main.js',
    output: {
        path: path.resolve(__dirname, './dist'),
        filename: 'bundle.js'
    }
};
```
* Require the webpack module first
* Export an object where we will declare the entry, exit, plugin, loader are defined
* `entry`  refers to the your source code location
* `output` is a json that contains `path` dirname of the output file and `filename` name of the output file here `bundle.js`
* better if you use absolute path rather than absolute path using the the path node module when specifying the path name 
* Now you can update your `package.json` file.
```
"scripts": {
    "build": "webpack",
    "watch": "webpack --watch"
  }
```

### ES2015 Modules
Fancy words for js files. Any file can expose anything at once function, class or multiple function to the outside world.
With modules we can divide our javascript classes into any number of files.
  
./src/Notification.js
 ```
 export default function (message) {
     console.log(message);
 }
 ```
 ./src/main.js
 ```
 import notification from './Notification'
 notification('notified.');
 ```
 
 **OR you can also do (commonjs)**
 
 ```
  module.exports=function(message){
  console.log(message);
  }
 ```
 
 ```
 var notify =require('./Notification');
 ```
 
 Better if you use es2015 module.  
** If default is not used **
```
export function notify(message) {
    console.log(message);
}
```
```
import {notify} from './Notification'
notify('notified.');
```

#### Import Multiple Items
export
```
export function notify(message) {
    console.log(message);
}

export function warn(message) {
    console.warn(message);
}
```
import 
```
import {notify} from './Notification'
import {warn} from "./Notification";

``` 

Or you can do
 
 ```
 function notify(message) {
     console.log(message);
 }
 
 function warn(message) {
     console.warn(message);
 }
 
 export default {
    warn:warn,
    notify:notify
 }
 ```
