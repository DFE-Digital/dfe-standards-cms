const { v4: uuidv4 } = require('uuid');

module.exports = {
    async beforeCreate(event) {
        if (!event.params.data.uniqueId) {
            event.params.data.uniqueId = uuidv4();
        }
    },

    async beforeUpdate(event) {
        const { data, where } = event.params;

        console.log(where)


        // Fetch the current standard
        const existingStandard = await strapi.entityService.findOne('api::standard.standard', where.id);


        const currentVersion = existingStandard.version || 0;

        // Increment the version by 0.01
        const newVersion = parseFloat((currentVersion + 0.01).toFixed(2));

        // Update the version field
        data.version = newVersion;

    },
};