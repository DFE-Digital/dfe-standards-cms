const { v4: uuidv4 } = require('uuid');

module.exports = {
    async beforeCreate(event) {
        if (!event.params.data.uniqueId) {
            event.params.data.uniqueId = uuidv4();
        }
    },

    // Increment the version number by 0.01 whenever there is a change on any field
    async beforeUpdate(event) {
        const { data, where } = event.params;

        console.log(where)
        console.log(data)


        // Fetch the current standard
        const existingStandard = await strapi.entityService.findOne('api::standard.standard', where.id);


        data.isModified = 1;

    },

    async afterUpdate(event) {
        const { result, params } = event;

        console.log(result)
        console.log(params)

        const updatedStandard = await strapi.entityService.findOne('api::standard.standard', result.id);

        console.log('updatedStandard', updatedStandard)

    }
};