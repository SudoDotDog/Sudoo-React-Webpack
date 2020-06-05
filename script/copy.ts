/**
 * @author WMXPY
 * @namespace Script
 * @description Copy
 */

import * as Fs from 'fs';
import * as Path from 'path';

const appPath: string = Path.join(__dirname, '..', 'app');
const sourcePath: string = Path.join(__dirname, '..', 'webpack');

Fs.mkdirSync(Path.join(appPath, 'public'));
Fs.copyFileSync(Path.join(sourcePath, 'public', 'template.ejs'), Path.join(appPath, 'public', 'template.ejs'));
