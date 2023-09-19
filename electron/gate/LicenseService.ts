const fetch = require('node-fetch');

export async function validateLicenseKey(licenseKey: string) {
  const validation = await fetch(`http://luna.alvadyne.com:8080/validate`, {
    method: 'POST',
    headers: {
      'content-type': 'application/json',
      accept: 'application/json',
    },
    body: JSON.stringify({
      license_key: licenseKey,
    }),
  });
  const { meta, errors } = await validation.json();
  if (errors) {
    console.log('🚀 ~ file: LicenseService.ts:16 ~ validateLicenseKey ~ errors:', errors);
    return null;
  }

  return meta.code;
}
