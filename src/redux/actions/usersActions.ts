import {AppDispatch} from "../store";
import {alertActions} from "./alertActions";
import {mainActions} from "./mainActions";
import usersTypes from "../types/usersTypes";
import {getUsersData} from "../../interfaces/user";
import request from '../helpers/request';

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

        request.postWithErrors(
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

const getUser = (userId: string) => {
    return (dispatch: AppDispatch) => {
        let query = `query {
          user (id: "${userId}") {
            url,
            id,
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

export const usersActions = {
    getUsers,
    getUser,
    getGroups,
    getEvents,
    changeUserPassword,
};