npm, short for node package manager, is a super useful tool that installs packages, updates packages, and manage dependencies. A plethora of node.js libraries and applications are published on npm. These applications can be searched for on <http://search.npmjs.org/>. Once you have a package you want to install, it can be installed with a single commmand which is handy for a node.js developer. 

Use case: Install a library
===========================
Let's say you are writing your program and you decide you need to use a library, for example: `underscore`. Thankfully npm is very simple to use, so all you have The commandline usage of npm is super simple. You can run `npm install underscore` to install the package in the current directory. So you run this at the root of your project, so `require` can find the libraries.

Use case: Install a program
===========================

If you want to install a cli tool globally, say `coffee-script`, you run `npm install coffee-script -g`. This will typically install the program to `/usr/local/bin/` which then will allow you to run the program on the console. For example, running `coffee` will now work and allow you to use the coffee-script REPL. 

Use case: Manage dependencies
=============================

Another way to use npm is when you have a node project with a <a href="package.json">package.json</a> file. You can run `npm install` and npm will install all the dependencies listed in the package.json. This makes it installing from a git repo much easier! For example, vows, one of node.js's testing frameworks, can be git cloned and it's single dependency (eyes) can be automatically handled:

Example:

    git https://github.com/cloudhead/vows.git
    cd vows
    npm install

After running those commands, you will see a `node_modules` folder with all of the project dependenecies specified in the package.json.
