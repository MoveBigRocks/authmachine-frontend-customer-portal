import {SocialInterface} from '../socials'

export interface SignInProps {
    isAuthenticated: boolean,
    message: string,
    login: (values: any, next: string | null) => void,
    socials: Array<SocialInterface>,
    getSocials: () => void,
    setPageTitle: (pageTitle: string) => void,
    location: {
        search: string,
    },
}