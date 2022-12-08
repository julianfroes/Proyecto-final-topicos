export function valiOnlyLett(value: any): boolean {
    const pattern = new RegExp('^[A-ZÁÉÍÓÚÑ ]+$', 'i')
    if (pattern.test(value)) {
        return true
    }
    return false
}
export function valiName(value: any): boolean {
    const pattern = new RegExp('^[A-ZÁÉÍÓÚÑ]{5,60}$', 'i')
    if(!value){return false}
    if (pattern.test(value)) {
        return true
    }
    return false
}

export function valiOnlyNum(value: any): boolean {
    const pattern = new RegExp('^[0-9]+$', 'i')
    if (pattern.test(value)) {
        return true
    }
    return false
}
export function valiCel(value: any): boolean {
    const pattern = new RegExp('^[0-9]{10,13}$', 'i')
    if (pattern.test(value)) {
        return true
    }
    return false
}
export function valiOnlyNumDec(value: any): boolean {
    const pattern = new RegExp('^([0-9]+)|([0-9]*[.][0-9])$', 'i')
    if (pattern.test(value)) {
        return true
    }
    return false
}

export function valiMail(value: any): boolean {
    if (/^([\da-z_\.-]+)@([\da-z\.-]+)\.([a-z\.]{2,6})$/.exec(value)) {
        return true
    }
    return false
}

export function valiBirthdate(value: any): boolean {
    if (/^(\d{4})(\/|-)(0[1-9]|1[0-2])\2([0-2][0-9]|3[0-1])$/.exec(value)) {
        return true
    }
    return false
}
