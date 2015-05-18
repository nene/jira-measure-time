"use strict";

$(function(){
    if (!$(".aui-page-header-main").length) {
        return;
    }

    function TimeTracker(issueNr) {
        this.id = "timetracker-"+issueNr;
        this.load();
    }
    TimeTracker.prototype = {
        start: function() {
            this.data.startTime = new Date().getTime();
            this.save();
        },
        stop: function() {
            this.data.duration = this.getRunningDuration();
            delete this.data.startTime;
            this.save();
        },
        reset: function() {
            delete this.data.startTime;
            delete this.data.duration;
            this.cleanup();
        },

        getStartTime: function() {
            return this.data.startTime;
        },
        getDuration: function() {
            return this.data.duration || 0;
        },

        isRunning: function() {
            return !!this.data.startTime;
        },
        getRunningDuration: function() {
            if (!this.isRunning()) {
                return this.getDuration();
            }
            return this.getDuration() + (new Date() - this.data.startTime);
        },

        save: function() {
            localStorage[this.id] = JSON.stringify(this.data);
        },
        load: function() {
            try {
                this.data = JSON.parse(localStorage[this.id]);
            }
            catch (e) {
                this.data = {};
            }
        },
        cleanup: function() {
            delete localStorage[this.id];
        }
    };

    function initStyles() {
        $("head").append(
            "<style>" +
            ".jmt-label { padding-right: 1em; }" +
            ".jmt-start { color: green; }" +
            ".jmt-stop { color: red; }" +
            ".jmt-duration { padding: 0 1em; }" +
            "</style>"
        );
    }

    var startBtn;
    var stopBtn;
    var resetBtn;
    var durationLabel;
    var timeTracker = new TimeTracker(extractIssueNr(document.location.href));

    function initUI() {
        var header = $(".aui-page-header-main");

        startBtn = $("<button class='jmt-start'>Start</button>");
        startBtn.on("click", function(){
            timeTracker.start();
            updateButtonsVisibility();
        });

        stopBtn = $("<button class='jmt-stop'>Stop</button>");
        stopBtn.on("click", function(){
            timeTracker.stop();
            updateButtonsVisibility();
            displayDuration(timeTracker.getDuration());
        });

        resetBtn = $("<button class='jmt-reset'>x</button>");
        resetBtn.on("click", function(){
            timeTracker.reset();
            updateButtonsVisibility();
            displayDuration(timeTracker.getDuration());
        });

        durationLabel = $("<span class='jmt-duration'></span>");
        displayDuration(timeTracker.getRunningDuration());

        updateButtonsVisibility();

        header.append("<span class='jmt-label'>Time tracking:</span>");
        header.append(startBtn);
        header.append(stopBtn);
        header.append(durationLabel);
        header.append(resetBtn);
    }

    initStyles();
    initUI();

    setInterval(function(){
        ensureContainerPresent();
        if (timeTracker.isRunning()) {
            displayDuration(timeTracker.getRunningDuration());
        }
    }, 250);

    function updateButtonsVisibility() {
        if (timeTracker.isRunning()) {
            startBtn.hide();
            stopBtn.show();
        }
        else {
            startBtn.show();
            stopBtn.hide();
        }
    }

    function extractIssueNr(url) {
        var matches = url.match(/browse\/([\w\d-]+)/);
        return matches[1];
    }

    function ensureContainerPresent() {
        if ($(".jmt-duration").length === 0) {
            initUI();
        }
    }

    function displayDuration(ms) {
        durationLabel.text(formatDuration(ms));
    }

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
