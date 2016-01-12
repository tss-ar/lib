export function padLeft(value: number, totalWidth: number, paddingChar?: string): string {
    return Array(totalWidth - String(value).length + 1).join(paddingChar || '0') + value;
} 