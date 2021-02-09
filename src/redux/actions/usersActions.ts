import {AppDispatch} from "../store";
import {alertActions} from "./alertActions";
import {mainActions} from "./mainActions";
import usersTypes from "../types/usersTypes";
import {getUsersData, UserInterface} from "../../interfaces/user";
import request from '../helpers/request';


const getSocialsByUser = () => {
    return (dispatch: AppDispatch, getState: any) => {
        let query = `query {
            allSocialsByUser(id: "${getState().user.id}") {
                id,
                provider,
                isConnected,
                accountId,
            }
        }`;

        request.postWithoutErrors(dispatch, query, (data: any) => {
            let {allSocialsByUser} = data.data;
            mainActions.loading(false, dispatch);
            dispatch({
                type: usersTypes.GET_SOCIALS_BY_USER,
                data: allSocialsByUser,
            });
        },
        () => {})
    }
}


const getGoogleAuthenticatorValue = () => {
    return (dispatch: AppDispatch, getState: any) => {
        let query = `query {
          googleAuthenticatorValue
        }`;

        request.postWithoutErrors(dispatch, query, (data: any) => {
                let {googleAuthenticatorValue} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: usersTypes.GET_GOOGLE_AUTHENTICATOR_VALUE,
                    data: googleAuthenticatorValue,
                });
            },
            () => {});
    }
}


const getSocials = () => {
    return (dispatch: AppDispatch, getState: any) => {
        let query = `query {
              allSocials {
                id,
                provider,
                name
              }
            }`;

        request.postWithoutErrors(dispatch, query, (data: any) => {
                let {allSocials} = data.data;
                mainActions.loading(false, dispatch);
                dispatch({
                    type: usersTypes.GET_SOCIALS,
                    data: allSocials,
                });
            },
            () => {});
    }
}


const getUsers = (data: getUsersData) => {
    return (dispatch: AppDispatch, getState: any) => {
        let {page, pageSize, orderBy, onlyLocked, onlyAdmin, username, groupsSelected} = getState().users;
        if (data.hasOwnProperty('page')) page = data.page;
        if (data.hasOwnProperty('pageSize')) pageSize = data.pageSize;
        if (data.hasOwnProperty('username')) username = data.username;
        if (data.hasOwnProperty('orderBy')) orderBy = data.orderBy;
        if (data.hasOwnProperty('onlyLocked')) onlyLocked = data.onlyLocked;
        if (data.hasOwnProperty('onlyAdmin')) onlyAdmin = data.onlyAdmin;
        if (data.hasOwnProperty('groupsSelected')) groupsSelected = data.groupsSelected;

        let additionalQuery = `orderBy: "${orderBy}", `;
        if (username !== '') additionalQuery += `username: "${username}", `
        if (onlyLocked) additionalQuery += 'onlyLocked: true, ';
        if (onlyAdmin) additionalQuery += 'onlyAdmin: true, ';
        if (groupsSelected.length > 0) additionalQuery += `groups: ["${groupsSelected.join('", "')}"], `;
        let query = `query {
          allUsers(page: ${page}, 
          pageSize: ${pageSize}, 
          ${additionalQuery}) {
            total,
            objects {
              url,
              id,
              avatar,
              username,
              schemas,
              externalId,
              nickName,
              displayName,
              profileUrl,
              userType,
              title,
              preferredLanguage,
              locale,
              timezone,
              active,
              activated
              isSuperuser,
              activationCode,
              activationEmailFailed,
              createdAt,
              activatedAt,
              repositories {
                url,
                id
              },
              x509Certificates {
                value
              },
              groups {
                id, value, displayName
              },
              meta {
                lastModified,
                location,
                created
              },
              emails {
                id,
                value,
                type,
                primary
              } 
            } 
          }
        }`;

        request.post(dispatch, query, (data: any) => {
            let {allUsers} = data.data;
            mainActions.loading(false, dispatch);
            dispatch({
                type: usersTypes.GET_USERS,
                data: allUsers.objects,
                operationStatus: true,
                usersTotal: allUsers.total,
                page,
                pageSize,
                orderBy,
                onlyAdmin,
                onlyLocked,
                username,
                groupsSelected
            });
        })
    }
}


const getGroups = () => {
    let query = `query {
      allGroups(pageSize: 100) {
        total,
        numPages,
        objects {
          id,
          displayName,      
        }
      }
    }`;

    return (dispatch: AppDispatch) => {
        request.post(dispatch, query, (data: any) => {
            dispatch({
                type: usersTypes.GET_GROUPS,
                data: data.data.allGroups.objects
            });
        });
    }
}

