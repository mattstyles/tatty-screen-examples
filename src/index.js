
// import baseModule from './vendor/BaseModule/src/index';
// import Tatty from './vendor/tatty-screen/src/index';
//
// class PrintModule extends baseModule {
//     constructor( name='printModule' ) {
//         this.name = name;
//     }
//
//     init() {
//         console.log( 'printModule:init' );
//     }
//
//     expose() {
//         return {
//             printf: function( str ) {
//                 console.log( str );
//             }
//         }
//     }
// }
//
//
// window.tty = new Tatty( document.querySelector( '#tty' ), {
//
// }, [
//     new PrintModule( 'printModule2' )
// ]);
//
// tty.writeln( 'hello world' );

import Screen from './vendor/tatty-screen/tatty-screen';

window.tty = new Screen( document.querySelector( '#tty' ), {
    cols: 30,
    rows: 20
});

tty.writeln( 'This is Harmony' );
tty.prompt();
