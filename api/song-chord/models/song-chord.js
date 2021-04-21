"use strict";
// const slugify = require("slugify");
const slugify = require("@sindresorhus/slugify");

/**
 * Read the documentation (https://strapi.io/documentation/developer-docs/latest/concepts/models.html#lifecycle-hooks)
 * to customize this model
 */

// const arabicLetters = {
//   ا: "ا",
//   أ: "أ",
//   ب: "ب",
//   ت: "ت",
//   ث: "ث",
//   ج: "ج",
//   ح: "ح",
//   خ: "خ",
//   د: "د",
//   ذ: "ذ",
//   ر: "ر",
//   ز: "ز",
//   س: "س",
//   ش: "ش",
//   ص: "ص",
//   ض: "ض",
//   ط: "ط",
//   ظ: "ظ",
//   ع: "ع",
//   غ: "غ",
//   ف: "ف",
//   ق: "ق",
//   ك: "ك",
//   ل: "ل",
//   م: "م",
//   ن: "ن",
//   ه: "ه",
//   و: "و",
//   ي: "ي",
// };
function slugify2(string) {
  const a =
    "àáâäæãåāăąçćčđďèéêëēėęěğǵḧîïíīįìłḿñńǹňôöòóœøōõőṕŕřßśšşșťțûüùúūǘůűųẃẍÿýžźż·/_,:;";
  const b =
    "aaaaaaaaaacccddeeeeeeeegghiiiiiilmnnnnoooooooooprrsssssttuuuuuuuuuwxyyzzz------";
  const p = new RegExp(a.split("").join("|"), "g");

  return string
    .toString()
    .toLowerCase()
    .replace(/\s+/g, "-") // Replace spaces with -
    .replace(p, (c) => b.charAt(a.indexOf(c))) // Replace special characters
    .replace(/&/g, "-and-") // Replace & with 'and'
    .replace(/[^[a-zA-Z0-9أ-ي]-]+/g, "") // Arabic support
    .replace(/--+/g, "-") // Replace multiple - with single -
    .replace(/^-+/, "") // Trim - from start of text
    .replace(/-+$/, ""); // Trim - from end of text
}

// slugify.extend(arabicLetters);
// slugify.extend({'☢': 'radioactive'})
// todo: add the new slugify function (with arabic support) to the beforeCreate
// todo: add the new slugify function (with arabic support) to the beforeCreate
// todo: add the new slugify function (with arabic support) to the beforeCreate
// todo: add the new slugify function (with arabic support) to the beforeCreate
// todo: add the new slugify function (with arabic support) to the beforeCreate
// todo: add the new slugify function (with arabic support) to the beforeCreate
// todo: add the new slugify function (with arabic support) to the beforeCreate
module.exports = {
  /**
   * Triggered before user creation.
   */
  lifecycles: {
    async beforeCreate(data) {
      console.log("beforeCreate >> data: >> ", data);
      const randomID = Math.floor(Math.random() * 10000);

      const slugString = await getSlugString(data.artist, data.title, randomID);

      console.log({ slugString });

      // data.slug = slugify(slugString, { lower: true });
      data.slug = slugify(slugString, { lowercase: true });

      // if (data.artist) {
      //   const slugString = await getSlugString(
      //     data.artist,
      //     data.title,
      //     randomID
      //   );
      //   data.slug = slugify(slugString, { lower: true });
      // } else if (data.title) {
      //   const slugString = `${data.title} ${randomID}`;
      //   data.slug = slugify(slugString, { lower: true });
      // }

      // data.lyrics = strapi.services.tabtochordpro.tabToChordPro(data.lyrics);
    },

    async beforeUpdate(params, data) {
      console.log("beforeUpdate >> data: >> ", data);
      console.log("beforeUpdate >> params: >> ", params);

      const randomID = extractRandomIdFromSlug(data.slug);
      // const randomID = extractRandomIdFromSlug("");

      console.log({ randomID });
      console.log("the data title>>>> ", data.title);
      console.log("the data title>>>> ", data.title);
      console.log("the data title>>>> ", data.title);
      console.log("the data title>>>> ", data.title);

      const slugString = await getSlugString(data.artist, data.title, randomID);

      console.log({ slugString });
      // data.slug = slugify(slugString, { lower: true });
      // data.slug = slugify(slugString, { lowercase: true });
      data.slug = slugify2(slugString);

      // const slugged = slugify(slugString, { lower: true });
      // const slugged = slugify(slugString, { lowercase: true });
      const slugged = slugify2(slugString);
      console.log({ slugged });
      console.log({ slugged });
      console.log({ slugged });
      console.log({ slugged });
      console.log({ slugged });

      // if (data.artist) {
      //   const slugString = await getSlugString(
      //     data.artist,
      //     data.title,
      //     randomID
      //   );
      //   data.slug = slugify(slugString, { lower: true });
      // } else if (data.title) {
      //   const slugString = `${data.title} ${randomID}`;
      //   data.slug = slugify(slugString, { lower: true });
      // }
    },

    async afterUpdate(result, params, data) {
      console.log("afterUpdate 8 ");
    },

    afterCreate(result, data) {
      console.log("afterCreate 2");
      console.log("afterCreate >>> result:", result.id);
      console.log("afterCreate >>> data:", data);
      // result.lyrics = strapi.services.tabtochordpro.tabToChordPro(result.lyrics);
    },
    // Called before entries are queried with find() method
    beforeFind(params, populate) {
      console.log("beforeFind 3");
    },
    // Called after entries are queried with find() method
    afterFind(results, params, populate) {
      console.log("afterFind 4");
    },
    // Called before an entry is queried with findOne() method
    beforeFindOne(params, populate) {
      console.log("beforeFindOne 5:> params:  ", params);
      console.log("beforeFindOne 5:> populate: ", populate);
    },
    // Called after an entry is queried with findOne() method
    afterFindOne(result, params, populate) {
      console.log("Hereeeeeeeeeee 6 ");
    },

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

const getSlugString = async (id, title = "", randomID = "") => {
  console.log("inside the function>>> ", { title });
  // if (randomID) {
  // console.log("the random ID is: ", randomID);
  // console.log("the random ID is: ", randomID);
  // console.log("the random ID is: ", randomID);
  // console.log("the random ID is: ", randomID);
  // }
  // if (!randomID) {
  // console.log("there were no random ID !!!!: ", randomID);
  // }
  //
  const artistName = await queryArtistName(id);

  const slugString = `${artistName ? artistName : ""} ${
    title ? title : ""
  } ${randomID}`;

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

const extractRandomIdFromSlug = (oldSlug) => {
  if (!oldSlug) return "";

  const oldSlugSplit = oldSlug.split("-");

  const randomID = oldSlugSplit[oldSlugSplit.length - 1];

  const isNum = /^\d+$/.test(randomID);

  // if (!isNum) return "";
  // if there is no randomID number >>> then return a new Random number
  if (!isNum) return Math.floor(Math.random() * 10000);

  return randomID;
};
