export function padLeft(totalWidth: number, paddingChar?: string): string {
    return Array(totalWidth - String(this).length + 1).join(paddingChar || '0') + this;
} 