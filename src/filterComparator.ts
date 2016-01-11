'use strict';

import {removeAccents} from './removeAccents';

export function filterComparator(obj, text: string) {
    if (obj && text && typeof obj === 'object' && typeof text === 'object') {
        for (var objKey in obj) {
            if (objKey.charAt(0) !== '$' && Object.prototype.hasOwnProperty.call(obj, objKey) &&
                filterComparator(obj[objKey], text[objKey])) {
                return true;
            }
        }
        return false;
    }

    if (text === undefined || text === null) {
        return false;
    }

    if (text === '') {
        return true;
    }

    text = text.toLowerCase();

    var textSplit = text.split(' ');

    for (var i = 0; i < textSplit.length; i++) {
        var result = removeAccents((`${obj}`).toLowerCase()).indexOf(removeAccents(textSplit[i])) > -1;

        if (!result) {
            return false;
        }
    }

    return true;
}