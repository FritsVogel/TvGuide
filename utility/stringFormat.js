// @todo could have chosen to throw/catch exceptions rather than forcing a string to be returned

exports.schedule = (schedule) => {
    if(typeof(schedule) === 'undefined') {
        return '';
    }
    categoryTitles = exports.categories(schedule.p.categories ?? '');
    startDate = exports.date(schedule.s ?? '');
    startTime = exports.time(schedule.s ?? '');
    endDate = exports.date(schedule.e ?? '');
    endTime = exports.time(schedule.e ?? '');
    title = schedule.p.title ?? '';
    year = schedule.p.year ?? '';
    description = schedule.p.description ?? '';

    return `${startDate} ${startTime} - ${endDate} ${endTime} / ${title} (${categoryTitles} / ${year})\n` +
        `${description}\n` +
        `\n` +
        `--\n`;
};

exports.categories = (categories) => {
    items = [];
    if(typeof(categories) === 'object') {
        categories.forEach(category => {
            if(typeof(category.title) !== 'undefined') {
                items.push(category.title);
            }
        });
    }

    return items.join(', ');
};

exports.date = (timestamp) => {

    return new Date(timestamp).toLocaleDateString('nl-nl', {
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });
};

exports.time = (timestamp) => {

    return new Date(timestamp).toLocaleTimeString('nl-nl');
};

exports.filterArrayString = (fieldName, values) => {

    if(typeof(fieldName) !== 'string' || typeof(values) !== 'object') {
        throw new TypeError('fieldName should be a string, values should be an object');
    }

    var items = [];
    values.forEach(value => {
        if(typeof value == 'string') {
            value = `"${value}"`;
        }
        items.push(`{${fieldName}: ${value}}`);
    });

    return `[${items.join(',')}]`;
};
