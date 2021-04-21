"use strict";
const slugify = require("slugify");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

module.exports = {
  /**
   * Triggered before user creation.
   */
  lifecycles: {
    async beforeCreate(data) {
      console.log("beforeCreate >> data: >> ", data);
      if (data.artist) {
        //
        const slugString = await getSlugString(data.artist, data.title);
        data.slug = slugify(slugString, { lower: true });
        //
      } else if (data.title) {
        data.slug = slugify(data.title, { lower: true });
      }

      // data.lyrics = strapi.services.tabtochordpro.tabToChordPro(data.lyrics);
    },

    async beforeUpdate(params, data) {
      console.log("beforeUpdate >> data: >> ", data);
      if (data.artist) {
        //
        const slugString = await getSlugString(data.artist, data.title);
        data.slug = slugify(slugString, { lower: true });
        //
      } else if (data.title) {
        data.slug = slugify(data.title, { lower: true });
      }

      if (data.lyrics) {
        const chordProLyrics = strapi.services.tabtochordpro.tabToChordPro(
          data.lyrics
        );
        data.chordpro = chordProLyrics;
      }
      // console.log("beforeUpdata:::: before >>>", data.lyrics);
      // data.lyrics = strapi.services.tabtochordpro.tabToChordPro(data.lyrics);
      // console.log("beforeUpdata:::: after >>>", data.lyrics);

      // const test = strapi.services.tabtochordpro.tabToChordPro(data.lyrics);

      // data.lyrics = test;

      // data.chordpro = strapi.services.tabtochordpro.tabToChordPro(data.lyrics);
    },

    async afterUpdate(result, params, data) {
      // till now what i concluded
      // result >> is the data that you get to preview in the strapi interface
      // data >> is what goes to the data-base
      console.log("Hereeeeeeeeeee 8 ");
      // console.log("Hereeeeeeeeeee 8: >>> result:before ", result.lyrics);
      // console.log("Hereeeeeeeeeee 8: >>> data:before ", data.lyrics);
      // const new_updated = strapi.services.tabtochordpro.tabToChordPro(
      //   result.lyrics
      // );

      // result.lyrics = new_updated;

      // result.lyrics = data.lyrics;
      // result.lyrics = strapi.services.chordprototab
      //   .ChordPro()
      //   .to_txt(result.lyrics);
      // data.lyrics = strapi.services.chordprototab
      //   .ChordPro()
      //   .to_txt(data.lyrics);
      // result.lyrics = "444444444";
      // data.lyrics = strapi.services.tabtochordpro.tabToChordPro(data.lyrics);
      // console.log("Hereeeeeeeeeee 8: >>> result:after ", result.lyrics);
      // console.log("Hereeeeeeeeeee 8: >>> data:after ", data.lyrics);
      // result.lyrics =
      // data.lyrics = strapi.services.tabtochordpro.tabToChordPro(data.lyrics);
      // data.lyrics = "test!!!!!!!!!";
      // result.lyrics = "test!!!!!!!!!";
    },
    // async afterFind(results, params, populate) {
    //   console.log("after -find > Results: ", results);
    //   console.log("after -find > params: ", params);
    //   console.log("after -find > populate: ", populate);
    // },

    // Called before an entry is created
    // beforeCreate(data) {
    //   console.log('Hereeeeeeeeeee 1')
    // },
    // Called after an entry is created
    afterCreate(result, data) {
      console.log("Hereeeeeeeeeee 2");
      // result.lyrics = strapi.services.tabtochordpro.tabToChordPro(result.lyrics);
    },
    // Called before entries are queried with find() method
    beforeFind(params, populate) {
      console.log("Hereeeeeeeeeee 3");
    },
    // Called after entries are queried with find() method
    afterFind(results, params, populate) {
      console.log("Hereeeeeeeeeee 4");
    },
    // Called before an entry is queried with findOne() method
    beforeFindOne(params, populate) {
      console.log("Hereeeeeeeeeee 5:> params:  ", params);
      console.log("Hereeeeeeeeeee 5:> populate: ", populate);
    },
    // Called after an entry is queried with findOne() method
    afterFindOne(result, params, populate) {
      // console.log("Hereeeeeeeeeee 6:> result: before ", result.lyrics);
      // console.log("Hereeeeeeeeeee 6:> params:  ", params);
      // console.log("Hereeeeeeeeeee 6:> populate: ", populate);
      // todo: here we change the result to be the thing that we want before showing it to the user
      // console.log("the !!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!!", strapi.services);
      // result.lyrics = strapi.services.chordprototab
      //   .ChordPro()
      //   .to_txt(result.lyrics);

      // console.log("Hereeeeeeeeeee 6:> result: after ", result.lyrics);
      // console.log("Hereeeeeeeeeee 6:> result ", result.lyrics);
      console.log("Hereeeeeeeeeee 6 ");
      // console.log(");
      // result.lyrics = await strapi.services.tabtochordpro.tabToChordPro(
      //   result.lyrics
      // );
      // result.lyrics = "33333 updated";
    },
    // Called before an entry is updated
    // beforeUpdate(params, data) {

    //   console.log('Hereeeeeeeeeee 7')
    // },
    // Called after an entry is updated

    // Called before entries in a collection are counted
    beforeCount(params) {
      console.log("Hereeeeeeeeeee 9");
    },
    // Called after entries in a collection are counted
    afterCount(result, params) {
      console.log("Hereeeeeeeeeee 10");
    },
    // Called before searching strings in an entry
    beforeSearch(params, populate) {
      console.log("Hereeeeeeeeeee 11");
    },
    // Called after searching strings in an entry
    afterSearch(result, params) {
      console.log("Hereeeeeeeeeee 12");
    },
    // Called before entry search results are counted
    beforeCountSearch(params) {
      console.log("Hereeeeeeeeeee 13");
    },
    // Called after entry search results are counted
    afterCountSearch(result, params) {
      console.log("Hereeeeeeeeeee 14");
    },
    // Called before an entry is deleted
    beforeDelete(params) {
      console.log("Hereeeeeeeeeee 15");
    },
    // Called after an entry is deleted
    afterDelete(result, params) {
      console.log("Hereeeeeeeeeee 16");
    },
  },
};

const getSlugString = async (id, title = "") => {
  //
  const artistName = await queryArtistName(id);

  const slugString = `${artistName ? artistName : ""} ${title}`;

  return slugString;
};

const queryArtistName = async (id) => {
  //
  if (!id) return;

  const result = await strapi
    .query("artist")
    .model.query((qb) => {
      qb.where("id", id);
    })
    .fetch();

  const fields = result.toJSON();

  return fields.name;
};
