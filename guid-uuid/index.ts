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


// version 1
const GUID1_1 = egoose.guid('1');
const GUID1_2 = egoose.guid('v1');

// version 2
const GUID4_1 = egoose.guid();
const GUID4_2 = egoose.guid('4');
const GUID4_3 = egoose.guid('v4');

console.log(
    JSON.stringify([
        GUID1_1, GUID1_2,
        GUID4_1, GUID4_2, GUID4_3,
    ], null, 2)
);
