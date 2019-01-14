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
import { table } from 'table';


(async () => {
    try {
        console.log('Loading ...');

        const RESPONSE = await egoose.GET('https://randomuser.me/api?nat=de&results=20');
        if (200 !== RESPONSE.code) {
            throw new Error(`Unexpected response: [${ RESPONSE.code }] '${ RESPONSE.status }'`);
        }

        const API_RESULT = await RESPONSE.readJSON();

        const USERS: any[] = [];

        if (API_RESULT.results) {
            API_RESULT.results.forEach(u => {
                USERS.push([
                    u.login.uuid, `${ u.name.last }, ${ u.name.first }`, u.email
                ]);
            });
        }

        const TABLE_DATA: any[] = [
            [ 'ID', 'Name', 'E-Mail' ]
        ];

        for (const U of USERS) {
            TABLE_DATA.push(
                U
            );
        }

        console.log('');
        console.log(
            table(TABLE_DATA)
        );
    } catch (e) {
        console.log(
            `[ERROR] '${ egoose.toStringSafe(e) }'`
        );
    }

    console.log('');
})();