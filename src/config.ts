export enum DataServiceType {
  remote = 'REMOTE',
  firebase = 'FIREBASE',
  local = 'LOCAL',
}

export const Config = {
  apiLocalUrl: 'assets/data',
  apiRemoteUrl: 'https://xxxxxx.s3.amazonaws.com/xxxxx',

  mapApiKey: 'xxxxxxxxxxxxxxxxxxxxxx',

  DATA_SERVICE: DataServiceType.local,

  wordpressApiUrl: 'https://demo.titaniumtemplates.com/wordpress/?json=1',
  drupalApiUrl: 'https://demo.titaniumtemplates.com/drupal/rest/views/rest_api',

  firebase: {
    apiKey: 'xxxxxxxxxxx',
    authDomain: 'xxxxxx-xxxxx-xxx.firebaseapp.com',
    databaseURL: 'https://xxxx-xxxxxx-xxxxx.firebaseio.com',
    projectId: 'xxxxx-xxxx-xxxx',
  },
};
