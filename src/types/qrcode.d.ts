declare module 'qrcode' {
    export function toDataURL(text: string, callback: (err: any, url: string) => void): void;
  }
  