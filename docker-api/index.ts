/* 
 * This file is part of the XXX distribution (https://github.com/xxxx or http://xxx.github.io).
 * Copyright (c) 2015 Liviu Ionescu.
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
import * as moment from 'moment';
import { table } from 'table';


(async () => {
    console.log('Loading container list ...');

    // s. https://docs.docker.com/develop/sdk/examples/
    const CONTAINERS_RESPONSE = await egoose.GET('http:/v1.24/containers/json', {
        socket: '/var/run/docker.sock',
    });
    if (200 !== CONTAINERS_RESPONSE.code) {
        throw new Error(`Unexpected response, when requesting dontainer list: [${ CONTAINERS_RESPONSE.code }] '${ CONTAINERS_RESPONSE.status }'`);
    }

    const CONTAINERS = await CONTAINERS_RESPONSE.readJSON();
    if (CONTAINERS && CONTAINERS.length) {
        const TABLE_DATA: any[] = [
            [ 'ID', 'Name(s)', 'Created', 'State' ]
        ];

        for (const C of CONTAINERS) {
            TABLE_DATA.push(
                [ C.Id, C.Names.join(', '), moment.utc(C.Created * 1000).format('YYYY-MM-DD HH:mm'), C.State ]
            );
        }

        console.log('');
        console.log(
            table(TABLE_DATA)
        );
    } else {
        console.warn('No containers found!');
    }
})();