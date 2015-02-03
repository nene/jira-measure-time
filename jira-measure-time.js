"use strict";

$(function(){
    var toolbar = $("#opsbar-opsbar-transitions").parent();
    if (!toolbar.length) {
        return;
    }

    $("head").append(
        "<style>" +
        ".jmt-start { color: green; }" +
        ".jmt-stop { color: red; }" +
        ".jmt-duration { padding-left: 1em; }" +
        "</style>"
    );

    var startTime;
    var totalDuration = 0;

    var startBtn = $("<button class='jmt-start'>Start</button>");
    startBtn.on("click", function(){
        startBtn.hide();
        stopBtn.show();

        startTime = new Date();
    });

    var stopBtn = $("<button class='jmt-stop'>Stop</button>");
    stopBtn.on("click", function(){
        stopBtn.hide();
        startBtn.show();

        totalDuration += new Date() - startTime;
        durationLabel.text(formatDuration(totalDuration));
        startTime = undefined;
    });
    stopBtn.hide();

    var durationLabel = $("<span class='jmt-duration'></span>");

    toolbar.append(startBtn);
    toolbar.append(stopBtn);
    toolbar.append(durationLabel);

    setInterval(function(){
        if (startTime) {
            durationLabel.text(formatDuration(totalDuration + (new Date() - startTime)));
        }
    }, 250);

    function formatDuration(ms) {
        var s = Math.floor(ms / 1000);
        var m = Math.floor(s / 60);
        s -= m * 60;
        var h = Math.floor(m / 60);
        m -= h * 60;

        return (
            (h > 0 ? h+"h " : "") +
            (m > 0 ? m+"m " : "") +
            s+"s"
        );
    }

});
