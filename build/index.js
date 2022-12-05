'use strict';
Object.defineProperty(exports, '__esModule', { value: true });
require('../build/styles.css');
const pl_1 = require('@faker-js/faker/locale/pl');
let venueArray = [];
let venueDetailsArray = [];
let usedIdsArray = [];
let generatedLocalizations = [];
let addressesCache = [];
function generateUniqueId() {
  let randomNumber = pl_1.faker.datatype.number({ min: 1000, max: 99999 });
  while (usedIdsArray.includes(randomNumber)) {
    randomNumber = pl_1.faker.datatype.number({ min: 1000, max: 99999 });
  }
  usedIdsArray.push(randomNumber);
  return randomNumber;
}
function generateRandomFeatures() {
  const featuresArray = [];
  const amountOfFeatures = pl_1.faker.datatype.number({ min: 5, max: 9 });
  for (let i = 0; i <= amountOfFeatures; i++) {
    featuresArray.push(pl_1.faker.lorem.word());
  }
  return featuresArray;
}
function generateFakeVenuesData(numberOfVenuesToGenerate) {
  for (let i = 1; i <= numberOfVenuesToGenerate; i++) {
    const newVenue = {
      id: i,
      location: {
        postalCode: pl_1.faker.address.zipCode(),
        name: pl_1.faker.address.cityName(),
      },
      pricePerNightInEur: pl_1.faker.datatype.number({
        min: 10,
        max: 35,
        precision: 0.01,
      }),
      rating: pl_1.faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
      capacity: pl_1.faker.datatype.number({ min: 1, max: 8 }),
      name: pl_1.faker.internet.domainWord(),
      albumId: i,
      landingImgUrl: pl_1.faker.image.city(600, 600, true),
    };
    const newVenueDetails = {
      id: generateUniqueId(),
      venueId: newVenue.id,
      location: {
        postalCode: newVenue.location.postalCode,
        name: newVenue.location.name,
      },
      pricePerNightInEur: newVenue.pricePerNightInEur,
      rating: newVenue.rating,
      capacity: newVenue.capacity,
      name: newVenue.name,
      albumId: newVenue.albumId,
      description: pl_1.faker.lorem.paragraph(3),
      features: generateRandomFeatures(),
      sleepingDetails: {
        maxCapacity: pl_1.faker.datatype.number({ min: 3, max: 8 }),
        amountOfBeds: pl_1.faker.datatype.number({ min: 1, max: 6 }),
      },
      checkInHour: '4pm',
      checkOutHour: '10am',
      distanceFromCityCenterInKM: pl_1.faker.datatype.number({
        min: 1,
        max: 15,
      }),
      contactDetails: {
        phone: pl_1.faker.phone.number(),
        email: pl_1.faker.internet.email(),
      },
      landingImgUrl: newVenue.landingImgUrl,
      venueDescriptionImgUrls: {
        1: pl_1.faker.image.nature(600, 600, true),
        2: pl_1.faker.image.nature(600, 600, true),
        3: pl_1.faker.image.nature(600, 600, true),
        4: pl_1.faker.image.nature(600, 600, true),
        5: pl_1.faker.image.nature(600, 600, true),
        6: pl_1.faker.image.nature(600, 600, true),
        7: pl_1.faker.image.nature(600, 600, true),
      },
    };
    let addressToGenerate = pl_1.faker.address.city();
    while (addressesCache.includes(addressToGenerate)) {
      addressToGenerate = pl_1.faker.address.city();
    }
    generatedLocalizations.push({
      label: pl_1.faker.address.city(),
    });
    addressesCache.push(addressToGenerate);
    venueArray.push(newVenue);
    venueDetailsArray.push(newVenueDetails);
  }
}
generateFakeVenuesData(100);
function createVenuesDetailsListWithPairedVenueId(venuesDetails) {
  let venueDetailsAndHisVenueId = {};
  venuesDetails.forEach((venue) => {
    venueDetailsAndHisVenueId[Number(venue.venueId)] = venue;
  });
  return venueDetailsAndHisVenueId;
}
const venuesDetailsAndHisVenueId =
  createVenuesDetailsListWithPairedVenueId(venueDetailsArray);
const dataToPost = {
  venues: venueArray,
  venuesDetails: venuesDetailsAndHisVenueId,
  localizationOptions: generatedLocalizations,
};
console.log(JSON.stringify(dataToPost));
