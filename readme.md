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