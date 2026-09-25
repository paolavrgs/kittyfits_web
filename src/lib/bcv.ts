import "server-only";
import https from "node:https";
import tls from "node:tls";

export interface BcvRate {
  // Bolívares por dólar
  rate: number;
  // Fecha valor de la tasa (YYYY-MM-DD). En las tardes el BCV publica la tasa
  // del siguiente día hábil, así que puede ser una fecha futura.
  date: string;
  source: "bcv" | "dolarapi";
}

// bcv.org.ve no envía el certificado intermedio correcto y Node rechaza la
// conexión. Se agrega el intermedio público de Sectigo (vence en 2036) en vez
// de desactivar la verificación TLS.
const SECTIGO_DV_R36 = `-----BEGIN CERTIFICATE-----
MIIGTDCCBDSgAwIBAgIQOXpmzCdWNi4NqofKbqvjsTANBgkqhkiG9w0BAQwFADBf
MQswCQYDVQQGEwJHQjEYMBYGA1UEChMPU2VjdGlnbyBMaW1pdGVkMTYwNAYDVQQD
Ey1TZWN0aWdvIFB1YmxpYyBTZXJ2ZXIgQXV0aGVudGljYXRpb24gUm9vdCBSNDYw
HhcNMjEwMzIyMDAwMDAwWhcNMzYwMzIxMjM1OTU5WjBgMQswCQYDVQQGEwJHQjEY
MBYGA1UEChMPU2VjdGlnbyBMaW1pdGVkMTcwNQYDVQQDEy5TZWN0aWdvIFB1Ymxp
YyBTZXJ2ZXIgQXV0aGVudGljYXRpb24gQ0EgRFYgUjM2MIIBojANBgkqhkiG9w0B
AQEFAAOCAY8AMIIBigKCAYEAljZf2HIz7+SPUPQCQObZYcrxLTHYdf1ZtMRe7Yeq
RPSwygz16qJ9cAWtWNTcuICc++p8Dct7zNGxCpqmEtqifO7NvuB5dEVexXn9RFFH
12Hm+NtPRQgXIFjx6MSJcNWuVO3XGE57L1mHlcQYj+g4hny90aFh2SCZCDEVkAja
EMMfYPKuCjHuuF+bzHFb/9gV8P9+ekcHENF2nR1efGWSKwnfG5RawlkaQDpRtZTm
M64TIsv/r7cyFO4nSjs1jLdXYdz5q3a4L0NoabZfbdxVb+CUEHfB0bpulZQtH1Rv
38e/lIdP7OTTIlZh6OYL6NhxP8So0/sht/4J9mqIGxRFc0/pC8suja+wcIUna0HB
pXKfXTKpzgis+zmXDL06ASJf5E4A2/m+Hp6b84sfPAwQ766rI65mh50S0Di9E3Pn
2WcaJc+PILsBmYpgtmgWTR9eV9otfKRUBfzHUHcVgarub/XluEpRlTtZudU5xbFN
xx/DgMrXLUAPaI60fZ6wA+PTAgMBAAGjggGBMIIBfTAfBgNVHSMEGDAWgBRWc1hk
lfmSGrASKgRieaFAFYghSTAdBgNVHQ4EFgQUaMASFhgOr872h6YyV6NGUV3LBycw
DgYDVR0PAQH/BAQDAgGGMBIGA1UdEwEB/wQIMAYBAf8CAQAwHQYDVR0lBBYwFAYI
KwYBBQUHAwEGCCsGAQUFBwMCMBsGA1UdIAQUMBIwBgYEVR0gADAIBgZngQwBAgEw
VAYDVR0fBE0wSzBJoEegRYZDaHR0cDovL2NybC5zZWN0aWdvLmNvbS9TZWN0aWdv
UHVibGljU2VydmVyQXV0aGVudGljYXRpb25Sb290UjQ2LmNybDCBhAYIKwYBBQUH
AQEEeDB2ME8GCCsGAQUFBzAChkNodHRwOi8vY3J0LnNlY3RpZ28uY29tL1NlY3Rp
Z29QdWJsaWNTZXJ2ZXJBdXRoZW50aWNhdGlvblJvb3RSNDYucDdjMCMGCCsGAQUF
BzABhhdodHRwOi8vb2NzcC5zZWN0aWdvLmNvbTANBgkqhkiG9w0BAQwFAAOCAgEA
YtOC9Fy+TqECFw40IospI92kLGgoSZGPOSQXMBqmsGWZUQ7rux7cj1du6d9rD6C8
ze1B2eQjkrGkIL/OF1s7vSmgYVafsRoZd/IHUrkoQvX8FZwUsmPu7amgBfaY3g+d
q1x0jNGKb6I6Bzdl6LgMD9qxp+3i7GQOnd9J8LFSietY6Z4jUBzVoOoz8iAU84OF
h2HhAuiPw1ai0VnY38RTI+8kepGWVfGxfBWzwH9uIjeooIeaosVFvE8cmYUB4TSH
5dUyD0jHct2+8ceKEtIoFU/FfHq/mDaVnvcDCZXtIgitdMFQdMZaVehmObyhRdDD
4NQCs0gaI9AAgFj4L9QtkARzhQLNyRf87Kln+YU0lgCGr9HLg3rGO8q+Y4ppLsOd
unQZ6ZxPNGIfOApbPVf5hCe58EZwiWdHIMn9lPP6+F404y8NNugbQixBber+x536
WrZhFZLjEkhp7fFXf9r32rNPfb74X/U90Bdy4lzp3+X1ukh1BuMxA/EEhDoTOS3l
7ABvc7BYSQubQ2490OcdkIzUh3ZwDrakMVrbaTxUM2p24N6dB+ns2zptWCva6jzW
r8IWKIMxzxLPv5Kt3ePKcUdvkBU/smqujSczTzzSjIoR5QqQA6lN1ZRSnuHIWCvh
JEltkYnTAH41QJ6SAWO66GrrUESwN/cgZzL4JLEqz1Y=
-----END CERTIFICATE-----`;

