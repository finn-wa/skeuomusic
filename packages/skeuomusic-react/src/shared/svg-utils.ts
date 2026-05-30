export function urlForId(id: string) {
  return `url(#${id})`;
}

export function hrefForId(id: string) {
  return `#${id}`;
}

export const viewBox = (width: number, height = 39) => `0 0 ${width} ${height}`;

export type IconDefIds = {
  gradient: string;
  shadow: string;
};

export function getIconDefIds(idPrefix: string): IconDefIds {
  return {
    gradient: `${idPrefix}-icon-gradient`,
    shadow: `${idPrefix}-icon-shadow`,
  };
}

export function getIconDefUrls(ids: IconDefIds) {
  return {
    fill: urlForId(ids.gradient),
    filter: urlForId(ids.shadow),
  };
}
