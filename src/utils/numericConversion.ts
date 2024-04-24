export const numericConversion = (original: number): string => {
    let res: string = ""
    if (original > 10000) {
        res = original / 10000 + "W"
    }
    else if (original > 1000) {
        res = original / 1000 + "T"
    }
    else {
        res = res + ""
    }
    return res
}