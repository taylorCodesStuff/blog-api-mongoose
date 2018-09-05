"use strict";

exports.DATABASE_URL = process.env.DATABASE_URL || 'mongodb://taylor:hunter45@ds245082.mlab.com:45082/blog-api-mongoose';
exports.PORT = process.env.PORT || 8080;