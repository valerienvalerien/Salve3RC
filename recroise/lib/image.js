// Validation d'un fichier image par ses octets (pas par l'extension ni le type annoncé).
export function sniffImage(buf) {
  if (buf.length >= 3 && buf[0] === 0xff && buf[1] === 0xd8 && buf[2] === 0xff) return 'image/jpeg';
  if (buf.length >= 8 && buf.subarray(0, 8).equals(Buffer.from([0x89, 0x50, 0x4e, 0x47, 0x0d, 0x0a, 0x1a, 0x0a]))) return 'image/png';
  if (buf.length >= 12 && buf.subarray(0, 4).toString('latin1') === 'RIFF' && buf.subarray(8, 12).toString('latin1') === 'WEBP') return 'image/webp';
  if (buf.length >= 6 && /^GIF8[79]a$/.test(buf.subarray(0, 6).toString('latin1'))) return 'image/gif';
  return null;
}

export class ImageError extends Error {
  constructor(code, message) { super(message); this.code = code; }
}

export function parseImagePayload(payload, maxBytes) {
  if (typeof payload !== 'string' || !payload) throw new ImageError('missing', "Aucune image reçue.");
  const b64 = payload.replace(/^data:[^;]+;base64,/, '');
  if (!/^[A-Za-z0-9+/=\s]+$/.test(b64)) throw new ImageError('bad_encoding', "Fichier image illisible.");
  const buf = Buffer.from(b64, 'base64');
  if (buf.length === 0) throw new ImageError('empty', 'Fichier vide.');
  if (buf.length > maxBytes) throw new ImageError('too_large', `Image trop lourde (maximum ${Math.round(maxBytes / 1048576)} Mo).`);
  const mediaType = sniffImage(buf);
  if (!mediaType) throw new ImageError('unsupported', 'Format non pris en charge. Utilisez JPEG, PNG, WebP ou GIF.');
  return { buf, mediaType, base64: buf.toString('base64') };
}
