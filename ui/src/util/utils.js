export const HTTPMethods = {
  POST: "post",
  GET: "get",
}

const apiUrl = "http://localhost:8080/api";

export const makeRequest = async(url, method, payload) => {
  const response = await fetch(`${apiUrl}${url}`, {
    method: method,
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify(payload)
  });

  return await response.json();
}

export const animate = (
  el,
  delay,
  duration,
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