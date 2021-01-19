import {SocialInterface} from '../socials'

export interface SignInProps {
    isAuthenticated: boolean,
    message: string,
    login: (values: any) => void,
    socials: Array<SocialInterface>,
    getSocials: () => void,
}