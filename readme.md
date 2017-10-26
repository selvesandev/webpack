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

### Loaders 
One of the greatest thing about webpack is that we can teach it how to process or transform any kinds of file.
Before diving into a loader lets see what problem we may face 

./src/css/main.css
```
body {
    background: #eee;
}

```
./src/main.js
```
require('./css/main.css')
```
Webpack will not understand the css code and will hence give the **error**.
```
ERROR in ./src/css/main.css
Module parse failed: Unexpected token (1:5)
You may need an appropriate loader to handle this file type.
| body {
|     background: #eee;
| }
 @ ./src/main.js 5:0-25

```
You might need a appropriate loader to handle this file.
so `loader` teach webpack or introduce the functionality to transform any kind of file that it is optimised for.
so here we want a css loader.

```
npm install --save-dev css-loader 
```
* the css loader read style sheet.
* it will dynamically update any css imports or css url fields.  

Now update your `webpack.config.js` file add a `module` object to the webpack's main object where we
will provide a rule that uses regex to select all the .css file and use the `css-loader`
```
module: {
        rules: [
            {
                test: /\.css$/,
                use: 'css-loader'//[array if multiple loader are used]
            }
        ]

    }
```
Now the css-loader will successfully transpile all your css code to you `bundle.js` file **but** it will not take effect on the page.  
If you want to apply the transpiled css to the page you will have to use another loader 
`style-loader`
```
npm install --save-dev style-loader
```
* the style-loader will take any css from you webpack build and inject it into the page.  

now add it to your webpack configuration
```
module: {
        rules: [
            {
                test: /\.css$/,
                use: ['style-loader', 'css-loader']//[array if multiple loader are used]
            }
        ]

    }
```
**Note** here we have used first `style-loader` and then `css-loader` in the use array because this will take effect from right to left therefore we will first 
transpile the file with .css extension and then use it on the page with `style-loader` right to left.


### Compile ES6 code with babel
```
class Form{
    
}
```

This code will run in latest browsers but now all browsers so what we can do is compile it down to vanilla javascript. 
We neet another loader to transpile this code. we can use babel for that.  
go to  (https://babeljs.io/) > docs > setup > webpack  
get the installation process there.
```
npm install --save-dev babel-loader babel-core
```
update the webpack.config.js file with a new rule

```
{
   test: /\.js$/,
   exclude: /node_modules/,
   loader: "babel-loader"
}
```
* compile all the .js file excluding that is inside the node_module
* use the babel loader to compile.  

Now final thing that you need to do is install the preset and create a `.babelrc` file
```
npm install babel-preset-env --save-dev
``` 

.babelrc
```
{
  "presets": [
    "env"
  ]
}
```
Without any configuration options, babel-preset-env behaves exactly the same as babel-preset-latest (or babel-preset-es2015, babel-preset-es2016, and babel-preset-es2017 together).


### Minification and Environment Setup (Dev,Production)

Like loaders there is also the concept of plugins this is what we are going to use to uglify the code.  
For the plugin add a `plugins` object just after the module in your
webpack.config.js with the uglify code.
```
plugins: [
        new webpack.optimize.UglifyJsPlugin()
    ]
```
Now this will minify the code.

##### Uglifying only for the production environment.
Adding the above uglifying code only if the environment is production. 
**Add this code to the bottom of your webpack.config.js file**

```
if (process.env.NODE_ENV === 'production') {
    module.exports.plugins.push(
        new webpack.optimize.UglifyJsPlugin()
    );
}
```

Now trigger the Production environment from shell.
  
terminal
```
NODE_ENV=production node_modules/.bin/webpack
```

creating short cut for this command in package.json file
```
"scripts": {
    "build": "webpack",
    "production":"NODE_ENV=production webpack",
    "watch": "webpack --watch"
  },
```

```
npm run production
```


### Sass Compilation
Here we will need a loader `sass-loader` which will take case of the webpack process but
we also want the `node-sass` compiler that actually does the work.   
`npm install --save-dev sass-loader node-sass`
Add a new rule object
```
{
   test: /\.s[ac]ss$/,
   use: ['css-loader','sass-loader']
},
```
* compile all file that has .sass or .scss extension  
* here we also need a `css-loader` because the webpack should know the css file after it gets compiled.
* `style-loader` will inject the file to the page  
./src/scss/main.scss
```
$back-color: #eee;
body {
  background: $back-color;
}
```
./src/main.js
```
require('./scss/main.scss');

```
Now the scss or sass will be successfully compiled to the bundle.js injected to the page .  

### Extract css to a file.
we can do this in webpack downloading a webpack [plugin](https://github.com/webpack-contrib/extract-text-webpack-plugin)  
1) First download the plugin
`npm install --save-dev extract-text-webpack-plugin`  
2) Require the plugin in webpack.config.js file   
`const ExtractTextPlugin = require("extract-text-webpack-plugin");`  

3) Update the code in your webpack.config.js to determine where you want to extract all your scss code.
```
{
   test: /\.s[ac]ss$/,
   use: ExtractTextPlugin.extract({
   use: ['css-loader', 'sass-loader'],
     fallback: 'style-loader'
   })
}
```

