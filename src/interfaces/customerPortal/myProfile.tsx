import {UserInterface} from "../user";

export interface MyProfileProps {
    user: null | UserInterface,
    match: {
        path: string,
    },
    getUser: (id: string) => void,
    setPageTitle: (pageTitle: string) => void,
}

export interface MyProfileEditProps {
    user: null | UserInterface,
    match: {
        path: string,
    },
    groups: any[],

    getUser: (id: string) => void,
    setUser: (user: UserInterface) => void,
    getGroups: () => void,
    setPageTitle: (pageTitle: string) => void,
    updateUser: () => void,
}

export interface MyProfileEditState {
    updated: boolean,
}