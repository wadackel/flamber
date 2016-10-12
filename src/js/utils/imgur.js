// @flow
import path from "path";
import url from "url";

type ThumbnailSize = "s" | "b" | "t" | "m" | "l" | "h";

export function makeThumbnailURL(link: string, size: ThumbnailSize) {
  const parsedURL = url.parse(link);
  const parsedPath = path.parse(parsedURL.pathname || "");

  return [
    parsedURL.slashes ? `${parsedURL.protocol || "http:"}//` : "",
    parsedURL.hostname,
    parsedURL.port != null ? `:${parsedURL.port}` : "",
    `${parsedPath.dir}/${parsedPath.name}${size}${parsedPath.ext}`,
    parsedURL.search != null ? parsedURL.search : ""
  ].join("");
}
