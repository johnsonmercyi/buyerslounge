export const HTTPMethods = {
  POST: "post",
  GET: "get",
  PATCH: "patch",
  DELETE: "delete",
}

const apiUrl = "http://localhost:8080/api";
// const apiUrl = "http://192.168.10.122:8080/api";

export const makeRequest = async (url, method, payload, headersPayload = {}, formData) => {
  // console.log("HEADERS: ", headersPayload);
  const options = {
    method: method,
    headers: {
      ...headersPayload
    }
  }

  if (payload) {
    options.body = JSON.stringify(payload);
    options.headers['Content-Type'] = 'application/json';
  } else if (formData) {
    options.body = formData;
  }
  const response = await fetch(`${apiUrl}${url}`, options);
  return await response.json();
}

export const animate = (
  el,
  delay,
  duration,//
  iterations,
  easing = "ease-in-out",
  frames = [],
  onFinish = () => { },
  onFinishDelay
) => {
  let keyframes = new KeyframeEffect(el, frames, {
    id: "animate_element_",
    easing: easing,
    iterations: iterations,
    fill: "forwards",
    duration: duration,
    delay: delay,
  });

  let animation = new Animation(keyframes, document.timeline);
  animation.play();
 
  if (onFinish) {
    if (onFinishDelay || onFinishDelay === 0) {
      setTimeout(() => {
        onFinish();
      }, delay + onFinishDelay);
    } else {
      setTimeout(() => {
        onFinish();
      }, delay + duration);
    }
  }
}

export const devices = {
  MOBILE: "mobile",
  TABLET: "tablet",
  DESKTOP: "desktop"
}

export function getServerFileName (fileUrl) {
  let fileName = String(fileUrl).split('/');
  return fileName[fileName.length - 1];
}