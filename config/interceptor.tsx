
import { AxiosRequestConfig } from 'axios';
import { AsyncStorage } from 'react-native';

/**
 * Refresh id token
 * @param jwtData
 */
const onRefreshToken = async (jwtData: any) => {
    const refreshJwt = await AsyncStorage.getItem('');
    if (jwtData && refreshJwt) {
      const jwtDataJson = JSON.parse(jwtData);
      fetch(jwtDataJson.iss, {
        headers: {
          "X-Amz-Target": "AWSCognitoIdentityProviderService.InitiateAuth",
          "Content-Type": "application/x-amz-json-1.1",
        },
        mode: "cors",
        cache: "no-cache",
        method: "POST",
        body: JSON.stringify({
          ClientId: jwtDataJson.aud,
          AuthFlow: "REFRESH_TOKEN_AUTH",
          AuthParameters: {
            REFRESH_TOKEN: refreshJwt,
          },
        }),
      })
        .then((res) => res.json())
        .then(async (jsonData) => {
          await AsyncStorage.setItem(
            '',
            jsonData?.AuthenticationResult?.IdToken
          );
        });
    }
  };

  /**
 * handle when send request success
 */
export const onRequestSuccess = async (config: AxiosRequestConfig) => {
  };
  