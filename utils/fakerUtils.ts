import { faker } from "@faker-js/faker";

export class FakerData {

    static getFirstName(): string {
        return faker.person.firstName();
    }

    static getLastName(): string {
        return faker.person.lastName();
    }

    static getcurrentYear() {
        return `${faker.date.anytime().getFullYear() - 2}`;
    }

    static getMobileNumber(): string {
        return faker.phone.number();
    }

    static getEmail(): string {
        return faker.internet.email();
    }

    static getAddress(): string {
        return faker.location.streetAddress();
    }

    static getCity(): string {
        return faker.location.city();
    }

    static getStreet(): string {
        return faker.location.street();
    }

    static getPinCode() {
        return faker.location.zipCode('######');
    }

    static getState(): string {
        return faker.location.state();
    }

    static getCountry(): string {
        return faker.location.country();
    }
    static addressName(): string {
        return `${faker.location.countryCode()} ${faker.location.county()}`;
    }

    static jobRole(): string {
        return faker.person.jobTitle();
    }

    static company(): string {
        return faker.company.name();
    }



}
