#!/usr/bin/env node

const ejs = require('ejs');
const fs = require('fs');

const data = require('./data/pres-data.json');

console.log('Start build...\n');

const htmlTemplate = fs.readFileSync('index.ejs.html', 'utf-8');

const htmlContent = ejs.render(htmlTemplate, data);

fs.writeFileSync('index.html', htmlContent, 'utf-8');

console.log('Build done successfully\n');