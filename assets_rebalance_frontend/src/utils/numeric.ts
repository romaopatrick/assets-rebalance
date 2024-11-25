export function extractNumbers(input: string): string {
    const matches = input.match(/\d+/g);

    if (!matches) {
        return '';
    }

    return matches.join('');
}

export function currency_f(
    value: number,
    locale: string = 'pt-BR',
    currency: string = 'BRL',
    showCurrency: boolean = true
): string {
    return new Intl.NumberFormat(locale, {
        style: showCurrency ? 'currency' : 'decimal', // Toggle between 'currency' and 'decimal'
        currency: showCurrency ? currency : undefined, // Only include currency when needed
        minimumFractionDigits: 2, // Ensure consistent formatting
        maximumFractionDigits: 2,
    }).format(value);
}