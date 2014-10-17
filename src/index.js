
import BaseModule from './vendor/tatty-screen-base-module/index';
import ScanModule from './vendor/tatty-screen-scanlines/index';
import Screen from './vendor/tatty-screen/src/index';

class PrintModule extends BaseModule {
    constructor( name='printModule' ) {
        this.name = name;
    }

    init() {
        console.log( 'printModule:init' );
    }

    expose() {
        return {
            printf: function( str ) {
                console.log( str );
            }
        }
    }
}


window.tty = new Screen( document.querySelector( '#tty' ), {
    cols: 40,
    rows: 24,
    scan: false
}, [
    new PrintModule( 'printf' ),
    new ScanModule( 'scanModule' )
]);

tty.writeln( 'hello world' );

// import Screen from './vendor/tatty-screen/tatty-screen';
//
// window.tty = new Screen( document.querySelector( '#tty' ), {
//     cols: 30,
//     rows: 20
// });
//
// tty.writeln( 'This is Harmony' );
// tty.prompt();
