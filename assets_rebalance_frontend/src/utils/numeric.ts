export function extractNumbers(input: string): string {
    const matches = input.match(/\d+/g);

    if (!matches) {
        return '';
    }

    return matches.join('');
}