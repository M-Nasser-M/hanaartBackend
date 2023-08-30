module.exports = ({ env }) => ({
  ckeditor5: {
    enabled: true,
  },
  seo: {
    enabled: true,
  },
  placeholder: {
    enabled: true,
    config: {
      size: 10,
    },
  },
  publisher: {
    enabled: true,
    config: {
      hooks: {
        beforePublish: async ({ strapi, uid, entity }) => {
          console.log("beforePublish");
        },
        afterPublish: async ({ strapi, uid, entity }) => {
          console.log("afterPublish");
        },
        beforeUnpublish: async ({ strapi, uid, entity }) => {
          console.log("beforeUnpublish");
        },
        afterUnpublish: async ({ strapi, uid, entity }) => {
          console.log("afterUnpublish");
        },
      },
    },
  },
  transformer: {
    enabled: true,
    config: {
      responseTransforms: {
        removeAttributesKey: true,
      },
      requestTransforms: {
        wrapBodyWithDataKey: true,
      },
    },
  },
  "local-image-sharp": {
    config: {
      cacheDir: ".image-cache",
      maxAge: 604800,
    },
  },
  "duplicate-button": true,
  "content-versioning": {
    enabled: true,
  },
  "import-export-entries": {
    enabled: true,
  },
  "fuzzy-search": {
    enabled: true,
    config: {
      contentTypes: [
        {
          uid: "api::product.product",
          modelName: "product",
          transliterate: true,
          fuzzysortOptions: {
            characterLimit: 300,
            threshold: -600,
            limit: 10,
            keys: [
              {
                name: "name",
                weight: 100,
              },
              {
                name: "description",
                weight: -100,
              },
            ],
          },
        },
      ],
    },
  },
});
