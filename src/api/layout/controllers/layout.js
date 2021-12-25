'use strict';

/**
 *  layout controller
 */

const { createCoreController } = require('@strapi/strapi').factories;


module.exports = createCoreController('api::layout.layout', ({ strapi }) => ({
    async find(ctx) {
        const entry = await strapi.entityService.findMany('api::layout.layout', {
            populate: {
                header: {
                    populate: {
                        img: true
                    }
                },

                sidebar: {
                    populate: {
                        img: true, links: {
                            populate: {
                                icon: true
                            }
                        }
                    }
                },
            },
        });
        return entry
    }
}));