const getEvents = () => {
    let query = `query {
      allEvents {
        id,
        type,
        createdAt,
        user {
          id,
          username
        },
        device {
          id,
          identifier,
          fingerprint,
          type,
          name,
          operatingSystem,
          recentEvents {
            id,
            type,
            createdAt,
            user {
              id,
              username
            },
            userIp
          }
        }
      }
    }`;

    return (dispatch: AppDispatch) => {
        request.post(dispatch, query, (data: any) => {
            dispatch({
                type: usersTypes.GET_EVENTS,
                data: data.data.allEvents
            });
        });
    }
}

const changeUserPassword = (userId: string, password: string) => {
    let query = `
        mutation {
          userChangePassword(id: "${userId}", password: "${password}") {
            status, message
          }
        }
    `;

    return (dispatch: AppDispatch) => {
        mainActions.loading(true, dispatch);
        const changeUserDispatch = (operationStatus: boolean) =>
            dispatch({
                type: usersTypes.CHANGE_USER_PASSWORD,
                operationStatus
            });

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {data} = result;
                let operationStatus = true;
                mainActions.loading(false, dispatch);
                if (data.hasOwnProperty('errors')) {
                    alertActions.error(data.errors[0].message);
                    operationStatus = false;
                } else if (data.data.userChangePassword.status === false) {
                    alertActions.error(data.data.userChangePassword.message);
                    operationStatus = false;
                }
                changeUserDispatch(operationStatus);
            },
            () => changeUserDispatch(false));
    }
}

const changeCurrentUserPassword = (oldPassword: string, newPassword: string) => {
    let query = `
        mutation {
          userChangeCurrentPassword(oldPassword: "${oldPassword}", newPassword: "${newPassword}") {
            status,
            message
          }
        }`;

    return (dispatch: AppDispatch) => {
        mainActions.loading(true, dispatch);
        const changeUserDispatch = (operationStatus: boolean) =>
            dispatch({
                type: usersTypes.CHANGE_USER_PASSWORD,
                operationStatus
            });
        changeUserDispatch(false);

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {userChangeCurrentPassword} = result.data;
                let operationStatus = true;
                if (userChangeCurrentPassword.status) {
                    alertActions.success("The password was updated successfully");
                } else {
                    operationStatus = false;
                    alertActions.error(userChangeCurrentPassword.message);
                }
                changeUserDispatch(operationStatus);
            },
            () => changeUserDispatch(false));
    }
}

const getUser = (userId: string) => {
    return (dispatch: AppDispatch) => {
        let query = `query {
          user (id: "${userId}") {
            url,
            id,
            avatar,
            username,
            schemas,
            externalId,
            nickName,
            displayName,
            profileUrl,
            userType,
            title,
            preferredLanguage,
            locale,
            timezone,
            active,
            activated
            isSuperuser,
            activationCode,
            activationEmailFailed,
            createdAt,
            activatedAt,
            repositories {
              url,
              id
            },
            permissions {
              id,
              object {
                id,
                code,
                name
              },
              type {
                id,
                code,
                name
              }
            },
            x509Certificates {
              value
            },
            groups {
              id, value, displayName
            },
            meta {
              lastModified,
              location,
              created
            },
            emails {
              id,
              value,
              type,
              primary
            },
            name {
              formatted,
              familyName,
              givenName,
              middleName,
              honorificPrefix,
              honorificSuffix
            },
            addresses {
              id,
              type,
              streetAddress,
              locality,
              region,
              postalCode,
              country,
              formatted,
              primary
            },
            phoneNumbers {
              id,
              value,
              type
            },
            ims {
              value,
              type
            },
            photos {
              type,
              value,
              image
            }
          }
        }`;

        request.post(dispatch, query, (data: any) => {
            dispatch({
                type: usersTypes.GET_USER,
                user: data.data.user
            })
        });
    }
}

const setUser = (user: UserInterface) => {
    return (dispatch: AppDispatch) => {
        dispatch({
            type: usersTypes.SET_USER,
            user
        })
    }
}

