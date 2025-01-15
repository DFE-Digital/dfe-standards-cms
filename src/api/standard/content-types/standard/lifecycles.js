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


        console.log('existingStandard', existingStandard)

        const currentVersion = existingStandard.version || 0;

        // Increment the version by 0.01
        const newVersion = parseFloat((currentVersion + 0.01).toFixed(2));

        // Update the version field
        data.version = newVersion;

    },

    async afterUpdate(event) {
        const { result, params } = event;

        // Check if the 'publishedAt' field has been set (indicating publish)
        if (result.publishedAt && params.data.publishedAt === result.publishedAt) {
            console.log(`Content type "${result.id}" was published!`);

            console.log(result)
            console.log(params)

            const updatedStandard = await strapi.entityService.findOne('api::standard.standard', result.id);

            console.log('updatedStandard', updatedStandard)
            // Add your custom logic here
            // Example: Trigger an external API or log the event
            await customLogic(result);
        }
    }
};