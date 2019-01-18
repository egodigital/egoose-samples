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
import * as express from 'express';


const API_USER = 'ego';
const API_PASSWORD = 'life20';
const API_REALM = 'e.GO Digital Realm';


class ApiHost extends egoose.ApiHost {
    // setup API
    protected setupApi(newApp: express.Express, newRoot: express.Router) {
        // Basic Auth
        newRoot.use(function (req, res, next) {
            try {
                const AUTHORIZATION = req.headers['authorization'];
                if (AUTHORIZATION) {
                    if (AUTHORIZATION.toLowerCase().startsWith('basic ')) {
                        const BASE64_HAS_TO_BE = new Buffer(`${ API_USER }:${ API_PASSWORD }`, 'ascii')
                            .toString('base64');

                        const BASE64_IS = AUTHORIZATION.substr(6)
                            .trim();

                        if (BASE64_HAS_TO_BE === BASE64_IS) {
                            return next();
                        }
                    }
                }
            } catch (e) {
                console.trace(e);
            }

            return res.header('WWW-Authenticate', `Basic realm="${ API_REALM }"`)
                .status(401)
                .send();
        });

        // [GET] /
        newRoot.get('/', async (req, res) => {
            return egoose.sendResponse(
                res, {
                    success: true,
                    data: await egoose.createMonitoringApiResult({
                        withAppVersion: true,
                    })
                }
            );
        });
    }

    // setup logger
    protected setupLogger(newLogger: egoose.Logger) {
        newLogger.addAction(log => {
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
    }
}


(async () => {
    const HOST = new ApiHost();

    HOST.poweredBy('e.GO Digital GmbH Aachen');

    await HOST.initialize();
    await HOST.start(8080);

    console.log(
        'API runs on port 8080 ...'
    );
})();