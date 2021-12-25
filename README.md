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

![image](https://user-images.githubusercontent.com/93989197/147381118-6ce4df15-0818-4dec-85f3-5af583064ed2.png)

Then I enabled the find controller for this content type from the setting:

![image](https://user-images.githubusercontent.com/93989197/147381196-5e3a0c5f-dab6-4170-9e0e-fa5d98ad0228.png)

Normally the API would return this data for this model: 

![image](https://user-images.githubusercontent.com/93989197/147381139-19b02121-75ed-417f-a321-995ade204e36.png)

But we can [overwrite/extend](https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#extending-core-controllers) the core find controller (you can also create a [new route/controller](https://docs.strapi.io/developer-docs/latest/development/backend-customization/controllers.html#adding-a-new-controller)) instead. 

![image](https://user-images.githubusercontent.com/93989197/147381156-c839e4f8-4804-4d9b-b361-7f704103ede4.png)

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

![image](https://user-images.githubusercontent.com/93989197/147381449-76b88af6-588a-4aa1-b18f-2bf7b22764a9.png)

Now of course, you should review the core controllers and your business logic to make sure you are handling permissions and parameter passing correctly and necessarily... but this should get you started!
