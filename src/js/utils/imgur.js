import path from "path";
import url from "url";

export function makeThumbnailURL(link, size) {
  const parsedURL = url.parse(link);
  const parsedPath = path.parse(parsedURL.pathname);

  return [
    parsedURL.slashes ? `${parsedURL.protocol}//` : "",
    parsedURL.hostname,
    parsedURL.port != null ? `:${parsedURL.port}` : "",
    `${parsedPath.dir}/${parsedPath.name}${size}${parsedPath.ext}`,
    parsedURL.search != null ? parsedURL.search : ""
  ].join("");
}
