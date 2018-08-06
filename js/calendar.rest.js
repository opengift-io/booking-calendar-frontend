var CalendarRest = {
        'HANDLER': 'events.json',
        'send': function(data, callback) {
            var t = this;
            return $.post(
                t.HANDLER,
                data,
                callback
            );
        },
        'get': function(data, callback) {
            var t = this;
            return $.get(
                t.HANDLER,
                data,
                callback,
                'json'
            )
        },
        'updateEvent': function (id, data, callback) {
            if (!parseInt(id)) return;
            if (!data) return;

            var t = this;
            t.send(
                {
                    'action': 'update',
                    'id': id,
                    'fields': data
                },
                callback
            );
        },
        'addEvent': function(data, callback) {
            if (!data) return;
            var t = this;
            t.send(
                {
                    'action': 'add',
                    'fields': data
                },
                callback
            );
        },
        'getEvents': function (categoryId, participantId, year, month, day, callback) {
            if (!participantId) participantId = false;
            if (!categoryId) categoryId = false;

            if (!year) year = false;
            if (!month) month = false;
            if (!day) day = false;

            var t = this;
            t.get(
                {
                    'action': 'get',
                    'categoryId': categoryId,
                    'participantId': participantId,
                    'year': year,
                    'month': month,
                    'day': day
                },
                callback
            );
        }
    };