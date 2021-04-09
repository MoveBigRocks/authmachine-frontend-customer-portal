export interface SocialLoginProps {
    status: boolean,
    message: string,
    match: {
        path: string,
        params: {
            provider: string,
        },
    },
    location: {
        search: string,
    },
    socialCallback: (provider: string, queryString: string, nextUrl: string | null) => void,
    setPageTitle: (pageTitle: string) => void,
}