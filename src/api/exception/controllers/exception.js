'use strict';

/**
 * exception controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::exception.exception');
