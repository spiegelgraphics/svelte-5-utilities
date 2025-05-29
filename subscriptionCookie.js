/**
 * @module subscriptionCookie
 * 
 * This module handles the extraction of a subscription or gift article status. 
 * Retrieves and parses the 'accessInfo' cookie to determine subscription status.
 * Reads the URL parameters to check if the article is a gift article.
 * 
 * Returns an object with the following properties:

 * isPlusSubscriber (boolean) - Indicates if the user is a Plus subscriber based on the 'accessInfo' cookie.
 * isGiftArticle (boolean) - Indicates if the article was called as a gift article (gift token is not validated).
 * isOpen (boolean) - Indicates if isPlusSubscriber or isGiftArticle is true.
 */

const cookies = document.cookie;

const accessInfoCookie = (() => {
  const accessInfo = cookies.split(";").find((item) => {
    const [key] = item.split("=").map((part) => part.trim());
    return key === "accessInfo";
  });

  if (accessInfo) {
    const value = accessInfo.split("=")[1].trim();
    return JSON.parse(
      atob(value.split(".")[1].replace(/-/g, "+").replace(/_/g, "/"))
    );
  }
})();

const urlParamsObj = new URLSearchParams(window.location.search);
const isGiftArticle = Object.keys(Object.fromEntries(urlParamsObj)).includes(
  "giftToken"
);

const isPlusSubscriber = accessInfoCookie?.access.Spplus === true;

export const subscriptionCookie = {
  isPlusSubscriber,
  isGiftArticle,
  isOpen: isPlusSubscriber || isGiftArticle,
};
