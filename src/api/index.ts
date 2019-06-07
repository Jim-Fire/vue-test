import { path } from "@/config";
import axios from 'axios';

export class API {
  public static async get(url: string, options?: object): Promise<any> {
    return await axios.get(path.base() + url, options).then(res => res.data);
  }

  public static async post(url: string, data: object): Promise<any> {
    return await axios.post(path.base() + url, data).then(res => res.data);
  }

  public static async put(url: string, data: object): Promise<any> {
    return await axios.put(path.base() + url, data).then(res => res.data);
  }

  public static async delete(url: string, options?: object): Promise<any> {
    return await axios.delete(path.base() + url, {
      ...options,
    }).then(res => res.data);
  }
//.then(res => res.data);
}
