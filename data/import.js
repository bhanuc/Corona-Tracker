const { readdir, stat } = require("fs").promises;
const { join } = require("path");
const path = require("path");
const csvtojson = require("csvtojson");

const { searchKey, searchSecret } = process.env;

const algoliasearch = require("algoliasearch");
const client = algoliasearch(searchKey, searchSecret);
const algoliaIndex = client.initIndex("corona-test-centers");

const dirs = async path => {
  let dirs = [];
  for (const file of await readdir(path)) {
    if ((await stat(join(path, file))).isDirectory()) {
      dirs = [...dirs, file];
    }
  }
  return dirs;
};

(async () => {
  const countries = await dirs("./countries");
  for (let index = 0; index < countries.length; index++) {
    const country = countries[index];
    const centerFilePath = path.join("./countries", country, "/centers.csv");
    const centerList = await csvtojson().fromFile(centerFilePath);
    const filteredLocations = centerList.map(({ state, lat, lng, name }) => {
      return {
        objectID: `${name}_id`,
        state,
        name,
        country,
        _geoloc: {
          lat,
          lng
        }
      };
    });
    await algoliaIndex.setSettings({
      searchableAttributes: ["name", "state", "country"]
    });

    await algoliaIndex.saveObjects(filteredLocations, {
      autoGenerateObjectIDIfNotExist: true
    });
  }
})();
