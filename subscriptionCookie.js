/**
 * @module subscriptionCookie
 * 
 * This module handles the extraction of a subscription status. 
 * Retrieves and parses the 'accessInfo' cookie to determine subscription status.
 * 
 * subscriptionCookie.isPlusSubscriber - Indicates if the user is a Plus subscriber.

 * isPlusSubscriber (boolean) - Indicates if the user is a Plus subscriber based on the 'accessInfo' cookie.
 */

const cookies = document.cookie;

const accessInfoCookie = (() => {
  const accessInfo = cookies.split(';').find((item) => {
    const [key] = item.split('=').map((part) => part.trim());
    return key === 'accessInfo';
  });

  if(accessInfo) {
    const value = accessInfo.split('=')[1].trim();
    return JSON.parse(atob(value.split('.')[1].replace(/-/g, '+').replace(/_/g, '/')));
  }
})();

const isPlusSubscriber = accessInfoCookie?.access.Spplus === true;

export const subscriptionCookie = {
  isPlusSubscriber
};
