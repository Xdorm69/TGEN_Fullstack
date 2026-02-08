export type responseType = {
  success: boolean;
  message: string;
  data: [any];
  status: number;
};

export class FetchHandler {
  static get = async (url: string): Promise<responseType> => {
    try {
      const response = await fetch(url, {
        method: "GET",
        credentials: "include",
      });
  
      const json = await response.json();
  
      return {
        ...json,
        status: response.status,   // 👈 THIS IS THE KEY
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: (error as Error).message || "Something went wrong",
        data: [null],
        status: 500,
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
      const json = await response.json();
      return {
        ...json,
        status: response.status,
      };
    } catch (error) {
      console.log(error);
      return {
        success: false,
        message: (error as Error).message || "Something went wrong",
        data: [null],
        status: 500,
      };
    }
  };
}
