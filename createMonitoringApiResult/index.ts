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
import { table } from 'table';


(async () => {
    try {
        console.log('Generating API result data ...');

        const API_RESULT = await egoose.createMonitoringApiResult();

        const TABLE_DATA: any[] = [
            [ 'Property', 'Value' ]
        ];

        for (const KEY in API_RESULT) {
            TABLE_DATA.push(
                [ KEY, API_RESULT[KEY] ]
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