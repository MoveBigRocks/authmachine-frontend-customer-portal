import moment from "moment";
import login from "./staticfiles/images/event-logs/Login.svg";
import logout from "./staticfiles/images/event-logs/Logout.svg";
import activation from "./staticfiles/images/event-logs/Activation.svg";
import passwordReset from "./staticfiles/images/event-logs/Password Reset.svg";
import unlocked from "./staticfiles/images/event-logs/Unlocked.svg";

import Amazon from "./staticfiles/images/social-icons/amazon.svg";
import Facebook from "./staticfiles/images/social-icons/facebook.svg";
import Github from "./staticfiles/images/social-icons/github.svg";
import Google from "./staticfiles/images/social-icons/google.svg";
import LinkedIn from "./staticfiles/images/social-icons/linkedin.svg";
import OAuth from "./staticfiles/images/social-icons/oauth.svg";
import OpenId from "./staticfiles/images/social-icons/openid.svg";
import Paypal from "./staticfiles/images/social-icons/paypal.svg";
import SalesForce from "./staticfiles/images/social-icons/salesforce.svg";
import Twitter from "./staticfiles/images/social-icons/twitter.svg";
import WindowsLive from "./staticfiles/images/social-icons/windowslive.svg";

const helpers = {
    getDate: (date: string) => {
        let inputDate = new Date(date);
        let today = new Date();
        let yesterday = new Date(Date.now() - 864e5);
        if (inputDate.toDateString() === today.toDateString()) {
            return `today ${moment(inputDate).format('LT')}`
        } else if (inputDate.toDateString() === yesterday.toDateString()) {
            return `yesterday ${moment(inputDate).format('LT')}`
        } else {
            return moment(inputDate).format('ll')
        }
    },
    getDateTime: (date: string) => {
        let currentDay = helpers.getDate(date);
        let inputDate = new Date(date);
        return `${currentDay} ${moment(inputDate).format("HH:mm")}`;
    },
    hidePhone: (phone: string) => {
        try {
            return 'XXX-XXX-' + phone.substring(8);
        } catch {
            return 'XXX-XXX-XXX';
        }
    },
    getEventDateTime: (date: string) => {
        let inputDate = new Date(date);
        return moment(inputDate).format("lll");
    },
    camelToSnakeCase: (str: string) => str.replace(/[A-Z]/g, letter => `_${letter.toLowerCase()}`),
    shuffle: (string: string) => {
        const parts = string.split('');
        for (let i = parts.length; i > 0;) {
            const random = parseInt(String(Math.random() * i), 10);
            const temp = parts[--i];
            parts[i] = parts[random];
            parts[random] = temp;
        }
        return parts.join('');
    },
    getRandomPassword: (length: number) => {
        if (length < 4) length = 4;
        const charset = '!@#$%^&*()_-+=abcdefghijklnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
        let retVal = '';
        for (let i = 0, n = charset.length; i < length - 4; ++i) {
            retVal += charset.charAt(Math.floor(Math.random() * n));
        }
        const charsetlower = 'abcdefghijklnopqrstuvwxyz';
        const charsetupper = 'ABCDEFGHIJKLMNOPQRSTUVWXYZ';
        const charsetspecial = '!@#$%^&*()-+=';
        const charsetnumbers = '0123456789';
        retVal += charsetlower.charAt(Math.floor(Math.random() * charsetlower.length));
        retVal += charsetupper.charAt(Math.floor(Math.random() * charsetupper.length));
        retVal += charsetspecial.charAt(Math.floor(Math.random() * charsetspecial.length));
        retVal += charsetnumbers.charAt(Math.floor(Math.random() * charsetnumbers.length));
        return helpers.shuffle(retVal);
    },
    getEventIcon: (type: string) => {
        switch (type.toLocaleLowerCase()) {
            case "login":
            case "one_time_login":
                return login;
            case "logout":
                return logout;
            case "user_activation":
            case "user_creation":
                return activation;
            case "password_reset":
                return passwordReset;
            default:
                return unlocked;
        }
    },
    getTitleWithUpper: (str: string) => {
        let word = str.toLowerCase().replace("_", " ");
        return word.charAt(0).toUpperCase() + word.slice(1)
    },
    getPagePath: (path: string, pagePath: string) => `${path}/${pagePath}`,
    getSocialBtnClasses: (name: string) => {
      const classes = {
          github: "github-auth",
          google: "google-auth"
      };
      return classes[name];
    },
    getIconByProvider: (name: string) => {
        const icons = {
            amazon: Amazon,
            facebook: Facebook,
            github: Github,
            google: Google,
            linkedin: LinkedIn,
            oauth: OAuth,
            openid: OpenId,
            paypal: Paypal,
            salesforce: SalesForce,
            twitter: Twitter,
            windowslive: WindowsLive
        };
        return icons[name];
    },
    setValueInLocalStorage: (key: string, value: string) => localStorage.setItem(key, value),
    getValueFromLocalStorage: (value: string) => localStorage.getItem(value),
    removeValueFromLocalStorage: (value: string) => localStorage.removeItem(value),
    getLicenseErrorReason: (message: string) => {
        if (message.startsWith("Feature")) {
            return {
                message: "Click here to review the options and get a subscription",
                title: "This feature is available on one of our premium tiers",
                buttonText: "Review",
            }
        }
        switch (message) {
            case "No active license":
               return {
                   message: "Click here to request a license",
                   title: "You do not have active licenses",
                   buttonText: "Request License"
               }
            case "Users limit is exceeded":
                return {
                    message: "Please, upgrade your subscription in order to add more users",
                    title: "You've reached seats limit available on your plan",
                    buttonText: "Upgrade"
                }
            case "Invalid license":
                return {
                    message: "Please, upgrade your subscription",
                    title: "Your license is expired",
                    buttonText: "Upgrade"
                }
            case "license error":
                return {
                    message: "Click here to request a license",
                    title: message,
                    buttonText: "Request License"
                }
            default:
                return {
                    message,
                    buttonText: "Request License",
                    title: "Permission Denied"
                }
        }
    }
}

export default helpers;
