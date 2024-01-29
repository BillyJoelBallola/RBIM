export const truncate = (str, len) => {
    return str && str.length > len ? str.substring(0, len) + '...' : str
}  