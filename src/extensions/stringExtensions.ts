export function trimChar(trimChar: string): string {
    if (!trimChar) {
        trimChar = '\\s';
    }

    let regex = new RegExp(`^${trimChar}+|${trimChar}+$`, 'gm');

    return this.replace(regex, '');
}

export function trimCharLeft(trimChar: string): string {
    if (!trimChar) {
        trimChar = '\\s';
    }

    let regex = new RegExp(`^${trimChar}+`, 'gm');

    return this.replace(regex, '');
}

export function trimCharRight(trimChar: string): string {
    if (!trimChar) {
        trimChar = '\\s';
    }

    let regex = new RegExp(`${trimChar}+$`, 'gm');

    return this.replace(regex, '');
} 