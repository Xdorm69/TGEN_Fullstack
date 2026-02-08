type responseType = {
  success: boolean;
  message: string;
  data: [any];
};

export class FetchHandler {
  static get = async (url: string): Promise<responseType> => {
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
      return response.json() as Promise<responseType>;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: (error as Error).message || "Something went wrong",
        data: [null],
      };
    }
  };

  static post = async (url: string, data: any): Promise<responseType> => {
    try {
      const response = await fetch(url, {
        method: "POST",
        body: JSON.stringify(data),
        headers: {
          "Content-Type": "application/json",
        },
        credentials: "include",
      });
      return response.json() as Promise<responseType>;
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: (error as Error).message || "Something went wrong",
        data: [null],
      };
    }
  };
}
