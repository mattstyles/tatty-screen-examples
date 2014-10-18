
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
    scanOffset: 2
}, [
    new PrintModule( 'printf' ),
    new ScanModule( 'scanModule', document.body )
]);

tty.writeln( 'I ❤︎ Harmony' );
