/*
 * This file is part of the egoose-samples distribution (https://github.com/egodigital/egoose-samples).
 * Copyright (c) e.GO Digital GmbH (https://www.e-go-digital.com/).
 *
 * This program is free software: you can redistribute it and/or modify
 * it under the terms of the GNU General Public License as published by
 * the Free Software Foundation, version 3.
 *
 * This program is distributed in the hope that it will be useful, but
 * WITHOUT ANY WARRANTY; without even the implied warranty of
 * MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE. See the GNU
 * General Public License for more details.
 *
 * You should have received a copy of the GNU General Public License
 * along with this program. If not, see <http://www.gnu.org/licenses/>.
 */


import * as egoose from '@egodigital/egoose';


const LOGGER = egoose.createLogger((log) => {
    let icon: string;

    if (egoose.LogType.Emerg === log.type) {
        icon = `☢️`;
    } else if (egoose.LogType.Alert === log.type) {
        icon = `🚨`;
    } else if (egoose.LogType.Crit === log.type) {
        icon = `🧨`;
    } else if (egoose.LogType.Err === log.type) {
        icon = `❗️`;
    } else if (egoose.LogType.Warn === log.type) {
        icon = `⚠️`;
    } else if (egoose.LogType.Notice === log.type) {
        icon = `📢`;
    } else if (egoose.LogType.Info === log.type) {
        icon = `ℹ️ `;
    } else if (egoose.LogType.Debug === log.type) {
        icon = `🔬`;
    }

    console.log(
        `${ icon ? (icon + ' ') : '' } ${ log.time.format('YYYY-MM-DD HH:mm:ss') } => [${ log.tag }] ${ log.message }`
    );
});

LOGGER.emerg('This is an emergency', 'Tag 1');
LOGGER.alert('This is an alert', 'TAG 2');
LOGGER.crit('This is critical', 'tag 3');
LOGGER.err('This is critical', 'tag 4');
LOGGER.warn('Warning', 'tag 5');
LOGGER.note('A note', 'tag 6');
LOGGER.info('Some interesting info', 'tag 7');
LOGGER.dbg('Debug message', 'tag 8');
LOGGER.trace('Trace', 'tag 9');

console.log('');
