
interface AppRegExpressionsConfig {
    // tslint:disable-next-line:callable-types
    (val: string): boolean;
}

export function AppRegExpressionsConfig(value: string) {
    const email = /^[a-zA-Z0-9_.+-]+@(?:(?:[a-zA-Z0-9-]+\.)?[a-zA-Z]+\.)?(bt)\.com$/;
    return email.test(value);
}
