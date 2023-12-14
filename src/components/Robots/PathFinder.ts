/// Get the path to the file which needs to be used by the package
export function findPath(file: string): string {
    const url = new URL(import.meta.url);
    const path = url.pathname;
    const position = path.indexOf('wandelui');
    const extractedPath = path.slice(0, position + 'wandelui'.length);
    return extractedPath + "/assets/" + file;
}