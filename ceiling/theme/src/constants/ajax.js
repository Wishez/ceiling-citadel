import * as Cookies from "js-cookie";
import request from "superagent";
import nocache from "superagent-no-cache";

const customAjaxRequest = ({
  url,
  data,
  type = "get",
  crossDomain = false,
  cache,
  headers,
  success,
  failure,
  isSettingAccept = true,
}) => {
  let newRequest;
  switch (type.toUpperCase()) {
    case "POST":
      newRequest = request.post(url);
      break;
    case "GET":
      newRequest = request.get(url);
      break;
    default:
      throw new Error(`You use "${type}" which is wrong request method!`);
      break;
  }

  newRequest.send(data);

  if (isSettingAccept) newRequest.set("accept", "json");

  const csrftoken = Cookies.get("csrftoken");
  const csrfSafeMethod = (method) => (/^(GET|HEAD|OPTIONS|TRACE)$/.test(method));

  if (headers && headers.length) {
    headers.forEach((header) => {
      newRequest.set(header.name, header.value);
    });
  }

  if (!csrfSafeMethod(type) && !crossDomain) newRequest.set("X-CSRFToken", csrftoken);

  if (!cache) newRequest.user(nocache);

  return newRequest.end((error, response) => {
    if (/^(200|201|203)$/.test(response.statusCode.toString())) {
      success(response);
    } else failure(response.error);
  });
};


export default customAjaxRequest;
