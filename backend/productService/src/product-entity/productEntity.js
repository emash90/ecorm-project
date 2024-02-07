const buildMakeProductEntity = () => {
    return function makeProductEntity({
        id,
        name,
        price,
        description,
        image,
        category,
        createdAt,
        updatedAt,
    }) {
        if (!id) {
        throw new Error('Product must have an id.');
        }
        if (!name) {
        throw new Error('Product must have a name.');
        }
        if (!price) {
        throw new Error('Product must have a price.');
        }
        if (!description) {
        throw new Error('Product must have a description.');
        }
        if (!image) {
        throw new Error('Product must have an image.');
        }
        if (!category) {
        throw new Error('Product must have a category.');
        }
        if (!createdAt) {
        throw new Error('Product must have a createdAt.');
        }
        if (!updatedAt) {
        throw new Error('Product must have a updatedAt.');
        }
    
        return Object.freeze({
        getId: () => id,
        getName: () => name,
        getPrice: () => price,
        getDescription: () => description,
        getImage: () => image,
        getCategory: () => category,
        getCreatedAt: () => createdAt,
        getUpdatedAt: () => updatedAt,
        });
    };
}

module.exports = buildMakeProductEntity;