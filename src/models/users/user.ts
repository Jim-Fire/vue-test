export interface IUser {
    id?: string;
    name: string;
    email: string;
    phone_number: string;
    address?: string;
    about_me?: string;
    country_id: string;
    state_id: string;
    city_id: string;
    createdAt?: number;
}
