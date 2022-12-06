import '../src/styles.css';
import { faker } from '@faker-js/faker/locale/pl';

let venueArray: VenueType[] = [];
let venueDetailsArray: VenueDetailsType[] = [];
let usedIdsArray: number[] = [];
let generatedLocalizations: {label: string}[] = [];
let addressesCache: string[] = [];

type Location = {
  postalCode: string | number;
  name: string;
}
type SleepingDetails = {
  maxCapacity: number;
  amountOfBeds: number;
}
type ContactDetails = {
  phone: string;
  email: string;
}

type VenueType = {
  id: number;
  location: Location;
  pricePerNightInEur: number;
  rating: number;
  capacity: number;
  name: string;
  albumId: number;
  landingImgUrl: string;
};

type VenueDetailsType = {
  id: number;
  venueId: number;
  location: Location;
  pricePerNightInEur: number;
  rating: number;
  capacity: number;
  name: string;
  albumId: number;
  description: string;
  features: string[];
  sleepingDetails: SleepingDetails;
  checkInHour: string;
  checkOutHour: string;
  distanceFromCityCenterInKM: number;
  contactDetails: ContactDetails;
  landingImgUrl: string;
  venueDescriptionImgUrls: string[];
};

function generateUniqueId(): number {
  let randomNumber = faker.datatype.number({ min: 1000, max: 99999 });
  while (usedIdsArray.includes(randomNumber)) {
    randomNumber = faker.datatype.number({ min: 1000, max: 99999 });
  }
  usedIdsArray.push(randomNumber);
  return randomNumber;
}

function generateRandomFeatures(): string[] {
  const featuresArray: string[] = [];
  const amountOfFeatures: number = faker.datatype.number({ min: 5, max: 9 });
  for (let i = 0; i <= amountOfFeatures; i++) {
    featuresArray.push(faker.lorem.word());
  }
  return featuresArray;
}

function generateVenueDescriptionImgsUrls(amountOfUrls: number): string[] {
  const imgsUrlArray = []
  for(let i=0; i<=amountOfUrls; i++) {
    imgsUrlArray.push(faker.image.nature(600, 600, true))
  }
  return imgsUrlArray
}

function generateFakeVenuesData(numberOfVenuesToGenerate: number): void {
  for (let i = 1; i <= numberOfVenuesToGenerate; i++) {
    const newVenue: VenueType = {
      id: i,
      location: {
        postalCode: faker.address.zipCode(),
        name: faker.address.cityName(),
      },
      pricePerNightInEur: faker.datatype.number({
        min: 10,
        max: 35,
        precision: 0.01,
      }),
      rating: faker.datatype.number({ min: 1, max: 5, precision: 0.1 }),
      capacity: faker.datatype.number({ min: 1, max: 8 }),
      name: faker.internet.domainWord(),
      albumId: i,
      landingImgUrl: faker.image.city(600, 600, true),
    };
    const newVenueDetails: VenueDetailsType = {
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
      description: faker.lorem.paragraph(3),
      features: generateRandomFeatures(),
      sleepingDetails: {
        maxCapacity: faker.datatype.number({ min: 3, max: 8 }),
        amountOfBeds: faker.datatype.number({ min: 1, max: 6 }),
      },
      checkInHour: '4pm',
      checkOutHour: '10am',
      distanceFromCityCenterInKM: faker.datatype.number({ min: 1, max: 15 }),
      contactDetails: {
        phone: faker.phone.number(),
        email: faker.internet.email(),
      },
      landingImgUrl: newVenue.landingImgUrl,
      venueDescriptionImgUrls: generateVenueDescriptionImgsUrls(8)
    };
    let addressToGenerate: string = faker.address.city();
    while (addressesCache.includes(addressToGenerate)) {
      addressToGenerate = faker.address.city();
    }
    generatedLocalizations.push({
      label: faker.address.city(),
    });
    addressesCache.push(addressToGenerate);

    venueArray.push(newVenue);
    venueDetailsArray.push(newVenueDetails);
  }
}

generateFakeVenuesData(100);

function createVenuesDetailsListWithPairedVenueId(
  venuesDetails: VenueDetailsType[],
) {
  let venueDetailsAndHisVenueId: { [index: number]: VenueDetailsType } = {};
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
