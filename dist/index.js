var axios = require("axios");
var FormData = require("form-data");

class RentryClient {
  async new(args, callback) {
    args.APIMethod = "https://rentry.co/api/new";
    var res = await this.API(args);
    res.id = res.url.split("/")[3];
    if (typeof callback == "function") {
      callback(res);
    } else {
      return res;
    }
  }

  async edit(args, callback) {
    args.APIMethod = `https://rentry.co/api/edit/${args.id}`;
    args.id = null;
    var res = await this.API(args);
    if (typeof callback == "function") {
      callback(res);
    } else {
      return res;
    }
  }

  async raw(id, callback) {
    var res = await axios.get(`https://rentry.co/api/raw/${id}`);
    if (typeof callback === "function") {
      callback(res.data);
    } else {
      return res.data;
    }
  }

  async API(args) {
    var reqCookie = await axios.get("https://rentry.co/");
    var cookies = reqCookie.headers["set-cookie"];
    var csrfToken = cookies.toString().match(/csrftoken=([^;]+)/)[1];

    var formData = new FormData();
    formData.append("csrfmiddlewaretoken", csrfToken);
    formData.append("url", args.id || "");
    formData.append("edit_code", args.token || "");
    formData.append("text", args.data);

    var headers = {
      ...formData.getHeaders(),
      Referer: "https://rentry.co",
      Cookie: cookies.join(";"),
    };
    var reqPost = await axios.post(args.APIMethod, formData, { headers });
    var response = await reqPost.data;
    return response;
  }
}
module.exports = new RentryClient();