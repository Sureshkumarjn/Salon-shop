import AxiosManager from "./AxiosManager";

class APIManager {
  getProvider(): any {
    return AxiosManager;
  }

  getConfig(auth: boolean, headers = {}): any {
    const config: any = {
      headers: {
        "append-auth-header": auth ? "true" : "false",
        ...headers,
      },
    };
    return config;
  }

  sendPost(
    url: string,
    postData: any,
    auth = false,
    headers = {}
  ): Promise<any> {
    return this.getProvider().post(
      url,
      postData,
      this.getConfig(auth, headers)
    );
  }

  sendPatch(url: string, postData: any, auth = false): Promise<any> {
    return this.getProvider().patch(url, postData, this.getConfig(auth));
  }

  sendGet(url: string, auth = false): Promise<any> {
    return this.getProvider().get(url, this.getConfig(auth));
  }

  sendGetWithBody(url: string, postData: any, auth = false): Promise<any> {
    const config = this.getConfig(auth);
    config.params = postData;
    return this.getProvider().get(url, config);
  }

  sendDelete(url: string, auth = false): Promise<any> {
    return this.getProvider().delete(url, this.getConfig(auth));
  }
}

export default new APIManager();
