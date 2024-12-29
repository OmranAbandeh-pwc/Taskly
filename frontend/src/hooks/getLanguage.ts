

export function getLanguage(): string {
    const lang =
        window.document.documentElement.lang ||
        (window as any).pageInfo.language ||
        window.location.pathname.split("/")[1];

    return lang ? lang : "en";
}