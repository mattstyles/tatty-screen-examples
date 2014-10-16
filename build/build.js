#!/usr/bin/env node

var path = require( 'path' );
var fs = require( 'fs' );
var builder = require( 'systemjs-builder' );

var src = path.join( __dirname, '../src' );
var dist = path.join( __dirname, '../dist' );
var modules = path.join( __dirname, '../node_modules' );

// Paths need to reference the name of the file and need to be
// unique for the modules to be registered properly.
// The problem with this approach is that build modules will have
// already declared their module name, which may conflict with
// other modules. Easiest solution is that module names should be
// more strictly qualified.
//
// Or, modules in this repo can access src files in src/vendor and
// have system-builder build them all now. Only issue there is that
// each dependency of the modules will need to be included here also,
// as well as being brought into this repo and that could get tricky.

builder.build( 'index', {
    baseURL: path.resolve( src ),
    // paths: {
    //     base: path.resolve( src, 'vendor/BaseModule/dist/base.js' ),
    //     screen: path.resolve( src, 'vendor/tatty-screen/dist/screen.js' ),
    //     EventEmitter: path.resolve( src, 'vendor/EventEmitter/index.js' )
    // }
}, path.join( dist, '/index.js' ) )
    .then( function() {
        console.log( 'Build complete' );
    })
    .catch( function( err ) {
        console.error( err );
    });

fs.readFile( path.join( modules, 'traceur/bin/traceur-runtime.js' ), 'utf8', function( err, file ) {
    fs.writeFile( path.join( dist, 'common/traceur-runtime.js' ), file, 'utf8' );
});

fs.readFile( path.join( modules, 'es6-module-loader/dist/es6-module-loader.src.js' ), 'utf8', function( err, file ) {
    fs.writeFile( path.join( dist, 'common/es6-module-loader.js' ), file, 'utf8' );
});

fs.readFile( path.join( modules, 'systemjs/dist/system.src.js' ), 'utf8', function( err, file ) {
    fs.writeFile( path.join( dist, 'common/system.js' ), file, 'utf8' );
});
