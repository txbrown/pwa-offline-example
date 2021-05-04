const arrayBufferToBlob = (buffer: Buffer, type) => {
  return new Blob([buffer], { type: type });
};

export const getUrlFromBlob = (blob: Blob) => {
  if (typeof window === 'undefined') {
    console.log('Failed creating url from blog. window is undefined');
    return '';
  }

  return window.URL.createObjectURL(blob);
};

export interface ArrayBuffObject {
  data: ArrayBuffer;
  type: string;
}

class FileManager {
  public async downloadFileAsArrayBuffer(
    url: string
  ): Promise<ArrayBuffObject> {
    try {
      const response = await fetch(url);
      const buff = await response.arrayBuffer();

      return {
        data: buff,
        type: response.headers.get('Content-Type'),
      };
    } catch (error) {
      console.log(`Failed downloading file with url - ${url}`);
      return null;
    }
  }
}

const fileManager = new FileManager();

export default fileManager;
