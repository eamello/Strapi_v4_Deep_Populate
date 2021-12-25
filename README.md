# Introduction
I will explain and provide you with an example of how you can deeply populate nested components and dynamiz zones in the v4 of Strapi. 

# Structure
* I have created a single type content named **layout** with 2 dynamic zones and some nested fields and components to them
    * Header (Dynamic Zone)
       * Logo (Component)
    * Sidebar (Dynamic Zone)
       * Avatar (Component)
           * name
           * img
       * Menu (Component)
           * heading
           * links (Repeatable Component)
                * title
                * icon
![image|690x334](upload://eq50xw7MGYfFsHErysDI8cDFSxb.png)

Then I enabled the find controller for this content type from the setting:

![image|690x236](upload://aTSJZxvp1rTZUBXAEQQ8L56BQSU.png)

Normally the API would return this data for this model: 

![image|690x314](upload://wVKwcIowBlatfSDfTFU8gsNsbSL.png)

But we can [overwrite/extend](https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#extending-core-controllers) the core find controller (you can also create a [new route/controller](https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#adding-a-new-controller)) instead. 

![image|216x431](upload://aGNVjz9WgOLOyb9HQIeIeF4WpuS.png)

In order to do this, modify the code in the following file:
```
src\api\layout\controllers\layout.js
```

```javascript
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
```

> Pay attention to the **api::layout.layout** which is the UID for your specific content type and field.

Now that looks like the data we are looking for:
![image|690x396](upload://9ZvO4X421B3WzrXyoskjg3arCfD.png)

Now of course, you should review the core controllers and make sure you are handling sanitization and parameter passing etc... but this should get you started!

