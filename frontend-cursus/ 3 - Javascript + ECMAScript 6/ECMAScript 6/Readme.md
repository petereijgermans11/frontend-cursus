# Homework week 2

This is the homework for week 2.
You must have node installed.

In this exercise we will create a very simple filewalker.


---

## NPM

Take a look at the package.json.

This is important for NPM. With this file you can declare all your dependencies and install them.

Open your prompt/shell/terminal in this directory and type `npm install --save filewalker`.
A couple of things have happened:
 - NPM installed the `filewalker` dependency locally in the node_modules folder
 - NPM add `filewalker` to the dependency list
 
Great! This means that we are now able to use this dependency.
[Documentation of filewalker](https://www.npmjs.com/package/filewalker) 
[Quick quide for NPM](https://github.com/kss-node/kss-node/wiki/npm-quick-start-guide) 

If you ever need to use npm, just type npm init on the commandline.
You will then be presented with a simple commandline dialog in order to create the package.json.

---

## Node

Type the following command in your terminal: `node nodeScript.js`
By using this command Node.js will execute the `nodeScript.js` script.

We have just installed the filewalker dependency, let's use it!
First we need to require the dependency: 
```
const filewalker = require('filewalker');
```

Node will now require this dependency for us.
Using the following code we can traverse a directory:
```
filewalker('A_DIRECTORY')
  .on('dir', p => console.log('dir:  %s', p))
  .walk();
```

Try running the nodeScript file again, do see some output?
Let's add some more functions into the mix:
```
filewalker('A_DIRECTORY')
.on('dir', p => console.log('dir:  %s', p))
    .on('file', (p, s) => console.log('file: %s, %d bytes', p, s.size))
    .on('done', () => console.log('%d dirs, %d files, %d bytes', this.dirs, this.files, this.bytes))
    .walk();
```

It's that simple.
We can of course implement in the "fs" dependency from node itself, but somebody already did it for us :)

The node api documentation can be found [here](https://nodejs.org/api/).
