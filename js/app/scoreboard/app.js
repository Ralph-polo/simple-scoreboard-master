requirejs.config({
    baseUrl: 'js',
    paths: {
        app: 'app',
        lib: 'lib'
    },
    urlArgs: "bust=" +  (new Date()).getTime()
});

require([
    'jquery',
    'app/scoreboard/views/scoreboard'
], function ($, Scoreboard) {

        var app_channel = window.opener.Components.App;
        var scoreboard = new Scoreboard();

        if( window.opener.Components['Teams'] ) {
            var teams = window.opener.Components['Teams'];

            for(var i = 0; i < teams.length; i++) {
                scoreboard.addTeam( teams[i] );
            }

            scoreboard.render();
        }

        app_channel.on('Scoreboard.addRound', () => scoreboard.addRound() );
        app_channel.on('Scoreboard.addTeam', (team) => scoreboard.addTeam(team) );
        app_channel.on('Scoreboard.teamUpdated', (team) => {
            console.log("Team updated called");
            scoreboard.render()
        });
        app_channel.on('Scoreboard.deleteTeam', (team) => scoreboard.deleteTeam(team) );
    }
);
