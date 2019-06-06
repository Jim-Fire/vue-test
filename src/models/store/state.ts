import { IUser, ICountry, IState, ICity } from 'src/models';

export interface IRootState {
    user: IUserModule;
    geo: IGeoModule;
}

export interface IUserModule {
    users: IUser[];
    currentId?: string;
}

export interface IGeoModule {
    countries: ICountry[];
    states: IState[];
    cities: ICity[];
}
