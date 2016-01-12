export function trimChar(value: string, trimChar: string): string {
    if (!trimChar) {
        trimChar = '\\s';
    }

    let regex = new RegExp(`^${trimChar}+|${trimChar}+$`, 'gm');

    return value.replace(regex, '');
}

export function trimCharLeft(value: string, trimChar: string): string {
    if (!trimChar) {
        trimChar = '\\s';
    }

    let regex = new RegExp(`^${trimChar}+`, 'gm');

    return value.replace(regex, '');
}

export function trimCharRight(value: string, trimChar: string): string {
    if (!trimChar) {
        trimChar = '\\s';
    }

    let regex = new RegExp(`${trimChar}+$`, 'gm');

    return value.replace(regex, '');
} 