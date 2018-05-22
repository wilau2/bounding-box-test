import fs from 'fs';
import { getCityId } from './city';

const fsPromises = fs.promises;
const CANADIAN_CITIES_PATH = 'src/data/canada_cities.geojson';

const withCanadianCities = async () => {
  const file = await fsPromises.readFile(CANADIAN_CITIES_PATH);
  const canadianCitiesObject = JSON.parse(file);
  return canadianCitiesObject.features;
};

const createInMemoryRepository = async (getCities) => {
  const cities = await getCities();
  return {
    'allIds': cities.slice().reduce((getAll, city) => {
      getAll.push(getCityId(city));
      return getAll;
    }, []),
    'byId': cities.slice().reduce((getById, city) => {
      getById[getCityId(city)] = city;
      return getById;
    }, {})
  };
};

export { withCanadianCities, createInMemoryRepository }
