import {AppDispatch} from "../store";
import request from "../helpers/request";
import permissionTypes from "../types/permissionTypes";

const getPermissions = () => {
    let query = `query {
      allApplications(pageSize: 50) {
        page,
        numPages,
        objects {
          ... on OIDCClientType {
            id,
            name,
            siteUrl,
            sloUrl,
            forgetUrl,
            protocol,
            options {
              requireConsent,
              clientSecret,
              clientId,
              signingAlg,
              redirectUris,
              redirectFailedLoginBackToSite
            }
          },
          ... on DiscourseClientType {
            id,
            name,
            siteUrl,
            sloUrl,
            forgetUrl,
            protocol,
            options {
              apiKey,
              secret,
              clientId,
              apiUsername,
              discourseBaseUrl
            }
          },
          ... on SAML2Type {
            id,
            name,
            siteUrl,
            sloUrl,
            forgetUrl,
            protocol,
            options {
              metadataFile,
              metadataUrl
            }
          }
        }
      }
    }`;

    return (dispatch: AppDispatch) => {
        request.post(dispatch, query, (data: any) => {
            dispatch({
                type: permissionTypes.GET_PERMISSIONS,
                data: data.data.allPermissions.objects
            });
        });
    }
}

export const permissionActions = {
    getPermissions,
};