export function ConvertDateTOISO(inputDate: string) {
    const date = new Date(inputDate);
    const formattedDate = date.toISOString(); // Converts to "YYYY-MM-DDTHH:mm:ss.sssZ" format
    return formattedDate;
}

export function ConvertISODateTOString(inputDate: string) {
    const date = new Date(inputDate);
    const day = date.getDate().toString().padStart(2, '0');
    const month = (date.getMonth() + 1).toString().padStart(2, '0');
    const year = date.getFullYear();
    const formattedDate = `${day}/${month}/${year}`;
    return formattedDate;
}

export default { ConvertISODateTOString, ConvertDateTOISO };
