/**
 * Hämtar stryktipsdata från det externa API:et.
 *
 * @async
 * @function getData
 * @returns {Promise<Object>} Ett objekt med stryktipsdata i JSON-format
 * @throws {Error} Om något går fel vid hämtning av data
 */
export async function getData() {
    try {
        const response = await fetch('https://api-internal.azurewebsites.net/strycket2025');

        if (!response.ok) {
            throw new Error(`HTTP-fel: ${response.status}`);
        }

        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Fel vid hämtning av stryktipsdata:', error);
        throw error;
    }
}
