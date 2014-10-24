import BaseModule from './vendor/tatty-screen-base-module/index';
import ScanModule from './vendor/tatty-screen-scanlines/index';
import PrintModule from './vendor/tatty-screen-printer/index';
import Screen from './vendor/tatty-screen/src/index';
import Prompt from './vendor/tatty-prompt/index';

var tty = document.getElementById( 'tty' );
var focussed = false;

var screen = new Screen( tty, {
    cols: 40,
    rows: 24,
    scanOffset: 2,
    printDelay: 50
}, [
    new ScanModule( 'scanModule', document.body ),
    new PrintModule( 'printModule' )
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

// prompt.on( 'input', function( char ) {
//     screen.write( char );
//     screen.emit( 'prompt', true );
// });

prompt.on( 'focus', function( flag ) {
    screen.emit( 'showCursor', flag );
});

// prompt.on( 'execute', function( cmd ) {
//     console.log( 'command:', cmd );
//     screen.writeln( 'SYSTEM DOWN' );
//     screen.prompt();
// });

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





// screen.writeln( 'I ❤︎ Harmony' );
// screen.prompt();
// screen.write( 'syslog' );

var output = [
    '===============',
    'SYSTEM PRINTING',
    '===============',
    '    ',
    'OP 1: OPERATIONAL',
    'OP 2: OPERATIONAL',
    'OP 3: MALFUNCTION',
    '    ',
    'TAKE IMMEDIATE ACTION'
];

var index = 0;
var print = function() {
    screen.writeln();
    screen.print( output[ index ] );
}

screen.on( 'print:complete', function printing() {
    index++;

    if ( index >= output.length ) {
        screen.off( 'print:complete', printing );
        prompt.off( 'input', onExecute );
        prompt.off( 'execute', onExecute );

        screen.prompt();
        return;
    }

    screen.writeln( '<CONTINUE>' );
});

prompt.on( 'input', onExecute );
prompt.on( 'execute', onExecute );

function onExecute( char ) {
    screen.deleteln();
    print();
};

print();


// screen.writeln( 'This will cost more than that' );
// screen.setCursor( 5, 0 );
// screen.emit( 'prompt', true );
// screen.write( 'sure ' );
// screen.emit( 'prompt', true );
//
// screen.writeln();
//
// screen.writeln( 'This will cost more than that' );
// screen.setCursor( 5, 2 );
// screen.emit( 'prompt', true );
// screen.write( '<co> ' );
// screen.emit( 'prompt', true );
//
// screen.writeln();
//
// for ( var i = 0; i < screen.lines.length; i++ ) {
//     var len = screen.lines[ i ].childNodes.length ? screen.lines[ i ].childNodes[ 0 ].length : 0;
//     console.log( screen.lines[ i ].innerHTML.length, len );
// }
//
// screen.setCursor( 10, 2 );
// screen.emit( 'prompt', true );
// screen.write( 'Q' );


// screen.writeln( 'hello' );
// screen.writeln( 'world' );
// screen.deleteln();
// screen.emit( 'prompt', true );


window.scr = screen;
window.prompt = prompt;
window.tty = tty;
window.focussed = focussed;
