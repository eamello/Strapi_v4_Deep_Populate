'use strict';

/**
 *  layout controller
 */

const { createCoreController } = require('@strapi/strapi').factories;

module.exports = createCoreController('api::layout.layout', ({ strapi }) => ({
    async find(ctx) {
        const { query } = ctx;

        const entity = await strapi.entityService.findMany('api::layout.layout', {
            ...query,
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
        const sanitizedEntity = await this.sanitizeOutput(entity, ctx);

        return this.transformResponse(sanitizedEntity);

    }
}));
