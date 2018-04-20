const filewalker = require('filewalker');
// In this script we will create a file walker
// You can run this from commandline with: `node nodeScript.js`, try it out!

console.log('hello world');

filewalker('node_modules')
.on('dir', p => console.log('dir:  %s', p))
.on('file', (p, s) => console.log('file: %s, %d bytes', p, s.size))
.on('done', () => console.log('%d dirs, %d files, %d bytes', this.dirs, this.files, this.bytes))
.walk();