4) Finally reference your new plugin in the plugins array list.
```
plugins: [
        new ExtractTextPlugin('style.css')
    ]
```

Now all your scss or sass file will be compiled to `./dist/style.css`

#### Info
If you want to use the entry name you can use the placeholder 
```
plugins: [
        new ExtractTextPlugin('[name].css')
    ]
    
```
or
```
output: {
        path: path.resolve(__dirname, './dist'),
        filename: '[name].js'
    },
```

so now if you compile it down you will get `main.css` which is the name of your entry in webpack.config.js 
`entry: './src/main.js'` which can be useful in lot of cases.
  
  
----   
For entry you generally use string 
`entry: './src/main.js'`

but you can also use an object.
```
entry: {
        app: './src/main.js'//this is my app entry point
    },
```

  
****
If you do not want require css in your javascript file you can also reference that within
your webpack configuration file by adding it to your app entry point.
```
entry: {
        app: [
            './src/main.js',
            './src/scss/main.scss'
        ]//this is my app entry point
    },
```
**Note** that this will not minimize the css code we need a way to tell our loaders whether to operate within a minimize mode.  
search for `loaderoptionsplugin` place the code in the plugins section
```
plugins: [
        new ExtractTextPlugin('style.css'),
        new webpack.LoaderOptionsPlugin({
            minimize: true
        })
    ]
```   

Here rather than specifying the minimize option directly to true we can use the `inProduction` variable that we have
in order to minimize the code only in the production mode.
```
npm run build //will not minimize the code.
npm run production //will minimize the code.
```


## Relative CSS URLs
when we are referencing an image in our css,sass or scss file and if you give the location or src
of the image relative to where the code is going to be bundled up the webpack compilation will fail.
  
For eg:- 
all your compiling code are going to the `/dist` directory and there you have a image inside /dist/img/image.jpeg
You assume this path in the source scss file but the webpack will show error since the file will not be found in the src directory
when compiling the code.
```
Can't resolve './img/owl.jpg' in '/home/selvesan/Documents/localdev/webpack/src/scss'

```
There are couple of ways to fix this.  
**use an absolute path**  
this means use the url like this.
```
  background: url("/img/owl.jpg");
``` 
not like this
```
  background: url("./img/owl.jpg");
``` 
Now the css-loader will ignore this entirely.  

**Another options is to** 
update our webpack file and instruct the css loader to not include urls we can do that with an option
go to the css-loader github and checkout the options we can disable the url handling entirely.

```
{
    test: /\.s[ac]ss$/,
    use: ExtractTextPlugin.extract({
         // use: ['css-loader', 'sass-loader'],
         use: [
         {
            loader: 'css-loader',
                options: {url: false}//don't handle the urls
            },
            'sass-loader'
         ],
         fallback: 'style-loader'
    })
}
```

**Another method is to use the raw-loader**
This will help us to import the file as string and do no processing.
```
npm install --save-dev raw-loader
```

```
{
    test: /\.s[ac]ss$/,
    use: ExtractTextPlugin.extract({
         use: ['raw-loader', 'sass-loader'],
         fallback: 'style-loader'
    })
}

```
This will give the exact same thing like above.  

**Another Method is to copy the image with webpack**
you can keep your images in your source folder. If the webpack finds the relative path in the css file it will find the image and move it
to the compiled file location here `dist` directory. For this to work 
setup a new test in the webpack config file and also download the `file-loader`.
  
```
{
    test: /\.(png|jpe?g|giff|svg|eot|ttf|woff|woff2)$/,
    use: 'file-loader'
},
```
`npm run build` will copy the file to the dist folder md5 the file name and rewrite the url so that the url will reference to the file.
  
To move the file in a specific directory with a specific name use the below syntax  
```
{
    test: /\.(png|jpe?g|giff|svg|eot|ttf|woff|woff2)$/,
    loader: 'file-loader',
    options: {
        name: 'images/[name].[hash].[ext]'
    }
},
```
will generate a file with a filename.randommd5hash.extension in the img directory.

### Strip Unused CSS. (purifycss-webpack)

```
npm i -D purifycss-webpack purify-css

```
This will scan all the view or html of your website and then it is going to compare that against your style sheet.
and if it finds selectors that is in the css for not in html it will simply remove the css and reduce the css. 
__Add purify css plugin to webpack__
```

const glob = require('glob');
const PurifyCSSPlugin = require('purifycss-webpack');
plugins: [
        new PurifyCSSPlugin({
            paths: glob.sync(path.join(__dirname, 'index.html'))//'app/*.html' or //resources/views/**/*.blade.php,
            minimize: inProduction
                
        })
    ]
```

__Note__ if you ignore the minimize true it will default to false and your css file will not be minified even in the production
mode



- [ ] Mercury
- [x] Venus
- [x] Earth (Orbit/Moon)
- [x] Mars
- [ ] Jupiter
- [ ] Saturn
- [ ] Uranus
- [ ] Neptune
- [ ] Comet Haley
