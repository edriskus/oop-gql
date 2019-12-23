class RequestOptions {
  constructor(public method: string, public uri: string, public body: any, public form: any, public headers: any, public qs: string, public resolveWithFullResponse: boolean, public json: boolean) {}
}

/**
 * Factory for Request Options
 */
export class RequestOptionsFactory {
  public static createOptions(method: string, url: string, body?: any, queryParams?: any) {
    return new RequestOptions(
      method,
      url,
      body ?? undefined,
      undefined,
      {
        Accept: "*/*"
      },
      queryParams,
      false,
      true
    );
  }
}
