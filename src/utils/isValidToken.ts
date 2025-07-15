import { jwtDecode, type JwtPayload } from 'jwt-decode';

export default function isValideToken(token: string | null): boolean {
  if (!token) {
    return false;
  }

  try {
    const decoded = jwtDecode<JwtPayload>(token);

    if (decoded.exp && decoded.exp * 1000 < Date.now()) {
      return false;
    }

    return true;
  } catch {
    return false;
  }
}
