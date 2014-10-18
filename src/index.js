import BaseModule from './vendor/tatty-screen-base-module/index';
import ScanModule from './vendor/tatty-screen-scanlines/index';
import Screen from './vendor/tatty-screen/src/index';
import Prompt from './vendor/tatty-prompt/index';

var tty = document.getElementById( 'tty' );
var focussed = false;

var screen = new Screen( tty, {
    cols: 40,
    rows: 24,
    scanOffset: 2
}, [
    new ScanModule( 'scanModule', document.body )
]);

var prompt = new Prompt( tty );




screen.on( 'prompt', function( flag ) {
    if ( flag ) {
        prompt.focus();
    }
});

tty.addEventListener( 'click', function() {
    screen.emit( 'prompt', true);
});

prompt.on( 'input', function( char ) {
    screen.write( char );
    screen.emit( 'prompt', true );
});

prompt.on( 'focus', function( flag ) {
    screen.emit( 'showCursor', flag );
});

prompt.on( 'execute', function( cmd ) {
    console.log( 'command:', cmd );
    screen.writeln( 'SYSTEM DOWN' );
    screen.prompt();
});

prompt.on( 'delete', function() {
    screen.del();
});

prompt.on( 'navigate', function( code ) {
    // left
    if ( code === 37 ) {
        if ( screen.cursor.x <= 3 ) {
            return;
        }
        screen.setCursor( screen.cursor.x - 1, screen.cursor.y );
    }

    // right
    if ( code === 39 ) {
        if ( screen.cursor.x >= screen.currentLine.length ) {
            return;
        }
        screen.setCursor( screen.cursor.x + 1, screen.cursor.y );
    }
});





screen.writeln( 'I ❤︎ Harmony' );
screen.prompt();



window.scr = screen;
window.prompt = prompt;
window.tty = tty;
window.focussed = focussed;
