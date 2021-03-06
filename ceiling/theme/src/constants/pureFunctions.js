import anime from 'animejs';
import React from 'react';
import Figure from '@/components/Figure';

export const focusHeader = () => {
  document.querySelector('.catalogHeader__title').focus();
};

export function fixUrl(url) {
  const lastLetterIndex = url.length - 1;
  const lastSlashPosition =  url.lastIndexOf('/');

  return lastSlashPosition !== lastLetterIndex ? `${url}/` : url;
}

export function makeSlides(image, index) {
  return {
    content: <Figure {...image} key={`${index}${index + 1001}`} url={image.image} name="productSlide" />,
    preview: <Figure {...image} key={`${index}${index + 1002}`} url={image.image} name="productSlidePreview" />
  };
}

export const stopAnimation = animations => {
  /*
   This used to just pause any remaining animation
   but anime gets stuck sometimes when an animation
   is trying to tween values approaching 0.

   Basically to avoid that we're just forcing near-finished
   animations to jump to the end.

   This is definitely a hack but it gets the job done—
   if the root cause can be determined it would be good
   to revisit.
   */
  const stop = anim => {
    const { duration, remaining } = anim;
    if (remaining === 1) anim.seek(duration);
    else anim.pause();
  };
  if (Array.isArray(animations)) animations.forEach(anim => stop(anim));
  else stop(animations);
};

export function transformName(name) {
  return `${name.charAt(0).toUpperCase()}${name.slice(1)}`;
}
export const getDeleteProductArguments = (index, name, quantityOrderedProducts) => {
  const lastProudctRemovedMessage = `Вы удалили  из корзины последний продукт "${name}" ಥ⌣ಥ.`;
  const removedProductMessage = `Вы удалили из корзины "${name}" ಠ_ಠ!`;

  return [
    	index,
    quantityOrderedProducts - 1 === 0 ? lastProudctRemovedMessage : removedProductMessage,
    quantityOrderedProducts - 1
  ];
};

export const slideTo = ({
  selector
}) => {
  const element = document.querySelector(selector);

  if (element) {
    element.scrollIntoView({
      behavior: 'smooth',
      block: 'start',
    });
  }
};
export const cookiesHandler = {
  setUsernameAndPasswordToCookies: ({
    site,
    username,
    password
  }) => {
    localStorage.setItem(`${site}Password`, password);
    localStorage.setItem(`${site}Username`, username);
  },
  getUsernameAndPasswordFromCookies: site => (
    {
      username: localStorage.getItem(`${site}Username`),
      password: localStorage.getItem(`${site}Password`)
    }
  ),
  clearCookies: site => {
    localStorage.removeItem(`${site}Username`);
    localStorage.removeItem(`${site}Password`);
  }

};

export const timer = (callback, delay = 1000) => {
  let timeout = null;

  return function() {
    if (timeout) {
      clearTimeout(timeout);
    }
    
    timeout = setTimeout(() => {
      callback(...arguments);
    }, delay);
  };
};

export const throttle = (callback) => {
  let isRunning = false;

  return (event) => {
    if (isRunning) return;

    isRunning = true;

    window.requestAnimationFrame(() => {
      callback(event);
      isRunning =false;
    });
  };
};

export function timeout(callback, timeout) {
  let pastTime = 0;

  function animate(time) {
    if(!pastTime) {
      pastTime = time;
    }
    const delta = time - pastTime;

    if (delta >= timeout) {
      callback();
      return false;
    }

    requestAnimationFrame(animate);
  }

  animate();
};

export const localData = {
  get: (key, isJSON=true) => {
    const value = localStorage.getItem(key);

    if (isJSON)
      return JSON.parse(value);

    return value;
  },
  set: (key, value) => {
    localStorage.setItem(key, JSON.stringify(value));
  },
  delete: (key) => {
    localStorage.removeItem(key);
  }
};

export const convertDate = date => {
  return new Date(date).toLocaleDateString('ru-RU', {
    hour: 'numeric',
    minute: 'numeric',
    second: 'numeric'
  });
};

export const notFollow = event => {
  event.preventDefault();

  const url = event.target.href;

  	window.open(url);

};

export function getArray(object) {
  let newArray = [];
  for (const prop in object) {
    newArray.push(object[prop]);
  }
  return newArray;
}
