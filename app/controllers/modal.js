'use strict';

vms.controller('ModalInstanceCtrl', function ($scope, $uibModalInstance, uiCalendarConfig) {

    $scope.eventSources = [];
    $scope.events = [];

    $scope.updateEvents = function (times) {

        $scope.times.forEach(function (time, index) {

            if (!time.is_multiple) {
                return;
            }

            var week_count = time.week_number;

            var past_dates = [];

            for (var i = 0; i < week_count; i++) {

                var j = 1;
                for (var week_day in time.week_days) {

                    if (!time.week_days[week_day]) {
                        j++;
                        continue;
                    }

                    var week;

                    if (moment().add(i, 'week').day(j) <= moment() || past_dates.indexOf(j) > -1) {
                        if (past_dates.indexOf(j) < 0) {
                            past_dates.push(j);
                        }
                        week = moment().add(i + 1, 'week').day(j);
                    } else {
                        week = moment().add(i, 'week').day(j);
                    }

                    $scope.events.push({
                        color: time.color,
                        start: week.toDate(),
                        className: ['openSesame']
                    });
                    j++;
                }
            }

            $scope.eventSources = [];
            $scope.eventSources = [$scope.events];

            uiCalendarConfig.calendars.myCalendar.fullCalendar('removeEvents');
            uiCalendarConfig.calendars.myCalendar.fullCalendar('addEventSource', $scope.events);

        });
    };

    $scope.$watch('times', function (times) {
        $scope.events = [];
        if (uiCalendarConfig.calendars.myCalendar != undefined) {
            uiCalendarConfig.calendars.myCalendar.fullCalendar('removeEvents');
            uiCalendarConfig.calendars.myCalendar.fullCalendar('addEventSource', $scope.events);
        }

        $scope.updateEvents(times);
    }, true);

    $scope.times = [
        {
            color: '#62b2f7',
            hour: 5,
            minute: 20,
            delivery_speed: 30,
            is_multiple: false,
            week_days: {
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false,
                Sunday: false
            },
            week_number: 0
        }
    ];

    $scope.save = function () {
        $uibModalInstance.close();
    };

    $scope.slider = {
        value: 120,
        options: {
            showSelectionBar: true,
            hideLimitLabels: true,
            hidePointerLabels: true,
            ceil: 120,
            floor: 0
        }
    };

    $scope.colors = [
        '#f35653',
        '#fff46f',
        '#62f3e5'
    ];

    $scope.addTimeSlot = function () {
        if ($scope.times.length >= 4) {
            return false;
        }

        var color = $scope.colors[Math.floor(Math.random() * $scope.colors.length)];
        var colorIndex = $scope.colors.indexOf(color);
        if (colorIndex > -1) {
            $scope.colors.splice(colorIndex, 1);
        }

        $scope.times.push({
            color: color,
            hour: 5,
            minute: 20,
            delivery_speed: 30,
            is_multiple: false,
            week_days: {
                Monday: false,
                Tuesday: false,
                Wednesday: false,
                Thursday: false,
                Friday: false,
                Saturday: false,
                Sunday: false
            },
            week_number: 0
        });
    };

    $scope.removeTimeSlot = function (index) {

        if (index > -1) {
            var color = $scope.times[index].color;
            $scope.colors.push(color);
            $scope.times.splice(index, 1);
        }
    };

    $scope.dpOptions = {
        customClass: getDayClass,
        minDate: new Date(),
        showWeeks: false,
        startingDay: 1
    };

    function getDayClass(data) {

        var date = data.date,
            mode = data.mode;
        if (mode === 'day') {
            var dayToCheck = new Date(date).setHours(0, 0, 0, 0);

            for (var i = 0; i < $scope.events.length; i++) {
                var currentDay = new Date($scope.events[i].date).setHours(0, 0, 0, 0);

                if (dayToCheck === currentDay) {
                    return $scope.events[i].status;
                }
            }
        }

        return '';
    }
});
