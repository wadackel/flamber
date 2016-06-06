const SETTINGS = "scrollbars=no,toolbar=no,location=no,titlebar=no,directories=no,status=no,menubar=no";
const POPUP_WIDTH = 452;
const POPUP_HEIGHT = 634;

function getPopupOffset() {
  const wLeft = window.screenLeft ? window.screenLeft : window.screenX;
  const wTop = window.screenTop ? window.screenTop : window.screenY;
  const left = wLeft + (window.innerWidth / 2) - (POPUP_WIDTH / 2);
  const top = wTop + (window.innerHeight / 2) - (POPUP_HEIGHT / 2);

  return { top, left };
}

export default function openPopup(url, name) {
  const { top, left } = getPopupOffset();

  return window.open(url, name, `${SETTINGS},width=${POPUP_WIDTH},height=${POPUP_HEIGHT},top=${top},left=${left}`);
}