const BCV_CA = [...tls.rootCertificates, SECTIGO_DV_R36];
const TIMEOUT_MS = 8000;
const CACHE_MS = 30 * 60 * 1000;
const FAILURE_CACHE_MS = 5 * 60 * 1000;

const isValidRate = (rate: number) => Number.isFinite(rate) && rate > 0;

const fetchBcvHtml = () =>
  new Promise<string>((resolve, reject) => {
    const request = https.get(
      "https://www.bcv.org.ve/",
      { ca: BCV_CA, timeout: TIMEOUT_MS },
      (response) => {
        if (response.statusCode !== 200) {
          response.resume();
          reject(new Error(`BCV respondió ${response.statusCode}`));
          return;
        }
        let html = "";
        response.setEncoding("utf8");
        response.on("data", (chunk) => (html += chunk));
        response.on("end", () => resolve(html));
      },
    );
    request.on("timeout", () => request.destroy(new Error("BCV timeout")));
    request.on("error", reject);
  });

const fromBcv = async (): Promise<BcvRate> => {
  const html = await fetchBcvHtml();
  // <div id="dolar"> ... <strong>855,66250000</strong>
  const rateMatch = html.match(
    /id="dolar"[\s\S]*?<strong[^>]*>\s*([\d.,]+)\s*<\/strong>/,
  );
  // Fecha Valor: <span ... content="2026-09-25T00:00:00-04:00">
  const dateMatch = html.match(
    /Fecha Valor:[\s\S]*?content="(\d{4}-\d{2}-\d{2})/,
  );
  const rate = Number(rateMatch?.[1].replace(/\./g, "").replace(",", "."));
  if (!isValidRate(rate) || !dateMatch) {
    throw new Error("No se encontró la tasa en bcv.org.ve");
  }
  return { rate, date: dateMatch[1], source: "bcv" };
};

const fromDolarApi = async (): Promise<BcvRate> => {
  const response = await fetch("https://ve.dolarapi.com/v1/dolares/oficial", {
    signal: AbortSignal.timeout(TIMEOUT_MS),
    cache: "no-store",
  });
  if (!response.ok) throw new Error(`DolarApi respondió ${response.status}`);
  const data = await response.json();
  const rate = Number(data.promedio);
  const date = String(data.fechaActualizacion ?? "").slice(0, 10);
  if (!isValidRate(rate) || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
    throw new Error("Respuesta inválida de DolarApi");
  }
  return { rate, date, source: "dolarapi" };
};

let cached: { value: BcvRate | null; expiresAt: number } | null = null;

// Tasa oficial más reciente: primero el BCV, luego DolarApi como respaldo.
// Devuelve null si ninguna fuente responde; la página debe seguir funcionando.
export const getBcvRate = async (): Promise<BcvRate | null> => {
  if (cached && cached.expiresAt > Date.now()) return cached.value;

  let value: BcvRate | null = null;
  for (const source of [fromBcv, fromDolarApi]) {
    try {
      value = await source();
      break;
    } catch (error) {
      console.error("Error obteniendo la tasa BCV", error);
    }
  }

  cached = {
    value,
    expiresAt: Date.now() + (value ? CACHE_MS : FAILURE_CACHE_MS),
  };
  return value;
};
