const generateRandomString = (length) => {
  const array = new Uint8Array(length);
  window.crypto.getRandomValues(array);
  return Array.from(array, (dec) => ("0" + dec.toString(16)).substr(-2)).join(
    ""
  );
};

const base64UrlEncode = (str) => {
  return btoa(String.fromCharCode(...new Uint8Array(str)))
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
};

const sha256 = async (plain) => {
  const encoder = new TextEncoder();
  const data = encoder.encode(plain);
  const hashedBuffer = await crypto.subtle.digest("SHA-256", data);
  return base64UrlEncode(hashedBuffer);
};

export const generatePkcePair = async () => {
  const verifier = generateRandomString(128);
  const challenge = await sha256(verifier);
  return { verifier, challenge };
};