const updateUser = () => {
    return (dispatch: AppDispatch, getState: any) => {
        const {user} = getState().users;
        mainActions.loading(true, dispatch);
        const dispatchEvent = (operationStatus: boolean) =>
            dispatch({
                type: usersTypes.UPDATE_OPERATION_STATUS,
                operationStatus
            });
        dispatchEvent(false);

        user.emails = user.emails.filter((email: any) => {
            let re = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/;

            return re.test(email.value);
        });

        console.log(user.emails);

        user.phoneNumbers = user.phoneNumbers.filter((phone: any) => {
            let re = /^\D*(\d\D*){9,14}$/;

            return re.test(phone.value);
        });

        let query = `
        mutation {
          userUpdate(id: "${user.id}", input: {
            username: "${user.username}",
            nickName: "${user.nickName ? user.nickName : ""}",
            emails: [${user.emails.map((e: any) =>
            `{value: "${e.value}", primary: ${e.primary} ${e.type ? `, type: "${e.type}"` : ""} ${e.hasOwnProperty("id") ? `, id: ${e.id}` : ""}}`)}],
            phones: [${user.phoneNumbers.map((p: any) =>
            `{value: "${p.value}"${p.type ? `, type: "${p.type}"` : ""}${p.hasOwnProperty("id") ? `, id: ${p.id}` : ""}}`)}],
            addresses: [${user.addresses.map((a: any) =>
            `{formatted: "${a.formatted}", primary: ${a.primary}, country: "${a.country}", type: "${a.type}", 
            locality: "${a.locality}", postalCode: "${a.postalCode}", region: "${a.region}", streetAddress: "${a.streetAddress}"
            ${a.hasOwnProperty("id") ? `, id: ${a.id}` : ""}}`)}],
          }) {
            user {
                url,
                id,
                avatar,
                username,
                schemas,
                externalId,
                nickName,
                displayName,
                profileUrl,
                userType,
                title,
                preferredLanguage,
                locale,
                timezone,
                active,
                activated
                isSuperuser,
                activationCode,
                activationEmailFailed,
                createdAt,
                activatedAt,
                repositories {
                  url,
                  id
                },
                permissions {
                  id,
                  object {
                    id,
                    code,
                    name
                  },
                  type {
                    id,
                    code,
                    name
                  }
                },
                x509Certificates {
                  value
                },
                groups {
                  id, value, displayName
                },
                meta {
                  lastModified,
                  location,
                  created
                },
                emails {
                  id,
                  value,
                  type,
                  primary
                },
                name {
                  formatted,
                  familyName,
                  givenName,
                  middleName,
                  honorificPrefix,
                  honorificSuffix
                },
                addresses {
                  id,
                  type,
                  streetAddress,
                  locality,
                  region,
                  postalCode,
                  country,
                  formatted,
                  primary
                },
                phoneNumbers {
                  id,
                  value,
                  type
                },
                ims {
                  value,
                  type
                },
                photos {
                  type,
                  value,
                  image
                }
            }
          }
        }`;

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {data} = result;
                let operationSuccess = !data.hasOwnProperty('errors')
                mainActions.loading(false, dispatch);
                operationSuccess
                    ? alertActions.success("User information was updated successfully")
                    : alertActions.error(data.errors[0].message);
                dispatch({
                    type: usersTypes.UPDATE_USER,
                    user: data.userUpdate.user
                })
                dispatchEvent(operationSuccess)
            },
            () => {
                dispatchEvent(false);
                mainActions.loading(false, dispatch);
            });
    }
}

const uploadUserPhoto = (file: any, imageType: string, updateUser: boolean = true) => {
    return (dispatch: AppDispatch) => {
        const dispatchEvent = (operationStatus: boolean) =>
            dispatch({
                type: usersTypes.UPDATE_OPERATION_STATUS,
                operationStatus
            });
        dispatchEvent(false);
        let query = `mutation {
          userPhotoUpload(imageType: "${imageType}") {
            photo {
              id,
              image,
              type,
              value
            }
          }
        }`;
        const data = new FormData();
        data.append("file", file);
        data.append("query", query);

        request.postFormData(
            dispatch,
            data,
            (result: any) => {
                let {data} = result;
                let operationSuccess = !data.hasOwnProperty("errors");
                dispatchEvent(operationSuccess);
                // @ts-ignore
                if (updateUser) dispatch(getUser("me"));
            },
            () => {
                dispatchEvent(false);
            });
    }
}

const deleteAvatar = () => {
    return (dispatch: AppDispatch) => {
        mainActions.loading(true, dispatch);
        const dispatchEvent = (operationStatus: boolean) =>
            dispatch({
                type: usersTypes.UPDATE_OPERATION_STATUS,
                operationStatus
            });
        dispatchEvent(false);

        let query = `mutation {
          userDeleteAvatar {
            status
          }
        }`;

        request.postWithoutErrors(
            dispatch,
            query,
            (result: any) => {
                let {data} = result;
                let operationSuccess = !data.hasOwnProperty("errors")
                mainActions.loading(false, dispatch);
                if (!operationSuccess) alertActions.error(data.errors[0].message);
                // @ts-ignore
                dispatch(getUser("me"));
                dispatchEvent(operationSuccess);
            },
            () => {
                dispatchEvent(false);
                mainActions.loading(false, dispatch);
            });
    }
}

export const usersActions = {
    getSocialsByUser,
    getGoogleAuthenticatorValue,
    getSocials,
    getUsers,
    getUser,
    setUser,
    updateUser,
    getGroups,
    getEvents,
    changeUserPassword,
    changeCurrentUserPassword,
    uploadUserPhoto,
    deleteAvatar,
};